'use strict';

/**
 * @ngdoc service
 * @name tastemybeanApp.Rating
 * @description
 * # Rating
 * Factory in the tastemybeanApp.
 */
angular.module('tastemybeanApp')
  .factory('Rating', ['$resource', 'parse', function ($resource, parse) {
    var actions = {
      mine: {
        method: 'get',
        params: {
          include: 'recipe',
          order: 'createdAt',
          where: function() {
            return JSON.stringify({author: parse.pointerFor(parse.User.current())});
          }
        },
        headers: parse.authHeaders
      },
      query: {
        method: 'get',
        headers: parse.authHeaders
      },
      update: {
        method: 'put',
        url: parse.apiUrl + 'classes/rating/:id',
        headers: parse.authHeaders
      },
      create: {
        method: 'post',
        headers: parse.authHeaders
      },
      unrate: {
        method: 'delete',
        url: parse.apiUrl + 'classes/rating/:id',
        headers: parse.authHeaders
      },
      myRankedRatings: {
        method: 'get',
        params: {
          include: 'recipe,recipe.brew_method,recipe.coffee_brand',
          order: '-rating_value',
          where: function () {
            JSON.stringify({author: parse.pointerFor(parse.User.current())});
          }
        },
        headers: parse.authHeaders,
        transformResponse: function(data) {
          var response = angular.fromJson(data);

          var originPreference, roastPreference, brewPreference, batchPreference, i, rating;

          //convert any NaN ratings to zero.
          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            if (isNaN(rating.rating_value)) {
              rating.rating_value = 0;
            }
          }

          //Determine origin preference
          var singleScore = 0;
          var singleRatingCount = 0;
          var blendScore = 0;
          var blendRatingCount = 0;

          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            if (rating.recipe.coffee_brand.origin === 'single') {
              singleScore += rating.rating_value;
              singleRatingCount ++;
            } else {
              blendScore += rating.rating_value;
              blendRatingCount ++;
            }
          }

          singleScore = singleRatingCount > 0 ? (singleScore / singleRatingCount) : 0;
          blendScore = blendRatingCount > 0 ? (blendScore / blendRatingCount) : 0;
          originPreference = singleScore >= blendScore ? 'single' : 'blend';

          //Determine roast preference
          var lightScore = 0;
          var lightRatingCount = 0;
          var mediumScore = 0;
          var mediumRatingCount = 0;
          var darkScore = 0;
          var darkRatingCount = 0;

          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            switch (rating.recipe.coffee_brand.roast_strength) {
              case 0:
                lightScore += rating.rating_value;
                lightRatingCount++;
                break;
              case 1:
                mediumScore += rating.rating_value;
                mediumRatingCount++;
                break;
              case 2:
                darkScore += rating.rating_value;
                darkRatingCount++;
                break;
            }
          }

          lightScore = lightRatingCount > 0 ? (lightScore / lightRatingCount) : 0;
          mediumScore = mediumRatingCount > 0 ? (mediumScore / mediumRatingCount) : 0;
          darkScore = darkRatingCount > 0 ? (darkScore / darkRatingCount) : 0;
          if (lightScore >= mediumScore && lightScore >= darkScore) {
            roastPreference = 'light';
          } else if (mediumScore >= lightScore && mediumScore >= darkScore) {
            roastPreference = 'medium';
          } else {
            roastPreference = 'dark';
          }

          //Determine brew preference
          var easyScore = 0;
          var easyRatingCount = 0;
          var hardScore = 0;
          var hardRatingCount = 0;

          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            if (rating.recipe.brew_method.easy) {
              easyScore += rating.rating_value;
              easyRatingCount++;
            } else {
              hardScore += rating.rating_value;
              hardRatingCount++;
            }
          }

          easyScore = easyRatingCount > 0 ? (easyScore / easyRatingCount) : 0;
          hardScore = hardRatingCount > 0 ? (hardScore / hardRatingCount) : 0;
          brewPreference = easyScore >= hardScore ? 'easy' : 'hard';

          //Determine batch preference
          var smallScore = 0;
          var smallRatingCount = 0;
          var bigScore = 0;
          var bigRatingCount = 0;

          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            if (rating.recipe.coffee_brand.specialty) {
              smallScore += rating.rating_value;
              smallRatingCount++;
            } else {
              bigScore += rating.rating_value;
              bigRatingCount++;
            }
          }

          smallScore = smallRatingCount > 0 ? (smallScore / smallRatingCount) : 0;
          bigScore = bigRatingCount > 0 ? (bigScore / bigRatingCount) : 0;
          batchPreference = (bigScore >= smallScore) ? 'big' : 'small';

          response.preferences = {
            origin: originPreference,
            roast: roastPreference,
            brew: brewPreference,
            batch: batchPreference
          };

          return response;
        }
      },
      groupRankedRatings: {
        method: 'get',
        params: {
          include: 'recipe,recipe.brew_method,recipe.coffee_brand',
          order: 'recipe'
        },
        headers: parse.authHeaders,
        transformResponse: function(data) {
          //Transform the server response to json.
          var response = angular.fromJson(data);

          var i, rating;

          //convert any NaN ratings to zero.
          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            if (isNaN(rating.rating_value)) {
              rating.rating_value = 0;
            }
          }

          //Create only one averaged "rating" object per recipe, via a hashtable with the recipe ID as the key.
          var a = {}, groupRating;
          for (i = 0; i < response.results.length; i++) {
            rating = response.results[i];
            groupRating = a[rating.recipe.objectId] || { recipe: rating.recipe, ratingCount: 0, ratingSum: 0 };
            groupRating.ratingCount++;
            groupRating.ratingSum += rating.rating_value;
            a[rating.recipe.objectId] = groupRating;
          }

          //Turn the hashtable into an array of ratings.
          response.results = [];
          for (var objectId in a) {
            if (a.hasOwnProperty(objectId)) {
              groupRating = a[objectId];
              groupRating.ratingValue = groupRating.ratingSum / groupRating.ratingCount;
              response.results.push(a[objectId]);
            }
          }

          //Sort the ratings from highest to lowest.
          response.results.sort(function(a, b) {
            var diff = a.ratingValue - b.ratingValue;
            if (diff > 0) {
              return -1;
            } else if (diff < 0) {
              return  1;
            }
            return 0;
          });

          return response;
        }
      }
    };

    function whereRecipeIs (recipeId) {
      return {
        include: 'recipe',
        order: 'createdAt',
        where: JSON.stringify({
          author: parse.pointerFor(parse.User.current()),
          recipe: parse.pointerFor('recipe', recipeId)
        })
      };
    }

    var resource = $resource(parse.apiUrl + 'classes/rating/', {}, actions);
    resource.myRatingOfRecipe = function(recipeId, success, error) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      var t = whereRecipeIs(recipeId);
      return this.query(t, success, error);
    };

    return resource;
  }]);

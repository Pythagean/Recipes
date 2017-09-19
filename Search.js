function searchForIngredient(search_ingredient){
  Logger.log('Starting search for ' + search_ingredient.toString());
  var all_recipes = getAllRecipes(),
      matching_recipes = [];

  search_ingredient = search_ingredient == null ? 'egg' : search_ingredient;
  search_ingredient = search_ingredient.toLowerCase();
  Logger.log('Found all recipes, searching now');

  all_recipes.forEach(function(recipe){
    if (recipe.ingredients.length > 0){
      recipe.ingredients.forEach(function(ing){
        var ing_split = ing.split(' '),
            search_ingredient_split = search_ingredient.split(' ');
        if (ing == search_ingredient){
          recipe.match = 'Exact match';
          matching_recipes.push(recipe);
          return;
        }
        else if (ing_split[0] == search_ingredient_split[0]){
          recipe.match = 'Matched first word';
          matching_recipes.push(recipe);
          return;
        }
        else if (ing[ing.length-1] == 's' && ing.substr(0,ing.length-1) == search_ingredient) {
          recipe.match = 'Matched plural';
          matching_recipes.push(recipe);
          return;
        }
        else if (search_ingredient[search_ingredient.length-1] == 's' && search_ingredient.substr(0,search_ingredient.length-1) == ing) {
          recipe.match = 'Matched plural';
          matching_recipes.push(recipe);
          return;
        }
        else if (search_ingredient_split.length > 1 && ing_split[1] == search_ingredient_split[1]){
          recipe.match = 'Matched second word';
          matching_recipes.push(recipe);
          return;
        }

      });
    }
  });

  matching_recipes.forEach(function(rec){
    Logger.log(rec);
  });
  return matching_recipes;

};


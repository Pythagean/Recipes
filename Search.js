function searchForIngredient(search_ingredient){

  search_ingredient = search_ingredient == null ? 'strawberry' : search_ingredient.toString();
  search_ingredient = search_ingredient.toLowerCase();
  Logger.log('Starting search for "' + search_ingredient + '"');

  var all_recipes = getAllRecipes(),
      matching_recipes = [];
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
        else if (ing[ing.length-1] == 's' && ing.substr(0,ing.length-1) == search_ingredient ||
          search_ingredient[search_ingredient.length-1] == 's' && search_ingredient.substr(0,search_ingredient.length-1) == ing) {
          recipe.match = 'Matched plural';
          matching_recipes.push(recipe);
          return;
        }
        else if ((search_ingredient.substr(search_ingredient.length-2,search_ingredient.length) == 'ry' &&
          search_ingredient.substr(0,search_ingredient.length-2) == ing.substr(0,ing.length-4)) ||
          (ing.substr(ing.length-2,ing.length) == 'ry' &&
          ing.substr(0,ing.length-2) == search_ingredient.substr(0,search_ingredient.length-4))){
          recipe.match = 'Matched excluding "ry" and "ries"';
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


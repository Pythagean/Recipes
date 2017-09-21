function searchForIngredient(search_ingredient, whole_word){

  search_ingredient = search_ingredient == null ? 'cranberry' : search_ingredient.toString();
  search_ingredient = search_ingredient.toLowerCase();
  Logger.log('Starting search for "' + search_ingredient + '"');

  var all_recipes = getAllRecipes(),
      matching_recipes = [];
  Logger.log('Found all recipes, searching now');

  all_recipes.forEach(function(recipe){
    if (recipe.ingredients.length > 0){
      var recipe_added = false;
      recipe.ingredients.forEach(function(ing){
        var ing_split = ing.split(' '),
            search_ingredient_split = search_ingredient.split(' ');
        if (recipe_added == false){
          if (ing == search_ingredient){
            recipe.match = ing;
            Logger.log('exact match - ' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if (ing.toLowerCase() == search_ingredient){
            recipe.match = ing.toLowerCase();
            Logger.log('lower case - ' + recipe.name);
            matching_recipes.push(recipe);
            return;
          }
          else if (whole_word == true) {
            return;
          }
          else if (ing.match(search_ingredient)!= null){
            Logger.log(ing.match(search_ingredient));
            recipe.match = search_ingredient;
            Logger.log('match - ' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }

          // First word
          else if (ing_split[0] == search_ingredient_split[0]){
            recipe.match = ing_split[0];
            Logger.log('first word - ' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if (ing[ing.length-1] == 's' && ing.substr(0,ing.length-1) == search_ingredient ||
            search_ingredient[search_ingredient.length-1] == 's' && search_ingredient.substr(0,search_ingredient.length-1) == ing) {
            recipe.match = ing.substr(0,ing.length-1);
            Logger.log('5' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if (ing.substr(ing.length-2,ing.length) == 'ry' &&
            ing.substr(0,ing.length-2) == search_ingredient.substr(0,search_ingredient.length-4)){
            recipe.match = ing.substr(0,ing.length-2);
            Logger.log('6' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if ((search_ingredient.substr(search_ingredient.length-2,search_ingredient.length) == 'ry' &&
            search_ingredient.substr(0,search_ingredient.length-2) == ing.substr(0,ing.length-4))){
            recipe.match = ing.substr(0,ing.length-4);
            Logger.log('7' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if ((search_ingredient_split.length > 1) && (ing_split[1] == search_ingredient_split[1] ||
            ing_split[1] == search_ingredient_split[0])){
            recipe.match = ing_split[1];
            Logger.log('8' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
          else if ((search_ingredient_split.length > 1) && (ing_split[0] == search_ingredient_split[1])){
            recipe.match = ing_split[0];
            Logger.log('9' + recipe.name);
            matching_recipes.push(recipe);
            recipe_added = true;
            return;
          }
        }


      });

    }
  });

  matching_recipes.forEach(function(rec){
    Logger.log(rec);
  });
  return matching_recipes;

};









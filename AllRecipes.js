function getRecipesFolder() {
  var root_folder = DriveApp.getRootFolder(),
      recipes_folder = root_folder.getFolders();
  while (recipes_folder.hasNext()) {
    var folder = recipes_folder.next();
    if (folder.getName() == 'Recipes'){
      return folder;
    }
  }
};

function importIntoAllRecipes(){
  var recipes_folder = getRecipesFolder(),
      course_folders = recipes_folder.getFolders(),
      all_recipes = [];

  while (course_folders.hasNext()) {
    var course_folder = course_folders.next();
    if (course_folder.getName() != 'Photos'){
      var course_root_files = course_folder.getFiles(),
          category_folders = course_folder.getFolders(),
          course_folder_name = course_folder.getName();


      // Add any recipes right underneath top level folders (ie. directly in 'Dinner' / 'Breakfast')
      while (course_root_files.hasNext()){
        var course_root_file = course_root_files.next(),
            ingredients_string = course_root_file.getDescription(),
            ingredients_array = ingredients_string == null ? [] : ingredients_string.split("\n");
        // Remove last item if it's blank (there was an extra newline in description field)
        if (ingredients_array[ingredients_array.length - 1] == '') { ingredients_array.pop() }
        //Logger.log(course_root_file.getName() + ' | ' +  '' + ' | ' +  '');
        all_recipes.push({course: course_folder_name,
          category: '',
          subcategory: '',
          name: course_root_file.getName(),
          ingredients: ingredients_array});
      }

      while (category_folders.hasNext()) {
        var category_folder = category_folders.next(),
            category_files = category_folder.getFiles(),
            subcategory_folders = category_folder.getFolders(),
            category_folder_name = category_folder.getName();


        // Add any recipes in the category folders (ie. 'Dinner'->'Mince' / 'Breakfast'->"French Toast')
        while (category_files.hasNext()){

          var category_file = category_files.next(),
              ingredients_string = category_file.getDescription(),
              ingredients_array = ingredients_string == null ? [] : ingredients_string.split("\n");
          // Remove last item if it's blank (there was an extra newline in description field)
          if (ingredients_array[ingredients_array.length - 1] == '') { ingredients_array.pop() }
          ingredients_array.forEach(function(rec){ rec = rec.toLowerCase();});

          //Logger.log(category_file.getName() + ' | ' +  category_folder_name + ' | ' +  '');
          all_recipes.push({course: course_folder_name,
            category: category_folder_name,
            subcategory: '',
            name: category_file.getName(),
            ingredients: ingredients_array});
        }

        while (subcategory_folders.hasNext()) {
          var subcategory_folder = subcategory_folders.next(),
              subcategory_files = subcategory_folder.getFiles(),
              subcategory_folder_name = subcategory_folder.getName();


          // Add any recipes in the subcategory folders (ie. 'Dinner'->'Chicken'->'Curries' / 'Lunch'->"Sweet'->'Cookies')
          while (subcategory_files.hasNext()){
            var subcategory_file = subcategory_files.next(),
                ingredients_string = subcategory_file.getDescription(),
                ingredients_array = ingredients_string == null ? [] : ingredients_string.split("\n");
            // Remove last item if it's blank (there was an extra newline in description field)
            if (ingredients_array[ingredients_array.length - 1] == '') { ingredients_array.pop() }
            //Logger.log(subcategory_file.getName() + ' | ' +  category_folder_name + ' | ' +  subcategory_folder_name);
            all_recipes.push({course: course_folder_name,
              category: category_folder_name,
              subcategory: subcategory_folder_name,
              name: subcategory_file.getName(),
              ingredients: ingredients_array});
          }
        }
      }
    }
  }
  insertRecipesIntoSheet(all_recipes);
  return all_recipes;
};

// Retrieves data from AllRecipes
function getAllRecipes(){
  SpreadsheetApp.setActiveSpreadsheet(SpreadsheetApp.openById('1-e3LVnZ9C6giP27ztvHifnLuBGQktjxyRC_qOXCVDJg'));
  var active_spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      last_row = active_spreadsheet.getLastRow();
  active_spreadsheet.setActiveSheet(active_spreadsheet.getSheetByName('AllRecipes'));
  var all_recipes_sheet = SpreadsheetApp.getActiveSheet(),
      existing_recipes = last_row == 1 ? [] : all_recipes_sheet.getRange(2, 1, last_row - 1, 5).getValues(),
      all_recipes = [];
  existing_recipes.forEach(function(recipe){
    var recipe_obj = {};
    recipe_obj.name = recipe[0];
    recipe_obj.course = recipe[1];
    recipe_obj.category = recipe[2];
    recipe_obj.subcategory = recipe[3];
    recipe_obj.ingredients = BarDelimitedToArray(recipe[4]);
    all_recipes.push(recipe_obj);
  });
  return all_recipes;
};


function insertRecipesIntoSheet(recipes_array){
  var active_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  active_spreadsheet.setActiveSheet(active_spreadsheet.getSheetByName('AllRecipes'));
  var all_recipes_sheet = SpreadsheetApp.getActiveSheet(),
      range = all_recipes_sheet.getRange(2,1,recipes_array.length,5),
      data_to_insert = [];

  var existing_recipes = all_recipes_sheet.getRange(2,1,all_recipes_sheet.getLastRow(),5);
  existing_recipes.clear();

  recipes_array.forEach(function(recipe){
    data_to_insert.push([recipe.name, recipe.course, recipe.category, recipe.subcategory, recipe.ingredients.join('|')]);
  });

  range.setValues(data_to_insert);
}











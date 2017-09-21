function doGet(e) {
  //return HtmlService.createHtmlOutput('<b>Hello, world!</b>')
  var params = JSON.stringify(e),
      parameters = e.parameters;

  // Ingredients Search
  if (parameters.ingredient != null){
    /*var output = HtmlService.createHtmlOutput('<b>Searching for "' + parameters.ingredient + '"</b>'),
     matching_recipes = searchForIngredient(parameters.ingredient.toString()),
     courses = [];
     Logger.log(matching_recipes);

     output.append('<p>Found ' + matching_recipes.length + ' Recipes</p>');
     matching_recipes.forEach(function(recipe){
     var existing_course_idx = hashArrayContainsValue('name', recipe.course, courses, 'idx');
     if (existing_course_idx < 0){
     Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);
     courses.push({name: recipe.course, recipes: ['<a href="' + recipe.web_url + '">' + recipe.name + '</a> | ' +
     recipe.category + ' (' + searchDocForIngredient(recipe.doc_id, recipe.match) + ')']});
     } else {
     Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);
     courses[existing_course_idx].recipes.push('<a href="' + recipe.web_url + '">' + recipe.name + '</a> | ' +
     recipe.category + ' (' + searchDocForIngredient(recipe.doc_id, recipe.match) + ')');
     }

     });

     courses.forEach(function(course){
     output.append('<p>' + course.name + ' </p>');
     output.append('<ul>');
     course.recipes.forEach(function(recipe){
     //output.append('<img src="'+getImageFromRecipe('18M-SWL9QsysTcZQNi8ltwkuSWgLbgdXy8Rs0Vxywg-Y').getBlob()+'">')
     output.append('<li>'+recipe+'</li>');
     });
     output.append('</ul>');
     });



     return output;
     */
  }

  // Course Search
  else if (parameters.course != null){

  }
  else if (parameters.image != null){
    /*var output = HtmlService.createHtmlOutput('<b>Image Test</b>'),
     image = getImageFromRecipe('16pXPNJ8Z2kRsrUYndHpON9aN-4rhRqjD2g1eTIWcDRc');
     output.append('<pre>');
     output.append('<img src="' + URL.createObjectURL(image) + '">');
     //<img src="pic_mountain.jpg" alt="Mountain View" style="width:304px;height:228px;">
     output.append('</pre>');
     return output;*/
  }
  else {
    return HtmlService.createHtmlOutputFromFile('index');
  }

};

function handleFormSubmit(a){
  Logger.log('handleFormSubmit');
};

function processForm(formObject) {
  var recipe_title = formObject.title_search_field,
      exact_match = formObject.exact_match.toString() == 'on' ? true : false;

  if (recipe_title == ''){
    //Searching for Ingredient
    var matching_recipes = searchForIngredient(formObject.search_field.toString(), exact_match),
        output = '<h2>Search Results</h2>',
        courses = [];

    //Logger.log(matching_recipes);
    output +='<p>Found ' + matching_recipes.length + ' Recipes</p>';

    matching_recipes.forEach(function(recipe){
      var existing_course_idx = hashArrayContainsValue('name', recipe.course, courses, 'idx');
      if (existing_course_idx < 0){
        Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);
        courses.push({name: recipe.course, recipes: ['<a href="' + recipe.web_url + '">' + recipe.name + '</a> | ' +
        recipe.category + ' (' + searchDocForIngredient(recipe.doc_id, recipe.match) + ')']});
      } else {
        Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);
        courses[existing_course_idx].recipes.push('<a href="' + recipe.web_url + '">' + recipe.name + '</a> | ' +
          recipe.category + ' (' + searchDocForIngredient(recipe.doc_id, recipe.match) + ')');
      }

    });

    courses.forEach(function(course){
      output += '<p>' + course.name + ' </p>';
      output += '<ul>';
      course.recipes.forEach(function(recipe){
        output += '<li>'+recipe+'</li>';
      });
      output +='</ul>';
    });

    Logger.log(output);

    return output;
  }
  else {
    //Searching for Recipe Title
    var matching_recipes = searchForTitle(formObject.title_search_field.toString()),
        output = '<h2>Search Results</h2>',
        courses = [];
    output +='<p>Found ' + matching_recipes.length + ' Recipes</p>';

    matching_recipes.forEach(function(recipe){
      var existing_course_idx = hashArrayContainsValue('name', recipe.course, courses, 'idx'),
          cat = recipe.category == '' ? '' : (' | ' + recipe.category);
      if (existing_course_idx < 0){
        Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);

        courses.push({name: recipe.course, recipes: ['<a href="' + recipe.web_url + '">' + recipe.name + '</a>' + cat]});
      } else {
        Logger.log('about to search for ' + recipe.match + ' in ' + recipe.web_url);
        courses[existing_course_idx].recipes.push('<a href="' + recipe.web_url + '">' + recipe.name + '</a>' + cat);
      }
    });
    courses.forEach(function(course){
      output += '<p>' + course.name + ' </p>';
      output += '<ul>';
      course.recipes.forEach(function(recipe){
        output += '<li>'+recipe+'</li>';
      });
      output +='</ul>';
    });

    Logger.log(output);

    return output;
  }

  //Logger.log(formObject.search_field);
};

function doPost(e) {
  Logger.log('POST');
};

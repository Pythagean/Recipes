function doGet(e) {
  //return HtmlService.createHtmlOutput('<b>Hello, world!</b>')
  var params = JSON.stringify(e),
      parameters = e.parameters;

  // Ingredients Search
  if (parameters.ingredient != null){
    var output = HtmlService.createHtmlOutput('<b>Searching for "' + parameters.ingredient + '"</b>'),
        matching_recipes = searchForIngredient(parameters.ingredient.toString()),
        courses = [];
    Logger.log(matching_recipes);

    output.append('<p>Found ' + matching_recipes.length + ' Recipes</p>');
    matching_recipes.forEach(function(recipe){
      var existing_course_idx = hashArrayContainsValue('name', recipe.course, courses, 'idx');
      if (existing_course_idx < 0){
        Logger.log('about to search for ' + recipe.match);
        courses.push({name: recipe.course, recipes: ['<a href="' + recipe.web_url + '">' + recipe.name + '</a> | ' +
        recipe.category + ' (' + searchDocForIngredient(recipe.doc_id, recipe.match) + ')']});
      } else {
        Logger.log('about to search for ' + recipe.match);
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

  }

  // Course Search
  else if (parameters.course != null){

  }
  else {
    return HtmlService.createHtmlOutput(parameters);
  }
  //var matching_recipes = searchForIngredient(params);
  //return HtmlService.createHtmlOutput(parameters.search);
}

function doPost(e) {

}

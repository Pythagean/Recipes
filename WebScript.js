function doGet(e) {
  //return HtmlService.createHtmlOutput('<b>Hello, world!</b>')
  var params = JSON.stringify(e),
      parameters = e.parameters;
  if (parameters.search != null){
    var output = HtmlService.createHtmlOutput('<b>Searching for "' + parameters.search + '"</b>'),
        matching_recipes = searchForIngredient(parameters.search.toString()),
        courses = [];

    output.append('<p>Found ' + matching_recipes.length + ' Recipes</p>');
    matching_recipes.forEach(function(recipe){
      var existing_course_idx = hashArrayContainsValue('name', recipe.course, courses, 'idx');
      if (existing_course_idx < 0){
        courses.push({name: recipe.course, recipes: [recipe.name + ' (' + recipe.category + ')']});
      } else {
        courses[existing_course_idx].recipes.push(recipe.name + ' (' + recipe.category + ')');
      }

    });

    courses.forEach(function(course){
      output.append('<p>' + course.name + ' </p>');
      output.append('<ul>');
      course.recipes.forEach(function(recipe){
        output.append('<li>'+recipe+'</li>');
      });
      output.append('</ul>');
    });



    return output;

  } else {
    return HtmlService.createHtmlOutput(parameters.search);
  }
  //var matching_recipes = searchForIngredient(params);
  //return HtmlService.createHtmlOutput(parameters.search);
}

function doPost(e) {

}

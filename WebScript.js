function doGet(e) {
  //return HtmlService.createHtmlOutput('<b>Hello, world!</b>')
  var params = JSON.stringify(e),
      parameters = e.parameters;
  if (parameters.search != null){
    var output = HtmlService.createHtmlOutput('<b>Searching for "' + parameters.search + '"</b>'),
        matching_recipes = searchForIngredient(parameters.search.toString());

    output.append('<p>Found ' + matching_recipes.length + ' Recipes</p>');

    return output;

  } else {
    return HtmlService.createHtmlOutput(parameters.search);
  }
  //var matching_recipes = searchForIngredient(params);
  //return HtmlService.createHtmlOutput(parameters.search);
}

function doPost(e) {

}

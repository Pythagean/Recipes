function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  }];

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Scripts')
    .addItem('Import Recipes', 'importIntoAllRecipes')
    .addToUi();

};

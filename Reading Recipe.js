// Not working
function getImageFromRecipe(doc_id) {
  var doc = DocumentApp.openById(doc_id),
      doc_body = doc.getBody(),
      image = doc_body.findElement(DocumentApp.ElementType.INLINE_IMAGE);
  Logger.log(image.getElement());
  return image.getElement().getAs('image/png');
};

//https://developers.google.com/apps-script/reference/document/body


function searchDocForIngredient(doc_id, ingredient){
  doc_id = doc_id == null ? '1UXzvGst8GhU5FvbQEFZngIqDBP2qDDDvd45c0tLzZrY' : doc_id;
  ingredient = ingredient == null ? 'chives' : ingredient;

  var doc = DocumentApp.openById(doc_id),
      doc_body = doc.getBody(),
      range_to_search = doc.newRange(),
      search_results = '';

  range_to_search.addElementsBetween(doc_body.findText('Ingredients').getElement(),doc_body.findText('Instructions').getElement());

  var elements = range_to_search.getRangeElements();
  elements.forEach(function(element){
    if (element.getElement().getType() == DocumentApp.ElementType.LIST_ITEM){
      var element_to_search = element.getElement().asListItem().getText();
      //Logger.log('Searching for "' + ingredient + '" in "' + element_to_search + '"');
      if (ingredient == element_to_search || ingredient == element_to_search.toLowerCase() || element_to_search.match(ingredient)!= null){
        search_results = element_to_search;
        return;
      }

    }
  });

  if (search_results == '') { return '';}
  var text = search_results;
  text = text.split('(')[0];
  text = text.split(',')[0];
  text = text.split('-')[0];

  return text;
}

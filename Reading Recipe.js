// Not working
function getImageFromRecipe(doc_id) {
  var doc = DocumentApp.openById(doc_id),
      doc_body = doc.getBody(),
      image = doc_body.findElement(DocumentApp.ElementType.INLINE_IMAGE);
  return image.getElement();
};

//https://developers.google.com/apps-script/reference/document/body


function searchDocForIngredient(doc_id, ingredient){
  doc_id = doc_id == null ? '16pXPNJ8Z2kRsrUYndHpON9aN-4rhRqjD2g1eTIWcDRc' : doc_id;
  ingredient = ingredient == null ? 'cream' : ingredient;
  var doc = DocumentApp.openById(doc_id),
      doc_body = doc.getBody(),
      search_results = doc_body.findText(ingredient);

  if (search_results == null) {
    search_results = doc_body.findText(ingredient.toLowerCase());
    if (search_results == null) {
      search_results = doc_body.findText(ingredient[0].toUpperCase()+ingredient.substr(1));
    };
  };
  if (search_results == null) { return '';}
  var text = search_results.getElement().getText();
  text = text.split('(')[0];
  text = text.split(',')[0];
  text = text.split('-')[0];

  return text;
  //Logger.log(search_results.getElement().getText());
}
function BarDelimitedToArray(string){
  var result = [],
      array = string.split('|');
  /*array.forEach(function(rec){
   var split_rec = rec.split('_');
   result.push({id: split_rec[0], name: split_rec[1]});
   });*/
  return array;
};

function test(){
  var array = ['Breakfast','Dinner','Lunch'];
  var bfast = 'Breakfast',
      test = 'ASDSDSSF';
  Logger.log('bfast: ' + arrayContainsValue(bfast,array,'idx'));
  Logger.log('test: ' + arrayContainsValue(test,array,'idx'));
};



function arrayContainsValue(value, array, return_value){
  Logger.log('checking for "' + value + '" inside "' + array + '"');
  var value_to_return = return_value == 'bool' ? false : -1;
  array.forEach(function(arr_val, index){
    if (arr_val == value) {
      value_to_return = return_value == 'bool' ? true : index;
      return;
    }
  });
  Logger.log('value_to_return: ' + value_to_return);
  return value_to_return;
};



// Check if a given array contains a game (can look up by the specified field)
function hashArrayContainsValue(field, value, array_of_games, return_val) {
  //Logger.log('checking if ' + field + '-' + value + ' is in array');
  var arr = [];
  for (var i = 0; i < array_of_games.length; i++) {
    if (array_of_games[i][field] == value) {
      //Logger.log(array_of_games[i][field] + ' == ' + value);
      if (return_val == 'bool') {
        return true;
      } else if (return_val == 'idx'){
        return i;
      } else if (return_val == 'array'){
        arr.push(array_of_games[i]);
      }
    }
  }
  if (return_val == 'bool') {
    return false;
  } else if (return_val == 'idx') {
    return -1;
  } else if (return_val == 'array'){
    return arr;
  }
};
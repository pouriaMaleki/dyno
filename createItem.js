var when = require('when');

module.exports = function(dynamodb, itemParams){
  return when.promise(function(resolve, reject){
    dynamodb.putItem(itemParams, function(err, data) {
      if (err) reject(err);
      else {
        console.log("Item is successfully added");
        resolve(data);
      }
    });
  });
}
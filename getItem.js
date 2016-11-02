var when = require('when');

module.exports = function(dynamodb, key){
  return when.promise(function(resolve, reject){
    dynamodb.getItem({Key: {id: {S: key}}, TableName: "TestTable"}, function(err, data) {
      if (err) reject(err);
      else {
        console.log("Item is successfully fetched");
        resolve(data.Item);
      }
    });
  });
} 
var when = require('when');

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1000,
    WriteCapacityUnits: 1000
  },
  TableName: 'TestTable',
};

function ensureTableIsActive(dynamodb, tableName, resolve, reject) {
  dynamodb.describeTable({ TableName: tableName }, function(err, data) {
    if (err) reject()
    else {
      if (data.Table && data.Table.TableStatus && data.Table.TableStatus == "ACTIVE") {
        console.log("TestTable is actived");
        resolve();
      } else {
        console.log("TestTable is not active, retrying in 500ms");
        setTimeout(function(){
          ensureTableIsActive(dynamodb, tableName, resolve, reject);
        }, 500)
      }
    }
  });
};

module.exports = function(dynamodb){
  return when.promise(function(resolve, reject){
    dynamodb.createTable(params, function(err, data) {
      if (err) reject(err);
      else {
        console.log("TestTable created successfully");
        // This is not just a wierd code
        // this will recursively ensure table created and status changed to active
        // so we can put items in it.
        ensureTableIsActive(dynamodb, params.TableName, resolve, reject);
      }
    });
  });
}
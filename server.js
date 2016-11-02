var prepareFakeDynamoDB = require('./prepareFakeDynamoDB'),
    DynamoDB = require('./DynamoDB'),
    createTestTable = require('./createTestTable');
    createItem = require('./createItem');
    getItem = require('./getItem');

var key = 'some_unique_key';
var itemParams = {
  Item: { /* required */
    id: {S: key}, 
    data: {S: 'TEST DATA'},
  },
  TableName: 'TestTable'
};

prepareFakeDynamoDB().then(function(){
  dynamodb = DynamoDB();
  createTestTable(dynamodb).then(function(){
    createItem(dynamodb, itemParams).then(function(){
      getItem(dynamodb, key).then(function(item){
        console.log(item);
      });
    });
  });
});
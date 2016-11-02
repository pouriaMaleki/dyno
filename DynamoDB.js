var AWS = require('aws-sdk');

module.exports = function () {
  return new AWS.DynamoDB({region: 'us-west-1', endpoint: 'http://localhost:4567'});
}
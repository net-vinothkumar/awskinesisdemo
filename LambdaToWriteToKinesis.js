
var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {

   var kinesis = new AWS.Kinesis();

kinesis.putRecord({

  Data: '{"action": "click", "productId": "lunchbag"}',

  PartitionKey: 'user-123',

  StreamName: 'testkinesis'

}, function(err, data) {

  if (err) {

    console.log(err, err.stack); // an error occurred

  } else {

    console.log(data); // successful response

    return data;

  }

});

}

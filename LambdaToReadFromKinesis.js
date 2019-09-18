
var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {

   var kinesis = new AWS.Kinesis();

kinesis.describeStream({

  StreamName: 'testkinesis'

}, function(err, streamData) {

  if (err) {

    console.log(err, err.stack); // an error occurred

  } else {

    console.log(streamData); // successful response

    streamData.StreamDescription.Shards.forEach(shard => {

      kinesis.getShardIterator({

        ShardId: shard.ShardId,

        ShardIteratorType: 'TRIM_HORIZON',

        StreamName: 'testkinesis'

      }, function(err, shardIteratordata) {

        if (err) {

          console.log(err, err.stack); // an error occurred

        } else {

          console.log(shardIteratordata); // successful response

          kinesis.getRecords({

            ShardIterator: shardIteratordata.ShardIterator

          }, function(err, recordsData) {

            if (err) {

              console.log(err, err.stack); // an error occurred

            } else {

             

              recordsData.Records.forEach( record => {

                                console.log( record.Data.toString(), shard.ShardId );

                            } );

            }

          });

        }

      });

    });

  }

});

};

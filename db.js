var mongodb = require('mongodb');

module.exports = {
    getMongo: function(callback) {
        var MongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/twutter';
        MongoClient.connect(url, function (err, db) {
          callback(db);
        });
    }
};
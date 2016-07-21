var express       = require('express');
var router        = express.Router();
var db            = require('./db');

router.get('/', function(request, response) {

  var data = {
    message: "Welcome!"
  };

  response.status(200);
  response.send(data);

});

// Get all users
router.get('/user', function(request, response) {

  db.getMongo(function(mongo) {

    mongo.collection('users').find({}).toArray(function (err, result) {
      response.status(200);
      response.send(result);
    });

  });
});


// Get a single user
router.get('/user/:username', function(request, response) {

  var username = request.params.username;

  db.getMongo(function(mongo) {

    mongo.collection('users').findOne({username: username}, function (err, result) {
      response.status(200);
      response.send(result);
    });

  });
});


// Get a user's messages
router.get('/user/:username/message', function(request, response) {

  var username = request.params.username;

  db.getMongo(function(mongo) {

    mongo.collection('messages')
    .find({username: username})
    .sort({datetime: -1})
    .toArray(function (err, result) {
      response.status(200);
      response.send(result);
    });

  });
});

// Post a new message
router.post('/user/:username/message', function(request, response) {

  var username = request.params.username;

  var message = {
    username: username,
    content: request.body.content,
    datetime: new Date()
  };

  db.getMongo(function(mongo) {

    mongo.collection('messages').insert(message, function (err, result) {
      response.status(200);
      response.send(message);
    });

  });
});

// Get a user's feed
router.get('/user/:username/feed', function(request, response) {

  var username = request.params.username;

  db.getMongo(function(mongo) {

    mongo.collection('users').findOne({username: username}, function (err, user) {

      mongo.collection('messages')
      .find({username: {$in: user.following}})
      .sort({datetime: -1})
      .toArray(function (err, result) {
        response.status(200);
        response.send(result);
      });

    });

  });
});

// Get a user's followers
router.get('/user/:username/follower', function(request, response) {

  var username = request.params.username;

  db.getMongo(function(mongo) {

      mongo.collection('users')
      .find({following: {$in: [username]}})
      .toArray(function (err, result) {
        response.status(200);
        response.send(result);
      });

  });
});

// Add a follower to a user
router.post('/user/:username/follower', function(request, response) {

  var username = request.params.username;
  var follower = request.body.follower;

});


module.exports = router;
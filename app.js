var app         = require('express')();
var bodyParser  = require('body-parser');
var routes      = require('./routes');

// Enable body-parsing for application/json
app.use(bodyParser.json({
  limit: '50mb'
}));

// Register route controllers
app.use('/', routes);

app.listen(3000, function () {
  console.log('Twutter is running on port 3000');
});



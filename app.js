// set up ======================================================================
var express = require('express');
var cfenv = require('cfenv');
var favicon = require('serve-favicon');
var app = express();
var bodyParser = require('body-parser')

var appEnv = cfenv.getAppEnv();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json()); // parse application/json

require('./app/todos.js')(app);

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(favicon(__dirname + '/public/icons/favicon.ico'));

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

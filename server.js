var express = require('express');
var path = require('path');
var app = express();
var public = __dirname + "/";

app.get('/', function (req, res) {
  res.sendFile(path.join(public + 'index.html'));
});

app.use('/', express.static(public));

app.listen(3000)
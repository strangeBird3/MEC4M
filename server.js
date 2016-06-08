var http         = require('http');
var fs           = require('fs');
var path         = require('path');

// custom imports
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

//openshift settings
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';



// custom settings
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('index.handlebars');
});

app.get('/bobBooks', function(req, res){
	res.render('bobBooks')
});

app.get('/buyBob', function(req, res){
	res.render('buyBob')
});

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
});

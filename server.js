var http         = require('http');
var fs           = require('fs');
var path         = require('path');


// custom imports
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

//openshift settings
var port = process.env.PORT || 8081;


// custom settings
app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', express.static(__dirname + '/public'));



app.get('/', function(req,res){
    res.render('index');
});

app.get('/aboutus', function(req, res){
	res.render('aboutus');
});


app.listen(port, function(){
    console.log("listening on " + port);
});

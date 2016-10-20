var https		 = require('https');
var httpProxy	 = require('http-proxy');
var httpProxyRules = require('http-proxy-rules');

var express = require('express');
var bodyParser = require('body-parser');
var mainapp = express();

var proxyRules = new httpProxyRules({
	rules: {
		'.*/' : 'http://localhost:8080',
		'.*/aboutus' : 'http://localhost:8080',

		'.*/forum' : 'http://localhost:4567/forum',
	},
	default: 'http://localhost:8080'
});

var proxy = httpProxy.createProxy();	

mainapp.use(function(req,res,next){
    try{
        if (req.url.substr(0, 18).indexOf("socket.io")>-1){
            //console.log("SOCKET.IO", req.url)
            return proxy.web(req, res, { target: 'wss://localhost:4567', ws: true }, function(e) {
            //console.log('PROXY ERR',e)
            });
        } else {
            var target = proxyRules.match(req);
            if (target) {
                //console.log("TARGET", target, req.url)
                return proxy.web(req, res, {
                    target: target
                }, function(e) {
                //console.log('PROXY ERR',e)
                });
            } else {
                res.sendStatus(404);
            }
        }
    } catch(e){
        res.sendStatus(500);
    }
});
mainapp.use(bodyParser.json());
mainapp.use(bodyParser.urlencoded({ extended: false }));

var options = {/*Put your TLS options here.*/};

var mainserver = https.createServer(options, mainapp);
mainserver.listen(8080);
mainserver.on('listening', onListening);
mainserver.on('error', function (error, req, res) {
    var json;
    console.log('proxy error', error);
    if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
    }

    json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
});


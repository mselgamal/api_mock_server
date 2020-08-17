let enviroment = process.env.NODE_ENV,
  fs = require('fs'),
  path = require('path'),
  express = require('express'),
  parser = require('body-parser'),
  logger = require('morgan'),
  http = require('http'),
<<<<<<< HEAD
  https = require('http'),
  key  = fs.readFileSync(path.join(__dirname,'/security','/local-cert-generator','/server.key')),
  cert = fs.readFileSync(path.join(__dirname,'/security','/local-cert-generator','/server.crt')),
  credentials = {key: key, cert: cert};
=======
  https = require('http');
  //key  = fs.readFileSync(path.join(__dirname,'/security','/cert.key')),
  //cert = fs.readFileSync(path.join(__dirname,'/security','/cert.pem')),
  //credentials = {key: key, cert: cert};
>>>>>>> master

global.App = {
	started: false,
	app: express(),
	httpServer: http,
	httpsServer: https,
	httpPort: process.env.HTTP_PORT,
	httpsPort: process.env.HTTPS_PORT,
	root: path.join(__dirname,'..'),
	appPath: function(path){return this.root + "/" + path;},
	require: function(path){return require(this.appPath(path));},
	env: enviroment,
	start: function() {
		if (!this.started) {
			this.started = true;
			//this.httpServer.createServer(this.app).listen(this.httpPort, ()=> {
			//	console.log("Mock Server, http port " + this.httpPort);
			//});
			//this.httpsServer.createServer(credentials, this.app).listen(this.httpsPort, ()=>{
			//	console.log("Mock Server, https port " + this.httpsPort);
			//});
			this.app.listen(this.httpPort,()=> {
				console.log("Mock Server, http port " + this.httpPort);
			});
		} else {
			console.log("MOCK Server app is already running");
		}
	}
};

App.app.use(parser.json());
App.app.use(logger("common"));

let routes = App.require('routes/routes.js'),
    handler = App.require('handlers/handler.js'),
    router = express.Router();
App.app.use(router);

routes.routes(router,handler);

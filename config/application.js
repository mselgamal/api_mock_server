let enviroment = process.env.NODE_ENV,
  path = require('path'),
  express = require('express'),
  parser = require('body-parser'),
  logger = require('morgan');

global.App = {
	started: false,
	app: express(),
	httpPort: process.env.HTTP_PORT,
	httpsPort: process.env.HTTPS_PORT,
	root: path.join(__dirname,'..'),
	appPath: function(path){return this.root + "/" + path;},
	require: function(path){return require(this.appPath(path));},
	env: enviroment,
	start: function() {
		if (!this.started) {
      this.started = true;
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

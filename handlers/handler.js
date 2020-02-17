let cloudCenterSuite = require('../src/CloudCenterSuite').CloudCenterSuite;
let path = require('path');
let fs = require('fs');

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  req url -> http://server_addr/
*/
function home(req,res) {
  res.type("application/json");
  res.sendStatus(200);
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  req url -> http://server_addr/
*/
function randomizeJobsStatus(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.randomizeJobsStatus();
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 500).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  req url -> http://server_addr/
*/
function changeJobStatus(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.changeJobStatus(req.query);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    console.log(err);
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 500).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  req url -> http://server_addr/
*/
function changeJobsByStatus(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.changeJobsByStatus(req.query);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    console.log(err);
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 500).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  req url -> http://server_addr/
*/
function createJobs(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.createJobs(req.query);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 500).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  starts TAP process
  req url http://server_addr/cloudcenter-ccm-backend/api/v2/jobs/{id}
*/
function getJob(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getJob(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

function getAnyRoute(req, res, next) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    let rootDir = path.join(__dirname, '..', 'api');
    let dirs = fs.readdirSync(rootDir);
    for (let i = 0; i < dirs.length ;i++) {
      folder = dirs[i];
      if (!folder.startsWith('.')) {
        filePath = path.join(__dirname, '..', 'api', folder, 'api_routes.json');
        if (fs.existsSync(filePath)) {
          try {
            let apiRoutes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            url = req.path
            if (apiRoutes.hasOwnProperty(url)) {
              httpCode = 200;
              filePath = path.join(__dirname, '..', 'api', folder, apiRoutes[url]);
              result = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              break;
            }
          } catch(err) {
            throw new Error('could not reason route in api_route.json - error ' + err.message);
          }
        }
      }
    }
  } catch(err) {
    console.log(err);
    httpCode = 500;
    result = err.message;
  } finally {
    if (result) {
      res.status(httpCode ? httpCode : 404).send(result);
    }
    else {
      console.log('sending to next route');
      next();
    }
  }
}

exports.home = home;
exports.getAnyRoute = getAnyRoute;
exports.createJobs = createJobs;
exports.changeJobStatus = changeJobStatus;
exports.changeJobsByStatus = changeJobsByStatus;
exports.randomizeJobsStatus = randomizeJobsStatus;
exports.getJob = getJob;
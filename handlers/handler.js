let cloudCenterSuite = require('../src/CloudCenterSuite').CloudCenterSuite;

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
    result = cloudCenterSuite.createJobs();
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
  req url -> http://server_addr/cloudcenter-ccm-backend/api/v2/jobs
*/
function getJobs(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getJobs();
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
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

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-cloud-setup/api/v1/tenants
*/
function getTenants(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenants(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-ccm-backend/api/v1/clouds
*/
function getClouds(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getClouds(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-ccm-backend/api/v1/tenants/:tenantId
*/
function getTenant(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenant(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/suite-idm/api/v1/currentUser/userInfo
*/
function getUserInfo(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getUserInfo(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds
*/
function getTenantClouds(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenantClouds(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloud
*/
function getTenantCloud(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenantCloud(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloudId/regions/:regionId
*/
function getTenantCloudRegion(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenantCloudRegion(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

/**
  @param {Object} httpRequest
  @param {Object} httpResponse
  
  req url http://server_addr/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloudId/regions
*/
function getTenantCloudRegions(req,res) {
  res.type("application/json");
  let httpCode = null;
  let result = null;
  try {
    result = cloudCenterSuite.getTenantCloudRegions(req.params);
    httpCode = result.code;
    result = result.result;
  } catch(err) {
    httpCode = 500;
    result = err.message;
  } finally {
    res.status(httpCode ? httpCode : 404).send(result);
  }
}

exports.home = home;
exports.createJobs = createJobs;
exports.changeJobStatus = changeJobStatus;
exports.changeJobsByStatus = changeJobsByStatus;
exports.randomizeJobsStatus = randomizeJobsStatus;
exports.getJobs = getJobs;
exports.getJob = getJob;
exports.getTenants = getTenants;
exports.getClouds = getClouds;
exports.getTenant = getTenant;
exports.getUserInfo = getUserInfo;
exports.getTenantClouds = getTenantClouds;
exports.getTenantCloud = getTenantCloud;
exports.getTenantCloudRegion = getTenantCloudRegion;
exports.getTenantCloudRegions = getTenantCloudRegions;
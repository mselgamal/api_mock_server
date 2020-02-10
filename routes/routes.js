function routes(router,handler) {

	router.route('/')
		.get(handler.home);
		
	router.route('/be-console/api/v1.1/instances')
		.post(handler.getInstances);

	router.route('/be-console/api/v1.1/workflows')
		.post(handler.getWorkflows);

	router.route('/randomize/jobs/status')
		.get(handler.randomizeJobsStatus);

	router.route('/change/job/status')
		.get(handler.changeJobStatus);
	
	router.route('/change/jobs/bystatus')
		.get(handler.changeJobsByStatus);

	router.route('/create/jobs')
		.get(handler.createJobs);

	router.route('/cloudcenter-ccm-backend/api/v2/jobs')
		.get(handler.getJobs);

	router.route('/cloudcenter-ccm-backend/api/v2/jobs/:job_id')
		.get(handler.getJob);

	router.route('/cloudcenter-ccm-backend/api/v1/clouds')
		.get(handler.getClouds);

	router.route('/cloudcenter-ccm-backend/api/v1/tenants')
		.get(handler.getTenants);
	
	router.route('/cloudcenter-ccm-backend/api/v1/tenants/:tenantId')
		.get(handler.getTenant);

	router.route('/suite-idm/api/v1/currentUser/userInfo')
		.get(handler.getUserInfo);
	
	router.route('/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds')
		.get(handler.getTenantClouds);
	
	router.route('/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloud')
		.get(handler.getTenantCloud);
		
	router.route('/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloudId/regions/:regionId')
		.get(handler.getTenantCloudRegion);

	router.route('/cloudcenter-cloud-setup/api/v1/tenants/:tenantId/clouds/:cloudId/regions')
		.get(handler.getTenantCloudRegions);
}

exports.routes = routes;

function routes(router,handler) {

	router.route('/')
		.get(handler.home);
	
	router.route('/*')
		.all(handler.getAnyRoute);

	router.route('/cloudcenter-ccm-backend/api/v2/jobs/:job_id')
		.get(handler.getJob);

	router.route('/randomize/jobs/status')
		.get(handler.randomizeJobsStatus);

	router.route('/change/job/status')
		.get(handler.changeJobStatus);
	
	router.route('/change/jobs/bystatus')
		.get(handler.changeJobsByStatus);

	router.route('/create/jobs')
		.get(handler.createJobs);
}

exports.routes = routes;
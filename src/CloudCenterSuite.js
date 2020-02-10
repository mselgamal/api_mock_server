let fs = require('fs')
let path = require('path');

class CloudCenterSuite{
    constructor(){
        this.parentJobId = 100
    }

    changeInstanceState(query) {
        /**
         * params -> inst_id and newState
         * open get_instances.json
         * find the job id in the params
         * change the status according to the param
         * save get_instances.json back to disk
         * return the job the was changed
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_instances.json');
        let instances = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let inst = null;
        instances.jobs.forEach((element)=> {
            if (element.id === query.job_id && element.status !== query.new_status) {
                element.status = query.new_status;
                inst = element;
            }
        });

        if (inst) {
            filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_instancess.json');
            fs.writeFileSync(filePath, JSON.stringify(instances), 'utf8');
        }

        return {code: 200, result: inst ? inst : JSON.stringify({message: 'instance already has new_state or does not exist, no update'})};
    }

    changeJobStatus(query) {
        /**
         * params -> job_id and newStatus
         * open get_jobs.json
         * find the job id in the params
         * change the status according to the param
         * save get_jobs.json back to disk
         * return the job the was changed
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        let bulkJobs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let job = null;
        bulkJobs.jobs.forEach((element)=> {
            if (element.id === query.job_id && element.status !== query.new_status) {
                element.status = query.new_status;
                job = element;
            }
        });

        if (job) {
            filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
            fs.writeFileSync(filePath, JSON.stringify(bulkJobs), 'utf8');
        }

        return {code: 200, result: job ? job : JSON.stringify({message: 'job already has new_state or does not exist, no update'})};
    }

    changeJobsByStatus(query) {
        /**
         * params -> limit, oldStatus, newStatus
         * open file get_jobs.json
         * for itertion untill limit
         * find a job with old status and change the status to new status
         * add the job to result object
         * save get_jobs back to disk and overright the old file
         * return results back to user with jobs altered
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        let bulkJobs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let jobs = [];
        let limit = query.limit ? Number(query.limit) : 0;

        for (let i = 0; i < bulkJobs.jobs.length && limit > 0; i++) {
            let job = bulkJobs.jobs[i];
            if (job.status === query.old_status) {
                job.status = query.new_status;
                limit--;
                jobs.push(job);
            }
        }
        
        if (jobs) {
            filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
            fs.writeFileSync(filePath, JSON.stringify(bulkJobs), 'utf8');
        }

        return {code: 200, result: jobs ? jobs : JSON.stringify({message: 'no jobs found with old status'})};
    }

    randomizeJobsStatus() {
        let statuses = {'JobRunning': ['JobFinished', 'JobRunning', 'JobStarting', 'JobSubmitted', 'JobCanceled', 'JobCancelling', 'JobError', 'JobPending', 'JobStopped', 'JobStopping', 'JobStoppingError', 'JobScaling', 'JobRejected', 'JobMigrating', 'JobMigrationError', 'JobUpgrading', 'JobUpgradeError', 'JobSuspending', 'JobSuspended', 'JobResuming', 'JobReconfiguring'],
                        'JobStarting': [],
                        'JobCancelling': [],
                        'JobPending': [],
                        'JobStopping': [],
                        'JobSuspending': [],
                        'JobScaling': [],
                        'JobMigrating': [],
                        'JobUpgrading': [],
                        'JobResuming': [],
                        'JobReconfiguring': [],
                        'JobUpgradeError': [],
                        'JobMigrationError': [],
                        'JobReconfiguring': []
        };  
        let randomize = (status)=> {
            return Math.floor(Math.random() * Math.floor(statuses[status].length));
        }

        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        let getJobs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        getJobs.jobs.forEach((ele, idx)=> {
            if (idx % 2 === 0 && statuses.hasOwnProperty(ele.status)) {
                ele.status = statuses[ele.status][randomize(ele.status)];
            }
        });

        return {code:200, result: JSON.stringify(getJobs)};
    }

    getJobs(){
        // retrieve from disk data saved by createJobs()
        // use file name get_jobs.json
        // convert to a json file or just send back to handler
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        let getJobs = fs.readFileSync(filePath, 'utf8');
        return {code:200, result: getJobs};
    }

    getWorkflows(){
        // retrieve from disk data saved by createJobs()
        // use file name get_jobs.json
        // convert to a json file or just send back to handler
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_workflows.json');
        let getWfs= fs.readFileSync(filePath, 'utf8');
        return {code:200, result: getWfs};
    }

    getInstances(){
        // retrieve from disk data saved by createJobs()
        // use file name get_jobs.json
        // convert to a json file or just send back to handler
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_instances.json');
        let getInst = fs.readFileSync(filePath, 'utf8');
        return {code:200, result: getInst};
    }

    getJob(params){
        /*
            open the job.json file
            set the id to the one provided in the api req
            what to do about job status ?
                - grab the status from job_status map, jobid must be in there during the createJobs process
        */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'job.json');
        let job = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        let bulkJobs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let bulk_job_cpy = null;
        bulkJobs.jobs.forEach((element)=> {
            if (params.job_id === element.id) bulk_job_cpy = element;
        });
        if (bulk_job_cpy) {
            job.id = params.job_id;
            job.name = bulk_job_cpy.name;
            job.status = bulk_job_cpy.status;
            job.cloudFamily = bulk_job_cpy.cloudFamily;
            return {code: 200, result: JSON.stringify(job)};
        }
        return {code: 404, result:''};
    }

    getTenants(){
        /**
         * open get_tenants.json
         * return that json object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenants.json');
        let tenants = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenants};
    }

    getTenant(){
        /**
         * open get_tenant.json
         * return that json object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenant.json');
        let tenant = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenant};
    }

    getUserInfo(){
        /**
         * open get_userinfo.json
         * return that json object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_userinfo.json');
        let userinfo = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: userinfo};
    }

    getClouds(){
        /**
         * open get_clouds.json
         * return object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_clouds.json');
        let clouds = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: clouds};
    }

    getTenantClouds(){
        /**
         * open get_tenant_clouds.json
         * return json object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenant_clouds.json');
        let tenantClouds = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenantClouds};
    }

    getTenantCloud(){
        /**
         * open get_tenant_clouds.json
         * convert to json
         * retrieve object for specified ID in the api call
         * if id not found, return 404 not found
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenant_cloud.json');
        let tenantCloud = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenantCloud};
    }

    getTenantCloudRegions(){
        /**
         * open get_tenant_cloud_regions.json
         * return json object
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenant_cloud_regions.json');
        let tenantCloudRegs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenantCloudRegs};
    }

    getTenantCloudRegion(){
        /**
         * open get_tenant_cloud_region.json
         * convert to json
         * retrieve object for specified ID in the api call
         * if id not found, return 404 not found
         */
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_tenant_cloud_region.json');
        let tenantCloudReg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return {code: 200, result: tenantCloudReg};
    }

    createJobs(){

        // open the bulk jobs template
        // convert it to json
        // open the bulk_job template 
        // convert it to json
        /*
            for every running job
                create a running job based on the template
                    - gran next parent id
                    - use a random name, my_fake_job_<insert id>
                    - randomly give it a cloudfamily from [vmware, azure, aws]
            repeat this process for startingJobs, stoppingJobs etc, what's avaible in env variables
            save to disk using url /cloudcenter-ccm-backend/api/v2/jobs
            this data will be retrieved from disk when somoen makes api req 
            cloudcenter-ccm-backend/api/v2/jobs?showDeploymentAttributes=true&page=0&size=2000
        */
        
        let filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'bulk_job_template.json');  
        let bulkJobs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'bulk_job.json');
        let bulkJob = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        let jobs = []
        Object.keys(process.env).forEach((element)=> {  
            if (element.includes('Job')) {
                let m = new Map()
                m.set(element, Number(process.env[element]));
                jobs.push(m);
            }
        });
        let cloudFamilies = ['Vmware', 'Amazon', 'Azure'];
        jobs.forEach((element)=> {
            for (const [status, count] of element.entries()){
                for (let i = 0; i < count ;i++) {
                    let job = JSON.parse(JSON.stringify(bulkJob));
                    job.id = String(this.parentJobId++);
                    job.name = "my_fake_job_".concat(job.id);
                    job.status = status;
                    let idx = Math.floor(Math.random() * Math.floor(cloudFamilies.length));
                    job.cloudFamily = cloudFamilies[idx];
                    bulkJobs.jobs.push(job);
                }
            }
        });

        bulkJobs.size = bulkJobs.jobs.length;
        bulkJobs.totalElements = bulkJobs.jobs.length;
        bulkJobs.totalPages = 1;
        filePath = path.join(__dirname, '..', 'api', 'cloudcenter5.x', 'get_jobs.json');
        fs.writeFileSync(filePath, JSON.stringify(bulkJobs), 'utf8');
        return {code:200, result: bulkJobs};
    }
}

exports.CloudCenterSuite = new CloudCenterSuite();
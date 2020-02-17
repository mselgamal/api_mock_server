## Adding an API
- under api folder create directory for your api
- save any json files representing api responses
- create api_routes.json
	- for each json file created, make a key:value association
	- for example: 
		{
			"/api/v1/jobs": "get_jobs.json",
			"/api/v1/job": "get_job.json"
		}
		
## Install Steps
- [install nodejs](https://nodejs.org/en/download/)
- [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- open cli:
	- go to root folder where repo would reside
	- run git clone https://github.com/mselgamal/api_mock_server.git
- install dependencies:
	- go to repo folder
	- run "npm install --save"
- start server:
	- npm start
- start server as a service:
	- install forever, 'npm install forever -g'
	- check forever --help for common commands
	- forever start app.js
	- forever list, displays running processes

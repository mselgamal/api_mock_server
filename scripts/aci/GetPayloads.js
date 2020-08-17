let https = require('https');
let fs = require('fs');
let path = require('path');
let sha1 = require('sha1');

let filePath = path.join(__dirname, 'postman-aci-collection.json');
let requests = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let host = null;
let user = null;
let passwd = null;
let cookie = null;
let apicChallange = null;

requests.variable.forEach((obj)=> {
    if (obj.key === "host") {
        host = obj.value;
    } else if (obj.key == "user") {
        user = obj.value;
    } else if (obj.key == "password") {
        passwd = obj.value;
    }
});

let options = {
    host: host.replace('https://', '').replace('http://', ''),
    path: "",
    method: "GET",
    rejectUnauthorized: false,
    headers: {
        "Content-Type": "application/json",
    }
}

function updateCookie(token, urlToken) {
    cookie = token;
    apicChallange = urlToken;
}

let reqResMap = {};
function req(cb) {
    if (requests.item.length !== 0) {
        let reqItem = requests.item.shift();
        let apiPath = reqItem.request.url.raw.replace('{{host}}', '');
        options.path = apiPath;
        options.method = reqItem.request.method;

        if (cookie !== null) {
            options.headers['Cookie'] = 'APIC-cookie='+cookie;
            options.headers['APIC-Challenge'] = apicChallange;
            //console.log(options.headers['Cookie']);
        }

        console.log(options.host, options.path, options.method);
        let https_req = https.request(options, function(res) {
            res.setEncoding('utf8');
            let body = '';
        
            res.on('data', function(chunk) {
                body = body + chunk;
            });
        
            res.on('end',function(){
                if (res.statusCode != 200) {
                    console.log("Api call failed with response code " + res.statusCode);
                    console.log(body)
                } else {
                    console.log("request status code", res.statusCode, "Sucessful!");
                    if (options.method == 'POST' && options.path.includes('aaaLogin.json')) {
                        jsonData = JSON.parse(body);
                        cb(jsonData['imdata'][0]['aaaLogin']['attributes']['token'], 
                        jsonData['imdata'][0]['aaaLogin']['attributes']['urlToken']);
                    }
                    
                    let fileName = options.method + '_' + sha1(options.path) +'.json';
                    filePath = path.join(__dirname, '..', '..', 'api', 'json', fileName);
                    fs.writeFileSync(filePath, body, 'utf8');

                    reqResMap[apiPath] = fileName
                }
                req(null);
            });
        });
        https_req.on('error', (error)=> {
            console.log(error);
        });
        if (options.method == 'POST' && options.path.includes('aaaLogin.json')) {
            let d = {
                "aaaUser": {
                    "attributes": {
                        "name": user,
                        "pwd": passwd
                    }
                }
            }
            https_req.write(JSON.stringify(d));
        }
        https_req.end();
    } else {
        if (Object.keys(reqResMap).length !== 0) {
            filePath = path.join(__dirname, '..', '..', 'api', 'json', 'api_routes.json');
            let apiRoutes = fs.readFileSync(filePath, 'utf8');
            newApiRoutes = {...reqResMap, ...JSON.parse(apiRoutes)};
            fs.writeFileSync(filePath, JSON.stringify(newApiRoutes, 0, 4), 'utf8');
        }
    }
}
req(updateCookie);
const Https = require('https');
const Extensions = require('../lib/extensions').All();

module.exports.HttpService = class HttpService {
    static get(url){
        Https.get(url, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    }
    static getWithParams(baseUrl, paramsObject){
        baseUrl += paramsObject.toUrl(); 
        Https.get(baseUrl, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    }
}


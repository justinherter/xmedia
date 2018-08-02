'use strict';
const Service = require('./services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();
const Config = require('./config').Config;
const NetScan = require('./services/networkScanner').NetScan;
require('dotenv').load();
var nodes = [];
var working = false;
function go(){
    let config = new Config();
    console.log("config: ", config);
    console.log("nodes: ", config.nodes());
    // Config.nodes.forEach(element => {
    //     console.log("this is element: ", element);
    // });
    return NetScan.scanIPAndFilterByRange([110,119])
    .then((result) => {
        console.log("result: ", result);
        nodes = result;
        if(nodes.length > 0){
            crawl();
        }
    }).catch(err => console.log(err));
    
}
function crawl(){
    if(nodes.length > 0){
        var node = nodes.shift();
        working = true;
        console.log("working: ", working);
        console.log("node: ", node);
        try {
            Connection.on('ready', function() {
                console.log('Client :: ready');
                console.log(Service);
                Connection.sftp(function(err, sftp) {
                    if (err) throw err;
                    let crawler = new Service(sftp);
                    working = !crawler.start();
                });
            }).connect({
                algorithms: { serverHostKey: [ 'ssh-rsa', 'ssh-dss' ] },
                host: node.ip,
                port: 22,
                username: 'root',
                password: 'password'
            });
        }
        catch (err){
            console.log("********* err: ", err);
            working = false;
        }
        var interval = setInterval(() => {
            console.log("&&&&&&&&&& interval");
            if(!working){
                clearInterval(interval);
                crawl();
            }
        }, 5000)
    }
    
}
// console.log('hello');
go();
'use strict';
const Service = require('./services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();
const Config = require('./config').Config;
require('dotenv').load();

function go(){
    let config = new Config();
    console.log("config: ", config);
    console.log("nodes: ", config.nodes());
    // Config.nodes.forEach(element => {
    //     console.log("this is element: ", element);
    // });
    
    Connection.on('ready', function() {
        console.log('Client :: ready');
        console.log(Service);
        Connection.sftp(function(err, sftp) {
            if (err) throw err;
            let crawler = new Service(sftp);
            crawler.start();
        });
    }).connect({
        algorithms: { serverHostKey: [ 'ssh-rsa', 'ssh-dss' ] },
        host: '192.168.1.111',
        port: 22,
        username: 'root',
        password: 'password'
    });
}
// console.log('hello');
go();
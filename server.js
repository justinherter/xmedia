'use strict';
const Service = require('./services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();

require('dotenv').load();

function go(){
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
        host: '192.168.0.4',
        port: 22,
        username: 'root',
        password: 'password'
    });
}
// console.log('hello');
go();
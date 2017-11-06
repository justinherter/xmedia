'use strict';
const Service = require('../services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();

require('dotenv').load();
const FilePathObject = require('../models/filePathObject').FilePathObject;
var newObject = new FilePathObject({
    basePath: '/storage/self/primary/show_box/',
    subPath: 'Trolls (2016) [1080p] [YTS.AG]/',
    fileName: ''
})
var go = () => {
    Connection.on('ready', function() {
        console.log('Client :: ready');
        console.log(Service);
        Connection.sftp(function(err, sftp) {
            if (err) throw err;
            let crawler = new Service(sftp);
            var result = crawler.readDirectory(newObject.basePath + newObject.subPath);
            result.then((list) => {
                console.log(list);
            }).catch((err) => {
                console.log(err);
            })
        });
    }).connect({
        algorithms: { serverHostKey: [ 'ssh-rsa', 'ssh-dss' ] },
        host: '192.168.0.4',
        port: 22,
        username: 'root',
        password: 'password'
    });
}
go();

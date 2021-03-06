'use strict';
const Service = require('../services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();

require('dotenv').load();
const Expect = require("chai").expect;
const Media = require('../models/media').Media;
const FilePathObject = require('../models/filePathObject').FilePathObject;




var newObject = new FilePathObject({
    basePath: '/storage/self/primary/show_box/',
    subPath: 'Smurfs The Lost Village (2017) [1080p] [YTS.AG]/',
    fileName: 'Smurfs.The.Lost.Village.2017.1080p.BluRay.x264-[YTS.AG].mp4'
})
var go = () => {
    Connection.on('ready', function() {
        console.log('Client :: ready');
        console.log(Service);
        Connection.sftp(function(err, sftp) {
            if (err) throw err;
            let crawler = new Service(sftp);
            
            var result = crawler.dropDirectory(newObject);
            result.then((list) => {
                console.log(`list: ${list}`);
            }).catch((err) => {
                console.log(`error: ${err}`);
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
 
'use strict';
const Service = require('../services/crawler').Crawler;
const Client = require('ssh2').Client;
const Connection = new Client();

require('dotenv').load();
const Expect = require("chai").expect;
const Media = require('../models/media').Media;
const FilePathObject = require('../models/filePathObject').FilePathObject;



describe("ShowBox Tests", () => {
    
    describe("TV Node", () => {
        var newObject = new FilePathObject({
            basePath: '/storage/self/primary/show_box/',
            subPath: 'How the Grinch Stole Christmas (2000) [1080p]/',
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
            setInterval(()=>{},5000);
        }
        
        
        it("Connect to server and return contents of directory.", () => {
            return go();
        })
    })
})
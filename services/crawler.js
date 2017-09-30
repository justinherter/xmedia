"use strict";
const Config = require('../config');
const Client = require('ssh2').Client;
const ConnectionConfig = require('../models/connectionConfig');
const FS = require('fs');
const Media = require('../models/media').Media;

module.exports.Crawler = class Crawler {
    constructor(){
        this.homeDirectory = (process.env.ENVIRONMENT === 'development') 
        ? '/Users/home/home/media/' 
        : '/home/media/';
        this.tocDirectory = '';
        this.toc = [];
        this.tvNodeDir = '/storage/self/primary/show_box/';
        this.sftp = {};
        this.complete = false;
    }
    start(list, sftp){
        this.sftp = sftp;
        list.forEach((item, index) => {
            let fileDir = this.tvNodeDir + item.filename;
            this.sftp.readdir(fileDir, (err, data) => {
                if (err) throw err;
                if (data.length === 0) return;
                var newMedia = new Media(data[0], "Movies");
                newMedia.parentDir = item.filename;
                this.main(newMedia);
                if(index === list.length -1) this.complete = true;
            });
        });
    }
    fetchShowBoxDownloads(sftp){
        sftp.readdir(this.tvNodeDir, function(err, list) {
            if (err) throw err;
            console.dir(list);
            
        });
    }
    
    loadTOC(){
        this.tocDirectory = this.homeDirectory +'Toc.json';
        try {
            var read = FS.readFileSync(this.tocDirectory);
            let toc = JSON.parse(read);
            return this.toc = toc || this.toc;
            
        } catch (err){
            console.log(`error: ${err}`);
        }
    }
    main(newMedia) {
        let exists = this.checkForExistance(newMedia);
        
        (!exists) ? this.addToLibrary(newMedia) : console.log(`exists! ${newMedia.fileName}`);
        
    }
    checkForExistance(newMedia){

        return this.toc.find((item) => item.originalFileName === newMedia.originalFileName)
    
    }
    addToLibrary(newMedia){
        // console.log(metaData);
        this.toc.push(newMedia);
        FS.writeFileSync(this.tocDirectory, JSON.stringify(this.toc));
        let remoteFilePath = this.tvNodeDir + newMedia.parentDir + '/' + newMedia.fileName;
        let localFilePath = this.homeDirectory + newMedia.type + '/' + newMedia.fileName;
        this.sftp.fastGet(remoteFilePath, localFilePath, (err, data) => {
            if(err) throw err;
            console.log(data);
            
        })
        // sftp.readFile(tocDirectory, function(err, rawData) {
        //     if (err) throw err;
        //     var dataArray = JSON.parse(rawData);
        //     console.log(dataArray);
        //     dataArray.push(item)
        //     sftp.writeFile(tocDirectory, JSON.stringify(dataArray));
        // });
    }
    escapePathName(filePath){
        return filePath.replace(/([^\w-_.])/gi, "\\$1");
              
    }
    test() {
        var SSH = require('simple-ssh');
 
        var ssh = new SSH({
            host: '192.168.0.2',
            user: 'root',
            pass: 'password'
        });
        
        ssh.exec('echo $PATH', {
            out: function(stdout) {
                console.log(stdout);
            }
        }).start();
        
        /*** Using the `args` options instead ***/
        ssh.exec('echo', {
            args: ['$PATH'],
            out: function(stdout) {
                console.log(stdout);
            }
        }).start();
    }
    sample(){
        this.something();
    }
    something(){
        console.log("hello");
    }
    
} 
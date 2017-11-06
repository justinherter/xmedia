'use strict';
const Config = require('../config');
const ConnectionConfig = require('../models/connectionConfig');
const Media = require('../models/media').Media;
const Formatting = require('./formatting').Formatting;
const FileSystem = require('./fileSystem').FileSystem;
const FilePathObject = require('../models/filePathObject').FilePathObject;

module.exports.Crawler = class Crawler {
    constructor(sftp){
        console.log(FileSystem);
        this.homeDirectory = process.env.HOME_DIRECTORY;
        this.tocDirectory = __dirname + '/../lib/toc.json';
        this.toc = FileSystem.readJson(this.tocDirectory);
        this.showBoxDirectory = '/storage/self/primary/show_box/';
        this.sftp = sftp;
        this.complete = false;
        this.filePathObjectList = [];
        this.omitFileNamePattern = [
            '.', '..', 'Other', 'Subs'
        ]
    }
    
    fetchShowBoxDownloads(){
        this.sftp.readdir(this.showBoxDirectory, function(err, list) {
            if (err) throw err;
            console.dir(list);
            return list;
        });
    }
    
    catalog(newMedia) {
        let exists = this.checkForExistance(newMedia);
        
        (!exists) ? 
        () => {
            this.addToLibrary(newMedia);
            this.addPatterns(newMedia.fileName); 
        } : console.log(`${newMedia.fileName} already exists in the catalog.`);

        
    }
    checkForExistance(newMedia){
        return this.toc.find((item) => item.originalFileName === newMedia.originalFileName)
    }
    addToLibrary(newMedia){
        this.toc.push(newMedia);
        FileSystem.Save(this.tocDirectory, this.toc);
        let remoteFilePath = this.showBoxDirectory + newMedia.parentDir + '/' + newMedia.fileName;
        let localFilePath = this.homeDirectory + newMedia.type + '/' + newMedia.fileName;
        this.sftp.fastGet(remoteFilePath, localFilePath, (err, data) => {
            if(err) throw err;
            console.log(data);
        })
    }
    escapePathName(filePath){
        return filePath.replace(/([^\w-_.])/gi, "\\$1");
    }
    readDirectory(path){
        return new Promise((resolve, reject) => {
            this.sftp.readdir(path, function(err, list) {
                if (err) reject(err);

                resolve(list);
            });
        })
    }
    setTableOfContents(){
        return new Promise((resolve, reject) => {
            
        })
    }
    isDirectory(obj){
        let parts = obj.longname.split('    ');
        // console.log(parts);
        let depth = parts[1].split(' ')[0];
        // console.log(depth);
        // console.log(typeof parseInt(depth))
        let isdir = (parseInt(depth) !== 1);
        // console.log(isdir);
        return isdir;
    }
    traverseDirectoryTree(obj){
        return (this.isDirectory(obj)) 
        ? () => {
            let fetchList = this.readDirectory(this.showBoxDirectory)
            fetchList.then((list) => {
                list.forEach((object, index) => {

                })
            })
        }
        : obj;

    }
    fileObjectIndex(fileName){
        return this.filePathObjectList.findIndex(fpo => {
            return (fpo.subPath.indexOf(fileName) > -1 && fpo.fileName === fileName)
        });
    }
    fileObjectExists(fileName){
        return this.fileObjectIndex(fileName) > -1;
    }
    processDirectoryItem(item){
        return {
            exists: this.fileObjectExists(item.filename),
            index: this.fileObjectIndex(item.filename),
            isDirectory: this.isDirectory(item)
        }
    }
    dropItemFromList(obj){
        let index = this.filePathObjectList.findIndex((item) => {
            return (item.subPath === obj.subPath && item.fileName === obj.fileName)
        })
        this.filePathObjectList.splice(index, 1);
        //this.dropDirectory(obj);
    }
    dropDirectory(obj){
        return new Promise((resolve, reject) => {
            this.sftp.rmdir(obj.basePath + obj.subPath, function(err) {
                if (err) reject(err);
                
                resolve();
            });
        })
    }
    fetchAllFiles(filePathObject){  
        let watch = false;
        let {basePath, subPath, fileName} = filePathObject;
        
        let fileList = this.readDirectory(basePath + subPath);
        fileList.then((list) => {
            if (list.length === 0) {
                this.dropItemFromList(filePathObject);
                console.log(filePathObject);
                console.log(list);
            } else {
                list.forEach((item) => {
                    if (!this.omitFileNamePattern.includes(item.filename)){
                        let {exists, index, isDirectory} = this.processDirectoryItem(item);
                        let fpo = (exists)
                            ? this.filePathObjectList[index]
                            : new FilePathObject({
                                basePath: basePath,
                                subPath: subPath,
                                fileName: fileName
                            });
                        if(isDirectory) {
                            fpo.subPath += `${item.filename}/`;
                            this.fetchAllFiles(fpo)
                        } else {
                            fpo.fileName = item.filename;
                            fpo.shortName = Formatting.simplifyFileName(fpo.fileName);
                            this.filePathObjectList.push(fpo);
                        }
                    }
                });
            }
        }).catch((err)=> {
            this.logError(err);
        })
    }
    logError(err) {
        console.log(err);
    }
    // TODO While items in filePathObjectList 
    
    // TODO download objects with fileName to temp path
    start(){
        let newObj = {
            basePath: this.showBoxDirectory
        }
        this.fetchAllFiles(new FilePathObject(newObj));
                    
        setInterval(() => {
            console.log(this.filePathObjectList.length);
            console.log(this.filePathObjectList);
        }, 5000);
            
    }
} 
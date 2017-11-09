'use strict';
const Config = require('../config');
const ConnectionConfig = require('../models/connectionConfig');
const Media = require('../models/media').Media;
const Formatting = require('./formatting').Formatting;
const FileSystem = require('./fileSystem').FileSystem;
const FilePathObject = require('../models/filePathObject').FilePathObject;
const PatternPath = __dirname + '/../lib/patterns.json';

const Patterns = FileSystem.readJson(PatternPath);

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
        this.isWorking = false;
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
    isFileTypeExcluded(fileName) {
        let ext = fileName.split('.').pop().toLowerCase();
        return Patterns.fileExtensionExclusions.includes(ext);
    }
    fetchAllFiles(filePathObject){  
        let watch = false;
        let {basePath, subPath, fileName} = filePathObject;
        
        let fileList = this.readDirectory(basePath + subPath);
        fileList.then((list) => {
            if (list.length === 0) {
                this.dropItemFromList(filePathObject);
            } else {
                list.forEach((item) => {
                    if (!Patterns.directoryNameExclusions.includes(item.filename)){
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
                        } else if (typeof item.filename !== 'undefined' && !this.isFileTypeExcluded(item.filename)){
                            fpo.fileName = item.filename;
                            fpo.simpleFileName = Formatting.simplifyFileName(item.filename);
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
    remoteCopy(fpo) {
        let remote = `${fpo.basePath}${fpo.subPath}${fpo.fileName}`;
        let local = `${this.homeDirectory}/Temp/${fpo.simpleFileName}`;
        this.sftp.fastGet(remote, local, (err) => {
            if (err) throw err;
            console.log("done!");
            this.isWorking = false;
        })
    }
    copyIfNotExists(fpo){
        let localPath = `${this.homeDirectory}/Temp/${fpo.simpleFileName}`;
        let exists = FileSystem.exists(localPath);
        if(!exists) {
            this.isWorking = true;
            this.remoteCopy(fpo);
        } else {
            console.log('exists: ',fpo.fileName);
        }
            
    }
    start(){
        let newObj = {
            basePath: this.showBoxDirectory
        }
        this.fetchAllFiles(new FilePathObject(newObj));
                    
        let int = setInterval(() => {
            if(this.filePathObjectList.length > 0 && this.isWorking === false){
                let fpo = this.filePathObjectList.pop();
                console.log("processing item:", fpo);
                
                this.copyIfNotExists(fpo);
            } else {
                console.log('fpoList: ',this.filePathObjectList.length);
                console.log('is working: ',this.isWorking);
            }
            // console.log(this.filePathObjectList);
        }, 5000);
            
    }
} 
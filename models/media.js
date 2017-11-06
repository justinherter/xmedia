"use strict";
const FileSystem = require('../services/fileSystem').FileSystem;
const Moment = require('moment');
const homeDirectory = process.env.HOME_DIRECTORY;
const tocPath = __dirname + '/../lib/toc.json';
const TOC = FileSystem.readJson(tocPath);
const UUID = require('uuid4');

module.exports.Media = class Media {
    constructor(metaData, type) {
        this.dateArchived = metaData.dateArchived || '';
        this.dateCreated = metaData.dateCreated || new Moment();
        this.fileName = metaData.filename || '';
        this.fileSize = metaData.size || 0;
        this.id = new UUID()
        this.isActive = metaData.isActive || true;
        this.isArchived = metaData.isArchived || false;
        this.lastUpdated = metaData.lastUpdated || new Moment();
        this.originalFileName = metaData.originalFileName || metaData.filename || '';
        this.originalParentDir = metaData.originalParentDir || metaData.parentDir || '';
        this.replace = metaData.replace || false;
        this.subtype = metaData.subtype || '';
        this.type = type || metaData.type || 'unknown';
        
    }
    archive(){
        this.isArchived = true;
        this.dateArchived = new Moment();
        this.save();
    }
    save(){
        this.lastUpdated = new Moment();
        let index = TOC.findIndex((object) => object.id === this.id);
        TOC[index] = this.selectProps();
        FileSystem.save(tocPath, TOC);
        return;
    }
    selectProps(){
        let props = {};
        Object.getOwnPropertyNames(this).forEach((key) => {
            props[key] = this[key];
        });
        return props;
    }
    addToLibrary(newMedia){
        TOC.push(newMedia);
        FileSystem.save(this.tocDirectory, TOC);
    }
    toggleActive(){
        this.isActive = !this.isActive;
        this.save();
    }
}
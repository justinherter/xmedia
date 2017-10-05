"use strict";
const FS = require('fs');
const Moment = require('moment');
const homeDirectory = process.env.HOME_DIRECTORY;
const tocPath = homeDirectory + 'Toc.json';
const TOC = JSON.parse(FS.readFileSync(tocPath));
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
        FS.writeFileSync(tocPath, JSON.stringify(TOC));
        return;
    }
    selectProps(){
        let props = {};
        Object.getOwnPropertyNames(this).forEach((key) => {
            props[key] = this[key];
        });
        return props;
    }
    toggleActive(){
        this.isActive = !this.isActive;
        this.save();
    }
}
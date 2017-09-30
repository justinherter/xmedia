"use strict";
const Moment = require('moment');

module.exports.Media = class Media {
    constructor(metaData, type) {
        this.isArchived = metaData.isArchived || false;
        this.dateArchived = metaData.dateArchived || '';
        this.dateCreated = metaData.dateCreated || new Moment();
        this.fileName = metaData.filename || '';
        this.fileSize = metaData.size || 0;
        this.isActive = metaData.isActive || true;
        this.originalFileName = metaData.originalFileName || metaData.filename || '';
        this.originalParentDir = metaData.originalParentDir || metaData.parentDir || '';
        this.replace = metaData.replace || false;
        this.subtype = metaData.subtype || '';
        this.type = type || metaData.type || 'unknown';
    }
    archive(){
        this.archived = true;
        this.dateArchived = new Moment();
    }
    save(){
        return;
    }
    selectProps(){
        let props = {};
        Object.getOwnPropertyNames(this).forEach((key) => {
            props[key] = this[key];
        });
        return props;
    }
}
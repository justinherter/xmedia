'use strict';
const Formatting = require('../services/formatting').Formatting;
module.exports.FilePathObject = class FilePathObject {
    constructor(obj){
        this.basePath = obj.basePath || "";
        this.subPath = obj.subPath || "";
        this.fileName = obj.fileName || "";
        this.simpleFileName = obj.simpleFileName || "";
        this.simpleNameOnly = obj.simpleNameOnly || "";
    }
    set simpleFileName(newName) {
        this.simpleFileName = newName;
        this.simpleNameOnly = Formatting.trimFileExtension(newName);
    }
}
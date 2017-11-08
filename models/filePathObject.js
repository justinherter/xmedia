'use strict';
module.exports.FilePathObject = class FilePathObject {
    constructor(obj){
        this.basePath = obj.basePath || "";
        this.subPath = obj.subPath || "";
        this.fileName = obj.fileName || "";
        this.simpleFileName = obj.fileName || "";
    }
}
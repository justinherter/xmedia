'use strict';

module.exports.Patterns = class Patterns {
    constructor(){
        this.directoryNameExclusions = [];
        this.fileNameExclusions = [];
        this.fileExtensions = [];
        this.fileExtensionExclusions = [];
        this.fileNameInclusions = [];
    }
}
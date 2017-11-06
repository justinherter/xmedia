'use strict';
const FileSystem = require('./fileSystem').FileSystem;
const Patterns = {};
const Catalog = require('./catalog').CatalogService;

module.exports.Formatting = class Formatting {

    static simplifyFileName(fileName){
        Catalog.catalogFileName(fileName);
        
        let parts = fileName.split('.');
        return this.processFileName(parts);
    }
    static processFileName(partsArray){
        let ext = partsArray.pop();
        let parts = this.proccessParts(partsArray);
        return `${parts.join(' ')}.${ext}`;
    }
    static processParts(parts){
        Patterns = FileSystem.readJson('../lib/patterns.json');
        return parts.map((item, index) => {
            let matchIndex = Patterns.fileNamePatterns.findIndex(ptrn => ptrn === item);
            return (index === -1) ? true : false;  
        })
    }
}
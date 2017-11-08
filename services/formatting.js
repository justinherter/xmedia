'use strict';
const FileSystem = require('./fileSystem').FileSystem;
const PatternPath = __dirname + '/../lib/patterns.json';
const Patterns = FileSystem.readJson(PatternPath);

const Catalog = require('./catalog').CatalogService;

module.exports.Formatting = class Formatting {

    static simplifyFileName(fileName){
        
        let parts = fileName.split('.').join(' ').split(' ');
        Catalog.catalogFileName(parts);
        return this.processFileName(parts);
    }
    
    static processParts(parts){
        return parts.filter((item, index) => {
            let exists = Patterns.fileNameExclusions.includes(item.toLowerCase());
            return (!exists && (item !== "" || item !== " "))
        }).map((i) => {
            return i.replace(/(^[0-9]{4})/g, '($1)');
        })
    }
    static processFileName(partsArray){
        let ext = partsArray.pop();
        let parts = this.processParts(partsArray);
        return `${parts.join(' ')}.${ext}`;
    }
}
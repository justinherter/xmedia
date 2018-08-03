'use strict';
const FileSystem = require('./fileSystem').FileSystem;
const PatternPath = __dirname + '/../lib/patterns.json';
const Patterns = FileSystem.readJson(PatternPath);
require('../lib/extensions').Extensions.All();

const Catalog = require('./catalog').CatalogService;

module.exports.Formatting = class Formatting {

    static simplifyFileName(fileName){
        
        let parts = fileName.split('.').join(' ').split(' ');
        Catalog.catalogFileName(parts.slice());
        return this.processFileName(parts);
    }
    static trimFileExtension(fileName){
        return fileName.split(".")[0];
    }
    static processParts(parts){
        return parts.filter(item => {
            let exists = Patterns.fileNameExclusions.includes(item.toLowerCase());
            return (!exists && !item.x_isNullOrEmpty())
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
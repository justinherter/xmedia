'use strict';
const FileSystem = require('./fileSystem').FileSystem;
const PatternPath = __dirname + '/../lib/patterns.json';

const Patterns = FileSystem.readJson(PatternPath);


module.exports.CatalogService = class CatalogService {
    static catalogFileName(partsArray){
        let ext = partsArray.pop();
        try {
            this.catalogNameParts(partsArray);
            this.catalogNameExtension(ext.toLowerCase());
        } catch (err) {
            console.log(err);
        }
        
    }
    static catalogNameParts(parts){
        parts.forEach((item, index) => {
            let lowerCaseItem = item.toLowerCase();
            let exists = Patterns.fileNameExclusions.includes(lowerCaseItem);
            let commonItem = Patterns.fileNameInclusions.includes(lowerCaseItem);
            if(!exists && !commonItem){
                Patterns.fileNameExclusions.push(lowerCaseItem);
                FileSystem.save(PatternPath, Patterns);
                console.log(`Added: ${lowerCaseItem}`);
            }
        })
    }
    static catalogNameExtension(ext) {
        if(!Patterns.fileExtensions.includes(ext)) {
            Patterns.fileExtensions.push(ext);
            FileSystem.save(PatternPath, Patterns); 
        }
    }
}
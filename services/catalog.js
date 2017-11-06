'use strict';
const FileSystem = require('./fileSystem').FileSystem;
const PatternPath = __dirname + '/../lib/patterns.json';

const Patterns = FileSystem.readJson(PatternPath);


module.exports.CatalogService = class CatalogService {
    static catalogFileName(fileName){
        let parts = fileName.split('.');
        let ext = parts.pop();
        if(parts.length === 1){
            parts = fileName.split(' ');
        }
        try {
            this.catalogNameParts(parts);
            this.catalogNameExtension(ext);
        } catch (err) {
            console.log(err);
        }
        
    }
    static catalogNameParts(parts){
        parts.forEach((item, index) => {
            let matchIndex = Patterns.fileNamePatterns.findIndex(ptrn => ptrn === item);
            if(index >= 2 && matchIndex === -1){
                Patterns.fileNamePatterns.push(item);
                FileSystem.save(PatternPath, Patterns);
                console.log(`Added: ${item}`);
            }
        })
    }
    static catalogNameExtension(ext) {
        if(Patterns.fileNameEtensions.findIndex((xt) => xt === ext) === -1) {
            Patterns.fileNameEtensions.push(ext);
            FileSystem.save(PatternPath, Patterns); 
        }
    }
}
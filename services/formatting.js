const FS = require('fs');
const FileSystem = require('./fileSystem');
const Patterns = require('../models/patterns');
const PatternPath = '../models/patterns.js';

module.exports.Formatting = class Formatting {

    simplifyFileName(fileName){
        let parts = fileName.split('.');
        return this.processFileName(parts);
    }
    processFileName(partsArray){
        let ext = partsArray[partsArray.length - 1];
        this.processExtension(ext);
        let parts = this.proccessParts(partsArray);
        return `${parts}.${ext}`;
    }
    processParts(partsArray){
        return parts.map((item, index) => {
            let matchIndex = Patterns.fileNamePatterns.findIndex(ptrn => ptrn === item);
            if(index >= 2 && matchIndex === -1){
                Patterns.fileNamePatterns.push(item);
                FileSystem.save(PatternPath, Patterns.fileNamePatterns);
                console.log(`Added: ${item}`);
            }
            return (index === -1) ? true : false;  
        })
    }
    processExtension(ext) {
        if(Patterns.fileNameEtensions.findIndex((xt) => xt === ext) === -1) {
            Patterns.fileNameEtensions.push(ext);
            FileSystem.save(PatternPath, Patterns.fileNameEtensions); 
        }
    }
}
"use strict";
const FS = require('fs');
const Moment = require('moment');
const HomeDirectory = process.env.HOME_DIRECTORY;
const TocPath = HomeDirectory + 'Toc.json';
const TOC = JSON.parse(FS.readFileSync(tocPath));
const Patterns = require('../models/patterns');
const UUID = require('uuid4');

module.exports.Tools = class Tools {
    captureFileNamePatterns(path){
        let fileName = `${HomeDirectory}Patterns.json`;
        let patterns = {};
        FS.exists(fileName, (exists)=>{
            patterns = (exists) 
            ? JSON.parse(FS.readFileSync(fileName))
            : () => {
                let p = new Patterns();
                FS.writeFileSync(fileName, JSON.stringify(p));
                return p;
            }
        })
    }
}
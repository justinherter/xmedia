'use strict';
const Service = require('../services/formatting').Formatting;
const Client = require('ssh2').Client;
const Connection = new Client();

require('dotenv').load();
const Expect = require("chai").expect;
const Media = require('../models/media').Media;
const FilePathObject = require('../models/filePathObject').FilePathObject;

const FileSystem = require('../services/fileSystem').FileSystem;
const PatternPath = __dirname + '/../lib/patterns.json';
const FPOPath = __dirname + '/samples/fileNames.json';
const Patterns = FileSystem.readJson(PatternPath);
const FPOs = FileSystem.readJson(FPOPath);

describe("Formatting Tests", () => {
    describe("FileName", () => {
        var newObject = new FilePathObject({
            basePath: '/storage/self/primary/show_box/',
            subPath: 'The Lion King 1 1.2 (2004) [1080p]/',
            //fileName: 'The.Lion.King.1.1.2.2004.1080p.BluRay.x264.YIFY.mp4'
            fileName: 'How.the.Grinch.Stole.Christmas.2000.1080p.BrRip.x264.BOKUTOX.YIFY.mp4'
            
            // fileName: 'My Little Pony The Movie (2017) x804 (1080p) DD5.1 - 2.0 x264 Phun Psyz.mp4',
        })
        var go = () => {
            if(FPOs.length > 0){
                //console.log("FPOs: ", FPOs);

                FPOs.forEach((item) => {
                    console.log("item fileName: ", item.fileName);
                    var simple = Service.simplifyFileName(item.fileName);
                    console.log(simple);
                })
            }
            
        }
        
        
        it("simplify file name", () => {
            go();
        })
        // it("reformat patterns", () => {
        //     Patterns.fileNamePatterns = Patterns.fileNamePatterns.map(i => i.toLowerCase());
        //     FileSystem.save(PatternPath, Patterns);
        // })
        var uniq = (a) => {
            var seen = {};
            return a.filter(function(item) {
                return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
        }
        
        // it("de-dupe patterns", () => {
        //     for (let prop in Patterns){
        //         Patterns[prop] = uniq(Patterns[prop]);
        //     }
        //     FileSystem.save(PatternPath, Patterns);
        // })
    })
})
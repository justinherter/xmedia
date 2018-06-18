'use strict';



require('dotenv').load();
const Expect = require("chai").expect;
const Media = require('../services/media').MediaService;
const BaseDirectory = process.env.HOME_DIRECTORY;




describe("Crawler Tests", () => {
    describe("Media", () => {
        var simpleFileNames = [
            "Angry Birds (2016).mp4",
            "Angry Birds (2015).mp4",
            "Elf (2003).mkv",
            "How the Grinch Stole Christmas (2000).mp4"
        ]
            
        
        var go = () => {
            simpleFileNames.forEach(item => {
                let exists = Media.mediaExistsOnServer(item, BaseDirectory);
                console.log(`${item}: ${exists}`);
                return exists;
            });
             
        }
        
        
        it("exists", () => {
            go();
        })
        
    })
})
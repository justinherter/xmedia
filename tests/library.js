"use strict";
require('dotenv').load();
const FS = require("fs");
const Expect = require("chai").expect;
const Media = require('../models/media').Media;
const HomeDirectory = process.env.HOME_DIRECTORY || "/home/media/";
const TocPath = `${HomeDirectory}Toc.json`

describe("Media Library Tests", () => {
    describe("Media Sync Test", () => {
        it("Should Sync TOC from Server", () => {
            
        })
    })
})
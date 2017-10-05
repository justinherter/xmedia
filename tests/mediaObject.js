"use strict";
require('dotenv').load();
const FS = require("fs");
const Expect = require("chai").expect;
const Media = require('../models/media').Media;
const HomeDirectory = process.env.HOME_DIRECTORY || "/home/media/";
const TocPath = `${HomeDirectory}Toc.json`

describe("Media Object Mutations", () => {
    var toc = JSON.parse(FS.readFileSync(TocPath));
    var media = new Media(toc[0]);
    describe("Select Props Only", () => {
        it("Selects only the props", () => {
            Expect(typeof media).to.equal("object");
            Expect(Object.keys(media).length).to.be.greaterThan(0);
        })
    })
    describe("Archive Media Object", () => {
        it("Archives the object", () => {
            media.archive()
            Expect(media.isArchived).to.equal(true);
            Expect(media.dateArchived).to.not.equal(true);
        })
    })

});
'use strict';
const Service = require('./services/formatting').Formatting;
const Config = require('./config').Config;
require('dotenv').load();
const LocalTempPath = '/data/temp';
const LocalStagedPath = '/data/staged';
const FileSystem = require('./services/fileSystem').FileSystem;

function run() {
    let files = FileSystem.readDirectory(LocalTempPath);
    if (files.length > 0) {
        console.log(files);
        files.forEach(file => {
            var simple = Service.simplifyFileName(item.fileName);
            console.log(simple);
        });
    }
}
run();

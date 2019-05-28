'use strict';
const Service = require('./services/formatting').Formatting;
const Config = require('./config').Config;
require('dotenv').load();
const LocalTempPath = '/data/temp';
const LocalStagedPath = '/data/staged';
const FileSystem = require('./services/fileSystem').FileSystem;

function run() {
    console.log('+++++++++++++++++++++++++++ : ',process.env['STAGE']);
    let files = FileSystem.readDirectory(LocalTempPath);
    if (files.length > 0) {
        console.log(files);
        files.forEach(file => {
            console.log(file);

            var simple = Service.simplifyFileName(file);
            console.log(simple);
            console.log(process.env['STAGE']);
            if(!process.env['STAGE']) FileSystem.rename(`${LocalTempPath}/${file}`, `${LocalStagedPath}/${simple}`);
        });
    }
}

run();

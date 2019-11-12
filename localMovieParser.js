'use strict';
const Formatting = require('./services/formatting').Formatting;
const Config = require('./config').Config;
require('dotenv').load();
const LocalTempPath = '/Volumes/Storage/Movies/MovieDownloads'; // '/data/temp';
const LocalStagedPath = '/Volumes/Storage/Movies/KidsMovies'; // '/data/staged';
const FileSystem = require('./services/fileSystem').FileSystem;
const FS = require('fs');
var Path = require('path');

function run(startPath, destinationPath, extension) {
    

        if (!FS.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }

        var files = FS.readdirSync(startPath);
        for (var i = 0; i < files.length; i++) {
            var filename = Path.join(startPath, files[i]);
            var stat = FS.lstatSync(filename);
            if (stat.isDirectory()) {
                run(filename, destinationPath, extension); //recurse
            }
            else if (filename.indexOf(extension) >= 0) {
                console.log(Formatting.simplifyFileName(Path.basename(filename)));
                let simpleName = Formatting.simplifyFileName(Path.basename(filename));
                let saveAs = `${destinationPath}/${simpleName}`;
                FileSystem.rename(filename, saveAs);
            };
        };




        
 
}
run(LocalTempPath, LocalStagedPath, '.mp4');

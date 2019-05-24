'use strict';
const FileSystem = require('./fileSystem').FileSystem;
require('../lib/extensions').Extensions.Arrays();
const LocalBaseDir = '/data';
module.exports.MediaService = class MediaService {
    static mediaExistsOnServer(simpleFileName, baseDir){
        let localPaths = [
            `${baseDir}/Temp/${simpleFileName}`,
            `${baseDir}/Movies/${simpleFileName}`,
            `${baseDir}/KidsMovies/${simpleFileName}`,
            `${LocalBaseDir}/staged/${simpleFileName}`,
            `${LocalBaseDir}/movies/kids/${simpleFileName}`,
            `${LocalBaseDir}/movies/adult/${simpleFileName}`,
        ];
        return localPaths.any(localPath => {
            return FileSystem.exists(localPath);
        });
    }
}
'use strict';
const FileSystem = require('./fileSystem').FileSystem;
require('../lib/extensions').Extensions.Arrays();

module.exports.MediaService = class MediaService {
    static mediaExistsOnServer(simpleFileName, baseDir){
        let localPaths = [
            `${baseDir}/Temp/${simpleFileName}`,
            `${baseDir}/Movies/${simpleFileName}`,
            `${baseDir}/KidsMovies/${simpleFileName}`,
        ];
        return localPaths.any(localPath => {
            return FileSystem.exists(localPath);
        });
    }
}
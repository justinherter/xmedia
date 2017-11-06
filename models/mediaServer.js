"use strict";

const FS = require('fs');
module.exports.MediaServer = class MediaServer {
    constructor(obj){
        this.localIpAddress = obj.localIpAddress || "";
        this.globalIpAddress = obj.globalIpAddress || "";
        this.rootDirectory = obj.rootDirectory || "/";
        this.userName = obj.userName || "media";
        this.libraries = obj.libraries || [];
        this.toc = obj.toc || [];
        this.tocDirectory = obj.tocDirectory || "";
    }
    loadTOC(path){
        this.tocDirectory = path;
        try {
            var read = FS.readFileSync(this.tocDirectory);
            let toc = JSON.parse(read);
            return this.toc = toc || this.toc;
            
        } catch (err){
            console.log(`error: ${err}`);
        }
    }
};
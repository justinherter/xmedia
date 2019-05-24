'use strict';
const FS = require('fs');

module.exports.FileSystem = class FileSystem {
    static exists(path){
        return FS.existsSync(path);
    }
    static createIfNotExists(path, data){
        let e = this.exists(path);
        if (!e) this.save(path, data);
    }
    static save(path, data) {
        return FS.writeFileSync(path, JSON.stringify(data));
    }
    static readJson(path){
        return JSON.parse(FS.readFileSync(path));
    }
    static read(path){
        return FS.readFileSync(path);
    }
    static exists(path) {
        return FS.existsSync(path);
    }
    static readDirectory(path) {
        return FS.readdirSync(path);
    }
    static rename(oldPath, newPath) {
        return FS.renameSync(oldPath, newPath);
    }
}
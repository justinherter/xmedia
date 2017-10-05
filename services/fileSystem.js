const FS = require('fs');

module.exports.FileSystem = class FileSystem {
    exists(path){
        return FS.existsSync(path);
    }
    createIfNotExists(path, data){
        let e = this.exists(path);
        if (!e) this.save(path, data);
    }
    save(path, data) {
        return FS.writeFileSync(path, JSON.stringify(data));
    }
    
}
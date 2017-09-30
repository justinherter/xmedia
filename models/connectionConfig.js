'use strict';
module.exports.ConnectionConfig = class ConnectionConfig {
    constructor(config){
        this.algorithms = config.algorithms || { serverHostKey: [ 'ssh-rsa', 'ssh-dss' ] }
        this.host = config.host || config.ip || '',
        this.port = config.port || 2222,
        this.username = config.username || 'root',
        this.password = config.password || 'password'
    }
}
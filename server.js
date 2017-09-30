"use strict";
const Service = require('./services/crawler').Crawler;
const Client = require('ssh2').Client;
const connection = new Client();

require('dotenv').load();

const Crawler = new Service();

function go(){
    Crawler.loadTOC();
    connection.on('ready', function() {
        console.log('Client :: ready');
        connection.sftp(function(err, sftp) {
            if (err) throw err;
            sftp.readdir(Crawler.tvNodeDir, function(err, list) {
                if (err) throw err;
                Crawler.start(list, sftp);
            });
            // Crawler.fetchShowBoxDownloads(sftp);
        });
    }).connect({
        algorithms: { serverHostKey: [ 'ssh-rsa', 'ssh-dss' ] },
        host: '192.168.0.2',
        port: 2222,
        username: 'root',
        password: 'password'
    });
}
go();
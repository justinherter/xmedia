"use strict";
const FS = require('fs');
const Moment = require('moment');
const HomeDirectory = process.env.HOME_DIRECTORY;
const Patterns = require('../models/patterns');
const UUID = require('uuid4');

module.exports = class {
    static captureFileNamePatterns(path) {
        let fileName = `${HomeDirectory}Patterns.json`;
        let patterns = {};
        FS.exists(fileName, (exists) => {
            patterns = (exists)
                ? JSON.parse(FS.readFileSync(fileName))
                : () => {
                    let p = new Patterns();
                    FS.writeFileSync(fileName, JSON.stringify(p));
                    return p;
                };
        });
    }
    static mergePatternFiles(args) {
        const source = args[1];
        const destination = args[2];
        let sourceObj = JSON.parse(FS.readFileSync(source));
        let destObj = JSON.parse(FS.readFileSync(destination));

        let sourceProps = Object.getOwnPropertyNames(sourceObj);

        for (let i = 0; i < sourceProps.length; i++) {
            let prop = sourceProps[i];
            if (!destObj[prop]) {
                destObj[prop] = sourceObj[prop];
                continue;
            }
            else {
                let values = sourceObj[prop];
                let newValues = [];
                values.forEach(val => {
                    if (!destObj[prop].includes(val)) newValues.push(val);
                });
                console.log(newValues);

                destObj[prop].concat(newValues);
            }
        }
        return FS.writeFileSync(destination, JSON.stringify(destObj));
    }
    static test(args) {
        return console.log(args);
    }
};

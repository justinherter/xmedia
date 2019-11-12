"use stric";

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Tools = require('./tools');

const args = process.argv.filter((arg, i) => i > 1);
clear();

console.log(
    chalk.yellow(
        figlet.textSync('Xmedia CLI', { horizontalLayout: 'full' })
    )
);


if (typeof Tools[args[0]] !== 'undefined') {
    return Tools[args[0]](args);
} 
else {
    console.log('undefined', args);
    process.exit();
}

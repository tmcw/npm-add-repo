#!/usr/bin/env node

var fs = require('fs'),
    exec = require('child_process').exec;

var p = {};
try {
    p = JSON.parse(fs.readFileSync('package.json'));
} catch(e) {
    throw new Error('package.json is not present or not valid json');
}

if (p.repository) throw new Error('package.json already includes a repo');

exec('git config --get remote.origin.url', function(err, stdout, stderr) {
    if (err) throw err;
    var repo = stdout.trim();
    if (!repo) throw new Error('repository could not be determined.');
    console.log('setting repo to %s', repo);
    p.repository = {
        type : "git",
        url : repo
    };
    fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
});

'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(options, callback) {
	var cmdLine, args;	
	args = [];
	
	cmdLine = path.resolve(__dirname, '..', 'bin', 'MsiWrapperBatch.exe');
	
	//cycle all other options and add it to args
	Object.keys(options).forEach(function(key) {
		var val = options[key];
		args.push(key + "=" + val);
	});

	var child = spawn(cmdLine, args);
	child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);
	var stderr = '';
	child.on('error', function(err) {
		if (callback) {
			callback(err);
		}
	});
	child.stderr.on('data', function(data) {
		stderr += data;
	});
	child.on('close', function(code) {
		if (code === 0) {
			if (callback) {
				callback(null);
			}
		} else {
			if (callback) {
				callback(stderr);
			}
		}
	});
};
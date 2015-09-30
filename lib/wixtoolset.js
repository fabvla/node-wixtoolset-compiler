'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var spawnargs = require('spawn-args');

module.exports = function(options, callback) {
	var cmdLine;
		
	if( process.argv[2] !== undefined ){
		cmdLine = path.resolve(__dirname, '..', 'bin', process.argv[2] + '.exe ');
		
		var args = [];
		if( options.args !== undefined ){
			args = spawnargs(options.args);
		}

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
	}
	else{
		console.log("Please use wixtoolset-compiler <command> --args=\"<command args>\"");
	}
};
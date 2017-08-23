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

		//check all variables, because if it's start with " I need to attach to previous index.
		//this happens when a variable has spaces and need to be wrapped into ".."
		for (var index = 0; index < args.length; ++index) {
			//start with "?
			if( args[index].substring(0, 1) == "\"" ){
				args[index-1] = args[index-1] + args[index];
				args.splice(index, 1);
			}
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
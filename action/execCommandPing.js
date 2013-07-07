var sys = require("sys"),
    pathFS = require("path"),
    fs = require("fs")
    url = require("url"),
    http = require("http"),
    forever = require("forever"),
    qs = require("querystring"),
    util   = require('util'),
    spawn  = require('child_process').spawn,
    exec  = require('child_process').exec,
    out = require('../3rdparty/stdout-2-json/stdout-2-json');
 
var timer = null; 
var strOut = '';

// Eventually we can use options (  spawn(arg1,[args]) )

function execCommand(appPath, argument) {
  var filePath = pathFS.join( appPath );
  var child = exec(filePath + ' ' + argument);

  var outBuffer = '';
 
child.stdout.on('data', function (data) {

  if (data.indexOf('connectionFailure') > -1) {
    console.log('DEU CONNECTION FAILUUUUUUUUUUURE!');
    out.send({'result':'expired'}); 
  }

  console.log('stdout : ' + data);
  strOut="<?xml version='1.0' ?><note>"+data+"</note>";

});

child.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

child.on('exit', function (code) {
  console.log('child process exited with code ' + code);
  out.send({'result':'ok'});
});

}

//timer = setTimeout(function () { out.send({'result':'expired'}) },15000); 
execCommand(process.argv[2], process.argv[3]);


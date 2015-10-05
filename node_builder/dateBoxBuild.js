var fs = require('fs'),
	m = require('module'),
	UglifyJS = require("uglify-js"),
	pretty = require('js-object-pretty-print').pretty;

var path = process.argv[2],
	framework = process.argv[3],
	modes = [];

if ( typeof process.argv[4] === "undefined" ) {
	modes = [
		"datebox",
		"flipbox"
	];
} else {
	for ( var i = 4; i < process.argv.length; i++ ) {
		modes.push( process.argv[i] );
	}
}

var files = [
	path + "baseObject.js",
	path + "lib/dateEnhance.js",
	path + "lib/dateFormatter.js",
	path + "lib/dateLimit.js",
	path + "lib/dateParser.js",
	path + "lib/eventHandler.js",
	path + "lib/offset.js",
	path + "lib/public.js",
	path + "lib/shortUtil.js",
	path + "framework/" + framework + ".js"
]

modes.forEach(function (mode) {
	files.push( path + "modes/" + mode + ".js");
});

var tempFile = "";
files.forEach(function (file) {
	tempFile = tempFile + fs.readFileSync(file, 'utf8');
});

tempFile = tempFile + "\n\nexports.JTSageDateBox = JTSageDateBox;\n\n";


var res = require('vm').runInThisContext(
		m.wrap( tempFile )
	)(
		exports,
		require,
		module,
		__filename,
		__dirname
);



var fileWriter = "" +
	"(function( $ ) { $.widget( \"jtsage.datebox\"," +
	pretty(module.exports.JTSageDateBox, 4, "PRINT", true) +
	" ); })( jQuery );";

if ( framework !== "jqm" ) {
	fileWriter = fileWriter +
		"\n\n(function( $ ) { " + 
		"$(document).ready( function() { " +
		"$( \"[data-role='datebox']\" ).each( function() { " +
		"$( this ).datebox(); " +
		" }); }); })( jQuery );\n"
}

var ast = UglifyJS.parse(fileWriter, { filename: "file1.js" });
var stream = UglifyJS.OutputStream({ beautify: true });
var code = ast.print(stream);

var preamble = [
	"/*",
	" * JTSage-DateBox-",
	" * For: ",
	" * Date: ",
	" * http://dev.jtsage.com/DateBox/",
	" * https://github.com/jtsage/jquery-mobile-datebox",
	" *",
	" * Copyright 2010, <%= txt.copyYear %> JTSage. and other contributors",
	" * Released under the MIT license.",
	" * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt",
	" *",
	" */" ].join("\n");

console.log(preamble + "\n\n" + stream.toString());


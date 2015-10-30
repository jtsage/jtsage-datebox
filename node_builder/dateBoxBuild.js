var fs = require('fs'),
	m = require('module'),
	UglifyJS = require("uglify-js"),
	pretty = require('js-object-pretty-print').pretty,
	execSync = require('exec-sync'),
	cssmin = require('cssmin'),
	admzip = require('adm-zip'),
	crypto = require('crypto');

var today = new Date(),
	path = process.argv[2],
	framework = process.argv[3],
	modes = [],
	cssFile = "sheet.php";

if ( process.argv[3] === "bootstrap" ) {
	cssFile = "sheet-bootstrap.php";
}

if ( typeof process.argv[4] === "undefined" ) {
	modes = [
		"datebox",
		"flipbox",
		"slidebox",
		"calbox"
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
	" * JTSage-DateBox",
	" * For: " + framework,
	" * Date: " + today.toJSON(),
	" * http://dev.jtsage.com/DateBox/",
	" * https://github.com/jtsage/jquery-mobile-datebox",
	" *",
	" * Copyright 2010, " + today.getFullYear() + " JTSage. and other contributors",
	" * Released under the MIT license.",
	" * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt",
	" *",
	" */" ].join("\n");

var finished_uncomp = preamble + "\n\n" + stream.toString();
var finished_comp = UglifyJS.minify(finished_uncomp, {fromString: true, outSourceMap: "jtsage-datebox.js.map"});
var finished_css_uncomp = execSync("/usr/bin/php " + path + "../css/" + cssFile);
var finished_css_comp = cssmin(finished_css_uncomp);

var zip = new admzip();
zip.addFile('jtsage-datebox/js/jtsage-datebox.js', new Buffer(finished_uncomp));
zip.addFile('jtsage-datebox/js/jtsage-datebox.min.js', new Buffer(finished_comp.code));
zip.addFile('jtsage-datebox/js/jtsage-datebox.js.map', new Buffer(finished_comp.map));
zip.addFile('jtsage-datebox/css/jtsage-datebox.css', new Buffer(finished_css_uncomp));
zip.addFile('jtsage-datebox/css/jtsage-datebox.min.css', new Buffer(finished_css_comp));

var zipData = zip.toBuffer();

var zipFile = "./output/jtsDateBox-" + crypto.randomBytes(Math.ceil(6)).toString('hex').slice(0,12) + ".zip"

zip.writeZip(zipFile);


//console.log(zipFile);
//console.log(preamble + "\n\n" + stream.toString());


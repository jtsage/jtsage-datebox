var m = require("module"),
	UglifyJS = require("uglify-js"),
	pretty = require("js-object-pretty-print").pretty;

module.exports = function(grunt) {
	"use strict";
	
	grunt.registerMultiTask("buildDBox", "Build DateBox", function() {
		var o = this.options(),
			buildFile = "";

		this.files.forEach( function( allFiles ) {
			allFiles.src.forEach( function( aFile ) {
				buildFile = buildFile + grunt.file.read( aFile );
			});
		});

		buildFile = buildFile + "\n\nmodule.exports.JTSageDateBox = JTSageDateBox;\n\n";

		require("vm").runInThisContext(
				m.wrap( buildFile )
			)( exports, require, module, __filename, __dirname
		);

		var writeFile = "" +
			"(function( $ ) { $.widget( \"jtsage.datebox\"," +
			pretty(module.exports.JTSageDateBox, 4, "PRINT", true) +
			" ); })( jQuery );";

		if ( o.includeBinding === true ) {
			writeFile = writeFile +
				"\n\n(function( $ ) { " + 
				"$(document).ready( function() { " +
				"$( \"[data-role='datebox']\" ).each( function() { " +
				"$( this ).datebox(); " +
				" }); }); })( jQuery );\n";
		}

		var ast = UglifyJS.parse(writeFile, { filename: "file1.js" });
		var stream = UglifyJS.OutputStream({ beautify: true });
		ast.print(stream);

		grunt.file.write(
			o.dest,
			grunt.config.get("txt.banner.long") + "\n\n" + stream.toString()
		);
	});
};



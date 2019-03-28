var m        = require("module"),
	UglifyJS = require("uglify-js"),
	pretty   = require("js-object-pretty-print").pretty,
	vm       = require("vm");

module.exports = function(grunt) {
	"use strict";
	
	grunt.registerMultiTask("buildDBoxes", "Build DateBoxes", function() {
		var frameName, inCode, outCode,
			o             = this.options(),
			baseObject    = "",
			baseObjectJS  = "",
			frameWorks    = "",
			externalLibJS = "",
			externalLibs  = "",
			dbLibsModesJS = "",
			buildFiles    = [];

		baseObject   = grunt.file.expand( this.data.baseObject );
		baseObjectJS = grunt.file.read( baseObject[0] );

		externalLibs = grunt.file.expand( this.data.externalLibs ) ;

		externalLibs.forEach ( function( thisFile ) {
			externalLibJS += grunt.file.read( thisFile );
		});

		this.files.forEach( function( theseFiles ) {
			theseFiles.src.forEach( function( thisFile ) {
				dbLibsModesJS += grunt.file.read( thisFile );
			});
		});

		frameWorks = grunt.file.expand( this.data.frameWorks );

		frameWorks.forEach( function( thisFramework ) {
			frameName = thisFramework.split( "/" ).pop().split( "." )[ 0 ];

			buildFiles.push( {
				name           : frameName,
				outputFileName : o.dest + o.filename + "." + frameName + ".js",
				inputJS        :
					baseObjectJS +
					grunt.file.read( thisFramework ) +
					dbLibsModesJS +
					"\n\nmodule.exports.JTSageDateBox = JTSageDateBox;\n\n"
			} );
		} );


		buildFiles.forEach( function( fileObj ) {
			vm.runInThisContext(
				m.wrap( fileObj.inputJS )
			)( exports, require, module, __filename, __dirname );

			inCode = "" +
				"(function( $ ) { $.widget( \"jtsage.datebox\"," +
				pretty( module.exports.JTSageDateBox, 4, "PRINT", true ) +
				" ); })( jQuery );";

			if ( o.includeBinding === true ) {
				inCode = inCode +
					"\n\n(function( $ ) { " +
					"$(document).ready( function() { " +
					"$( \"[data-role='datebox']\" ).each( function() { " +
					"$( this ).datebox(); " +
					" }); }); })( jQuery );\n";
			}

			outCode = UglifyJS.minify( inCode, {
				mangle   : false,
				compress : false,
				output   : {
					beautify : true
				}
			} );

			grunt.file.write( fileObj.outputFileName,
				grunt.config.get("txt.banner.long") +
				"\n\n" +
				externalLibJS +
				"\n\n" +
				outCode.code
			);

			grunt.log.ok( fileObj.outputFileName + " written." );
		} );
	});
};



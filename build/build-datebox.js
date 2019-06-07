/**
 * JTSage-DateBox
 * @fileOverview Build the datebox files
 * 
 * DO NOT RUN THIS FILE DIRECTLY! CALL FROM NPM!
 * 
 *  # npm run [ build-latest | build-release ]
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

const config    = require( "../package.json" ),
	fs          = require( "fs" ),
	m           = require( "module" ),
	UglifyJS    = require( "uglify-js" ),
	pretty      = require( "js-object-pretty-print" ).pretty,
	vm          = require( "vm" ),
	glob        = require( "glob" ),
	rimraf      = require( "rimraf" ),

	polyFill    = [ "jqm" ],
	dontBundle  = [ "jqm" ];

var frameName, inCode, outCodeFull, outCodeMin, outCodeObj,
	today = new Date(),
	externalLibsJS = "",
	polyFillLibsJS = "",
	dbModeLibsJS = "",
	buildFiles = [],
	buildMode = ( typeof process.argv[2] !== "undefined" ) ? process.argv[2] : "latest",

	outFolder = "dist/" + (( buildMode === "latest" ) ? "latest" : config.version) + "/",
	outFileNameBegin = "jtsage-datebox" + (( buildMode === "latest" ) ? "" : "-" + config.version ),

	baseObjectJS = fs.readFileSync("src/js/baseObject.js"),
	externalLibs = glob.sync("src/js/external/*.js"),
	polyFillLibs = glob.sync("src/js/polyfill/*.js"),
	frameWorks   = glob.sync("src/js/framework/*.js"),
	modes        = glob.sync("src/js/modes/*.js"),
	internalLibs = glob.sync("src/js/lib/*.js"),

	preamble = {
		long : function ( framework ) {
			return [
				"/*",
				" * JTSage-DateBox-" + config.version + " (" + framework + ")",
				" * For: " + JSON.stringify( config.supports ),
				" * Date: " + today.toISOString(),
				" * http://datebox.jtsage.dev/",
				" * https://github.com/jtsage/jtsage-datebox",
				" *",
				" * Copyright 2010, " + today.getFullYear() + " JTSage. and other contributors",
				" * Released under the MIT license.",
				" * https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt",
				" *",
				" */",
				"" ]
				.join( "\n");
		},
		short : function ( framework ) {
			return [
				"/* JTSage-DateBox-" + config.version + " (" + framework + ")",
				today.toISOString(),
				"(c) 2010," + today.getFullYear() + " JTSage",
				"https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt */\n" ]
				.join( " | " );
		},
		binding : "\n\n(function( $ ) { " +
			"$(document).ready( function() { " +
			"$( \"[data-role='datebox']\" ).each( function() { " +
			"$( this ).datebox(); " +
			" }); }); })( jQuery );\n"
	};

rimraf.sync( outFolder );
console.log( "Distribution folder cleaned...ok" );

fs.mkdirSync( outFolder , { recursive : true } );
console.log( "Distribution folder created...ok" );

for ( var i = 0, len = externalLibs.length; i < len; i++ ) {
	externalLibsJS += fs.readFileSync( externalLibs[i] );
}

for ( var j = 0, lan = polyFillLibs.length; j < lan; j++ ) {
	polyFillLibsJS += fs.readFileSync( polyFillLibs[j] );
}

externalLibsJS = UglifyJS.minify( externalLibsJS, {
	mangle   : false,
	compress : false,
	output   : {
		code     : true,
		beautify : true
	}
} );

polyFillLibsJS = UglifyJS.minify( polyFillLibsJS, {
	mangle   : false,
	compress : false,
	output   : {
		code     : true,
		beautify : true
	}
} );

for ( i = 0, len = internalLibs.length; i < len; i++ ) {
	dbModeLibsJS += fs.readFileSync( internalLibs[i] );
}

for ( i = 0, len = modes.length; i < len; i++ ) {
	dbModeLibsJS += fs.readFileSync( modes[i] );
}

frameWorks.forEach( function( thisFramework ) {
	frameName = thisFramework.split( "/" ).pop().split( "." )[ 0 ];

	buildFiles.push( {
		name           : frameName,
		outName        : outFileNameBegin + "." + frameName,
		outputFileName : outFolder + outFileNameBegin + "." + frameName + ".js",
		outputMinName  : outFolder + outFileNameBegin + "." + frameName + ".min.js",
		outputMapName  : outFolder + outFileNameBegin + "." + frameName + ".min.js.map",
		inputJS        :
			baseObjectJS +
			fs.readFileSync( thisFramework ) +
			dbModeLibsJS +
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
		" ); })( jQuery );" + preamble.binding;

	outCodeObj = UglifyJS.minify( inCode, {
		mangle   : false,
		compress : false,
		output   : {
			beautify : true
		}
	} );

	outCodeFull = "" +
		preamble.long( fileObj.name ) +
		"\n\n" +
		( ( dontBundle.includes( fileObj.name ) ) ? "" : externalLibsJS.code ) +
		( ( polyFill.includes( fileObj.name ) ) ? polyFillLibsJS.code : "" ) +
		"\n\n" +
		outCodeObj.code;

	fs.writeFileSync( fileObj.outputFileName, outCodeFull );

	console.log( fileObj.outputFileName + " written...ok" );

	outCodeMin = UglifyJS.minify( outCodeFull, {
		mangle   : true,
		compress : true,
		output   : {
			beautify : false,
			preamble : preamble.short( fileObj.name )
		},
		sourceMap : {
			filename : fileObj.outName + ".js",
			url      : fileObj.outName + ".min.js.map",
		}
	} );

	
	fs.writeFileSync( fileObj.outputMinName,  outCodeMin.code );
	fs.writeFileSync( fileObj.outputMapName,  outCodeMin.map );

	console.log( fileObj.outputMinName + " written...ok" );
} );

console.log( "done." );





/**
 * JTSage-DateBox
 * @fileOverview Prepare the builder server
 * 
 * DO NOT RUN THIS FILE DIRECTLY! CALL FROM NPM!
 * 
 *  # npm run [ build-builder ]
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

const fs          = require( "fs" ),
	glob          = require( "glob" ),
	rimraf        = require( "rimraf" ),
	path          = require( "path" );

var distFolder  = "node_builder/build_src",
	libFiles   = glob.sync( "src/js/lib/*.js" ),
	modeFiles  = glob.sync( "src/js/modes/*.js" ),
	frameFiles = glob.sync( "src/js/framework/*.js" ),
	baseObject = "src/js/baseObject.js",
	widgetLib  = "src/js/external/widgetLib.js";

rimraf.sync( distFolder );
console.log( "Builder source files cleaned...ok" );

fs.mkdirSync( distFolder );
fs.mkdirSync( distFolder + "/mode" );
fs.mkdirSync( distFolder + "/lib" );
fs.mkdirSync( distFolder + "/bundle" );
fs.mkdirSync( distFolder + "/frame" );

console.log( "Builder source tree created...ok" );

fs.copyFileSync( baseObject, distFolder + "/" + path.basename( baseObject ) );
fs.copyFileSync( widgetLib, distFolder + "/bundle/" + path.basename( widgetLib ) );

libFiles.forEach( function ( thisFile ) {
	fs.copyFileSync( thisFile, distFolder + "/lib/" + path.basename( thisFile ) );
} );

modeFiles.forEach( function ( thisFile ) {
	fs.copyFileSync( thisFile, distFolder + "/mode/" + path.basename( thisFile ) );
} );

frameFiles.forEach( function ( thisFile ) {
	fs.copyFileSync( thisFile, distFolder + "/frame/" + path.basename( thisFile ) );
} );

console.log( "Builder source files populated...ok" );
console.log( "done." );

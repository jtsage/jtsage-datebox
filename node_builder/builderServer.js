/**
 * JTSage-DateBox
 * @fileOverview Builder Server
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

const config     = require( "../package.json"),
	http         = require( "http" ),
	querystring  = require( "querystring" ),
	Archiver     = require( "archiver" ),
	fs           = require( "fs" ),
	glob         = require( "glob" ),
	path         = require( "path" ),
	m            = require( "module" ),
	vm           = require( "vm" ),
	UglifyJS     = require( "uglify-js" ),
	pretty       = require( "js-object-pretty-print" ).pretty,
	form         = require( "./builderForm.js" ),
	PORT         = 8023,
	runasUID     = "www-data",
	runasGID     = "www-data";

var libFilesJS       = "",
	modeFilesJS      = {},
	frameFilesJS     = {},
	srcPath          = "build_src/",
	libFiles         = glob.sync( srcPath + "lib/*.js" ),
	modeFiles        = glob.sync( srcPath + "mode/*.js" ),
	frameFiles       = glob.sync( srcPath + "frame/*.js" ),
	bundleFilesJS    = UglifyJS.minify(
		fs.readFileSync( srcPath + "bundle/widgetLib.js", "utf8" ),
		{
			mangle   : false,
			compress : false,
			output   : {
				code     : true,
				beautify : true
			}
		}
	),
	baseFilesJS      = fs.readFileSync( srcPath + "baseObject.js", "utf8" ),
	dontBundle       = [ "jqm" ];

libFiles.forEach( function( thisFile ) {
	libFilesJS += fs.readFileSync( thisFile, "utf8" );
});

modeFiles.forEach( function( thisFile ) {
	modeFilesJS[ path.basename( thisFile ).replace( ".js", "" ) ] =
		fs.readFileSync( thisFile, "utf8" );
});

frameFiles.forEach( function( thisFile ) {
	frameFilesJS[ path.basename( thisFile ).replace( ".js" , "" ) ] =
		fs.readFileSync( thisFile, "utf8" );
});


//We need a function which handles requests and send response
function handleRequest(request, response){
	if ( request.method !== "POST" ) {
		response.writeHead( 200, { "Content-Type" : "text/html" } );
		response.end(
			form.header( config.version ) +
			form.framePick( config, frameFilesJS ) +
			form.modePick( config, modeFilesJS ) +
			form.downloadButton +
			form.footer( config.version )
		);
	} else {
		var chunk = "";

		request.on( "data", function ( data ) {
			chunk += data;
		});

		request.on( "end", function () {
			console.log( "Build Processing..." );

			var outCodeObj,
				inputQ    = querystring.parse( chunk ),
				today     = new Date(),
				zip       = Archiver( "zip" ),
				buildFile = "",
				fullFile  = "",
				minFile   = "",
				preamble  = {
					long : function (framework, modes) {
						return [
							"/*",
							" * JTSage-DateBox-" + config.version + " (" + framework + ")",
							" * Date: " + today.toISOString(),
							" * Modes: " + modes.join( ", " ),
							" * http://datebox.jtsage.dev/",
							" * https://github.com/jtsage/jtsage-datebox",
							" *",
							" * Copyright 2010, " + today.getFullYear() +
								" JTSage and other contributors",
							" * Released under the MIT license.",
							" * https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt",
							" *",
							" */",
							""
						].join( "\n");
					},

					short : function( framework, modes ) {
						return [
							"/* JTSage-DateBox-" + config.version + " (" + framework + ")",
							"Modes:" + modes.join( "," ),
							today.toISOString(),
							"(c)2010," + today.getFullYear() + " JTSage",
							"https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt */\n"
						].join( " | " );
					},

					binding : "\n\n(function( $ ) { " +
						"$(document).ready( function() { " +
						"$( \"[data-role='datebox']\" ).each( function() { " +
						"$( this ).datebox(); " +
						" }); }); })( jQuery );\n"
				};

			if ( typeof inputQ.framework === "undefined" || inputQ.framework === "false" ) {
				response.writeHead( 404, "You must pick a framework" );
				response.end();
			} else if ( typeof inputQ.modes === "undefined" ) {
				response.writeHead( 404, "You must select at least one mode" );
				response.end();
			} else {
				buildFile += baseFilesJS + libFilesJS + frameFilesJS[ inputQ.framework ];

				if ( ! Array.isArray( inputQ.modes ) ) {
					inputQ.modes = [ inputQ.modes ];
				}

				for ( var i = 0; i < inputQ.modes.length; i++ ) {
					buildFile += modeFilesJS[ inputQ.modes[i] ];
				}

				buildFile += "\n\nexports.JTSageDateBox = JTSageDateBox;\n\n";

				vm.runInThisContext(
					m.wrap( buildFile )
				)( exports, require, module, __filename, __dirname );

				var inCode = "" +
					"(function( $ ) { $.widget( \"jtsage.datebox\"," +
					pretty( module.exports.JTSageDateBox, 4, "PRINT", true ) +
					" ); })( jQuery );" + preamble.binding;

				outCodeObj = UglifyJS.minify( inCode, {
					parse    : {},
					mangle   : false,
					compress : false,
					output   : {
						ast      : true,
						code     : true,
						beautify : true
					}
				} );

				fullFile = "" +
					preamble.long( inputQ.framework, inputQ.modes ) +
					"\n\n" +
					( ( dontBundle.includes( inputQ.framework ) ) ? "" : bundleFilesJS.code ) +
					"\n\n" +
					outCodeObj.code;

				minFile = UglifyJS.minify( fullFile, {
					mangle   : true,
					compress : true,
					output   : {
						beautify : false,
						preamble : preamble.short( inputQ.framework, inputQ.modes )
					},
					sourceMap : {
						filename : "jtsage-datebox.js",
						url      : "jtsage-datebox.min.js.map",
					}
				} );

				response.writeHead( 200, {
					"Content-Type"        : "application/zip",
					"Content-disposition" : "attachment; filename=JTSage-DateBox-" +
						inputQ.framework + "." +  config.version + ".zip"
				} );

				zip.pipe( response );

				zip
					.append( fullFile,     { name : "DateBox/js/jtsage-datebox.js" } )
					.append( minFile.code, { name : "DateBox/js/jtsage-datebox.min.js" } )
					.append( minFile.map,  { name : "DateBox/js/jtsage-datebox.min.js.map" } )
					.finalize();

			}

		});
	}
}

if ( process.getuid && process.getuid() === 0 ) {
	// Attempt to set GID / UID
	try {
		process.setgid( runasGID );
		process.setuid( runasUID );
		console.log( "Dropped to set UID/GID" );
	} catch ( e ) {
		console.log( "DANGER: Possibly running as root!!" );
	}
} else {
	console.log( "Running as un-privledged user");
}


var server = http.createServer(handleRequest);

server.listen( PORT, "127.0.0.1", function() {
	console.log( "DateBox Build Server listening on: http://localhost:%s", PORT );
});




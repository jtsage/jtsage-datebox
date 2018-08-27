var http = require('http'),
	querystring = require('querystring'),
	Archiver = require('archiver'),
	fs = require('fs'),
	m = require('module'),
	UglifyJS = require("uglify-js"),
	pretty = require('js-object-pretty-print').pretty;

const PORT=8086;

var path = "src/4.4.1/",
	formFile = fs.readFileSync("form.html", 'utf8');


//We need a function which handles requests and send response
function handleRequest(request, response){
	if ( request.method !== "POST" ) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(formFile);
	} else {
		var chunk = '';
		request.on('data', function (data) {
			chunk += data;
		});
		request.on('end', function () {
			console.log("Build Processing...");

			var inputQ = querystring.parse(chunk),
				frame = "bootstrap",
				today = new Date(),
				baseFiles = [
					path + "js/baseObject.js",
					path + "js/lib/dateEnhance.js",
					path + "js/lib/dateFormatter.js",
					path + "js/lib/dateLimit.js",
					path + "js/lib/dateParser.js",
					path + "js/lib/eventHandler.js",
					path + "js/lib/offset.js",
					path + "js/lib/public.js",
					path + "js/lib/shortUtil.js"
				];
				

			switch ( inputQ.framework ) {
				case "jqm" :
					baseFiles.push( path + "js/framework/jqm.js" );
					frame = "jqm";
					break;
				case "jqueryui":
					baseFiles.push( path + "js/framework/jqueryui.js" );
					frame = "jqueryui";
					break;
				case "bootstrap4":
					baseFiles.push( path + "js/framework/bootstrap4.js" );
					frame = "bootstrap4";
					break;
				default:
					baseFiles.push( path + "js/framework/bootstrap.js" );
					break;
			}

			modeArray = [];

			if ( Array.isArray(inputQ.modes)) {
				modeArray = inputQ.modes;
			} else {
				modeArray[0] = inputQ.modes;
			}

			var preamble = [
				"/*",
				" * JTSage-DateBox",
				" * For: " + frame + "; With: " + modeArray.join(", "),
				" * Date: " + today.toJSON(),
				" * http://dev.jtsage.com/DateBox/",
				" * https://github.com/jtsage/jquery-mobile-datebox",
				" *",
				" * Copyright 2010, " + today.getFullYear() + " JTSage. and other contributors",
				" * Released under the MIT license.",
				" * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt",
				" *",
				" */" ].join("\n");

			modeArray.forEach( function (mode) {
				switch (mode) {
					case "datebox":
						baseFiles.push( path + "js/modes/datebox.js" ); break;
					case "flipbox":
						baseFiles.push( path + "js/modes/flipbox.js" ); break;
					case "calbox":
						baseFiles.push( path + "js/modes/calbox.js" ); break;
					case "slidebox":
						baseFiles.push( path + "js/modes/slidebox.js" ); break;
				}
			});

			var tempFile = "";
			baseFiles.forEach(function (file) {
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

			if ( frame !== "jqm" ) {
				fileWriter = fileWriter +
					"\n\n(function( $ ) { " + 
					"$(document).ready( function() { " +
					"$( \"[data-role='datebox']\" ).each( function() { " +
					"$( this ).datebox(); " +
					" }); }); })( jQuery );\n"
			}

			var rslt = UglifyJS.minify(fileWriter, {
				parse: {},
				compress: false,
				mangle: false,
				output: {
					ast: true,
					code: true,
					beautify: true
    			}
			});

			var finished_uncomp = preamble + "\n\n" + rslt.code;
			var finished_comp = UglifyJS.minify(finished_uncomp, {sourceMap: { filename: "jtsage-datebox.min.js", url: "jtsage-datebox.js.map"}});
			var finished_css_uncomp = fs.readFileSync( path + "css/" + frame + ".css" );
			var finished_css_comp = fs.readFileSync( path + "css/" + frame + ".min.css" )

			response.writeHead(200, {
				'Content-Type': 'application/zip',
				'Content-disposition': 'attachment; filename=JTSage-DateBox-'+frame+'.zip'
			});

			var zip = Archiver('zip');

			zip.pipe(response);

			// Create zip with some files.
    		zip
    			.append(finished_uncomp, { name: 'DateBox/js/jtsage-datebox.js' })
    			.append(finished_comp.code, { name: 'DateBox/js/jtsage-datebox.min.js' })
    			.append(finished_comp.map, { name: 'DateBox/js/jtsage-datebox.js.map' })
    			.append(finished_css_uncomp, { name: 'DateBox/css/jtsage-datebox.css' })
    			.append(finished_css_comp, { name: 'DateBox/css/jtsage-datebox.min.css' })
        		.finalize();
		});
	}
}

process.setgid('www-data');
process.setuid('www-data');

var server = http.createServer(handleRequest);

server.listen(PORT, '127.0.0.1', function(){
    console.log("DateBox Build Server listening on: http://localhost:%s", PORT);
});




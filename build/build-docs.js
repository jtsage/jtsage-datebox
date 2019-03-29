/**
 * JTSage-DateBox
 * @fileOverview Build the documentation
 * 
 * DO NOT RUN THIS FILE DIRECTLY! CALL FROM NPM!
 * 
 *  # npm run [ build-docs ]
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

const pkgconf     = require( "../package.json" ),
	fs            = require( "fs" ),
	glob          = require( "glob" ),
	rimraf        = require( "rimraf" ),
	yaml          = require( "js-yaml" ),
	showdown      = require( "showdown" ),
	mdConvert     = new showdown.Converter(),
	beautify_html = require( "js-beautify" ).html,
	docs          = require( "./lib-docs.js" ),
	path          = require( "path" );

var inFile = "",
	outFile = "",
	fileName = "",
	badgeMap      = {
		"Display-Form"    : "badge-dark",
		"Display-Control" : "badge-secondary",
		"Limits"          : "badge-warning",
		"Theme"           : "badge-info",
		"i18n"            : "badge-success",
		"Callback"        : "badge-danger",
		"Operation"       : "badge-primary"
	},
	apiGen = {
		getFunc : function( iface, type, cat ) {
			var filePart = "<div class=\"accordion mx-3\" id=\"apiDoc" + type + "\">";
			for ( var apiKey in iface[ type ] ) {
				var rec = iface[type][apiKey];

				rec.safeID = apiKey.replace(/[\W]/g, "_");
				rec.name   = apiKey;
				rec.cat    = cat;
				rec.type   = type;

				filePart += docs.makeFunc(rec);
			}
			return filePart + "</div>";
		},
		getAll : function( api, type ) {
			var filePart = "<div class=\"accordion mx-3\" id=\"apiDoc\">";
			for ( var apiKey in api[ type ] ) {
				var rec = api[type][apiKey];

				rec.safeID = apiKey.replace(/[\W]/g, "_");
				rec.name   = apiKey;
				rec.badge  = badgeMap[rec.cat];

				filePart += docs.makeCard(rec);
			}
			return filePart + "</div>";
		},
		getCat : function( api, type, cat ) {
			var filePart = "<div class=\"accordion mx-3\" id=\"apiDoc\">";
			for ( var apiKey in api[ type ] ) {
				var rec = api[type][apiKey];

				rec.safeID = apiKey.replace(/[\W]/g, "_");
				rec.name   = apiKey;
				rec.badge  = badgeMap[rec.cat];

				if ( rec.cat === cat ) {
					filePart += docs.makeCard(rec);
				}
			}
			return filePart + "</div>";
		}
	},
	docFolder  = "doc_builder/",
	distFolder = "doc_builder/dist",
	headerHTML = fs.readFileSync( docFolder + "/include/header.html", "utf8" ),
	footerHTML = fs.readFileSync( docFolder + "/include/footer.html", "utf8" ),

	buildFiles = glob.sync( docFolder + "pages/*.md" ),
	copyFiles  = glob.sync( docFolder + "samples/*.html" ),
	webRoot    = glob.sync( docFolder + "webroot/*" ),

	api        = yaml.safeLoad( fs.readFileSync( docFolder + "data/api.yml", "utf8" ) ),
	config     = yaml.safeLoad( fs.readFileSync( docFolder + "data/datebox.yml", "utf8" ) ),
	iface      = yaml.safeLoad( fs.readFileSync( docFolder + "data/interface.yml", "utf8" ) );

rimraf.sync( distFolder );
console.log( "Docs folder cleaned...ok" );

fs.mkdirSync( distFolder, { recursive : true } );
fs.mkdirSync( distFolder + "/samples", { recursive : true } );

copyFiles.forEach( function ( thisFile ) {
	fileName = distFolder + "/samples/" + path.basename(thisFile).replace(".html", "/");
	fs.mkdirSync( fileName, { recursive : true } );

	fileName += "index.html";

	inFile = fs.readFileSync( thisFile, "utf8" );

	outFile = beautify_html( inFile.replace(/{{cnf:version}}/g, pkgconf.version) );

	fs.writeFileSync(
		fileName,
		outFile
	);
} );
console.log( "Doc Samples processed and copied...ok" );

webRoot.forEach( function ( thisFile ) {
	fs.copyFileSync( thisFile, distFolder + "/" + path.basename(thisFile) );
});
console.log( "Doc Web Root processed and copied...ok" );

for ( var i = 0; i < buildFiles.length; i++ ) {
	var thisFile = buildFiles[i];

	fileName = path.basename( thisFile ).replace(".md", "");

	if ( fileName !== "index" ) {
		if ( fileName.match("-") ) {
			var parts = fileName.split("-");
			if ( ! fs.existsSync( distFolder + "/" + parts[0] ) ) {
				fs.mkdirSync( distFolder + "/" + parts[0] );
			}
			if ( ! fs.existsSync( distFolder + "/" + parts[0] + "/" + parts[1] ) ) {
				fs.mkdirSync( distFolder + "/" + parts[0] + "/" + parts[1] );
			}
			fileName = distFolder + "/" + parts[0] + "/" + parts[1] + "/index.html";
		} else {
			if ( ! fs.existsSync( distFolder + "/" + fileName ) ) {
				fs.mkdirSync( distFolder + "/" + fileName );
			}
			fileName = distFolder + "/" + fileName + "/index.html";
		}
	} else {
		fileName = distFolder + "/index.html";
	}
	
	inFile =
		headerHTML +
		mdConvert.makeHtml( fs.readFileSync( thisFile, "utf8" ) ) +
		footerHTML;
	
	outFile = beautify_html( inFile.replace(/{{(.+)}}/g, function( match, term ) {

		switch ( term.substr(0,4) ) {
			case "run:":
				switch ( term.substr(4) ) {
					case "apiGen.getAll":
						return apiGen.getAll( api, "opts" );
					case "apiGen.getCatTheme":
						return apiGen.getCat( api, "opts", "Theme" );
					case "apiGen.getCatLimits":
						return apiGen.getCat( api, "opts", "Limits" );
					case "apiGen.getCatCallbacks":
						return apiGen.getCat( api, "opts", "Callback" );
					case "funcGen.getFunc":
						return apiGen.getFunc( iface, "func", "Function" );
					case "funcGen.getListen":
						return apiGen.getFunc( iface, "listen", "Listener" );
					case "funcGen.getTrigger":
						return apiGen.getFunc( iface, "trigger", "Trigger" );
				}
				break;
			case "dmo:":
				return docs.makeDemo( api, term.substr(4) );
			case "cnf:":
				switch ( term.substr(4) ) {
					case "version" :
						return pkgconf.version;
					case "menu" :
						return docs.makeMenu( config, config.menu );
					case "demo" :
						return docs.makeMenu( config, config.demo );
					case "sample" :
						return docs.makeMenu( config, config.sample );
					case "supports" :
						return docs.makeSup( pkgconf );
					case "url" :
						return config.url;
				}
				break;

		}
		return match;
	}) );

	fs.writeFileSync(
		fileName,
		outFile
	);
}
console.log( "Doc Pages processed and copied...ok" );
console.log( "done." );

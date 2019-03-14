var startTime     = new Date(),
	yaml          = require( "js-yaml" ),
	showdown      = require( "showdown" ),
	mdConvert     = new showdown.Converter(),
	beautify_html = require( "js-beautify" ).html,
	endTime       = new Date(),

	badgeMap = {
		"Display-Form"    : "badge-dark",
		"Display-Control" : "badge-secondary",
		"Limits"          : "badge-warning",
		"Theme"           : "badge-info",
		"i18n"            : "badge-success",
		"Callback"        : "badge-danger",
		"Operation"       : "badge-primary"
	},

	makeDemo = function( api, mode ) {
		var filePart = "<div>";
		for ( var apiKey in api.opts ) {
			var rec = api.opts[apiKey];

			if ( rec.optdemo ) {
				for ( var modetest in rec.modes ) {
					if ( rec.modes[modetest] === mode ) {
						rec.name = apiKey;
						filePart += makeDemoIn(rec);
					}
				}
			}
		}
		return filePart + "</div>";
	},
	makeDemoIn = function( rec ) {
		var retHtml = "<div class=\"form-group row\"><div class=\"col-sm-3\">";

		retHtml += "<label><strong></em>" + rec.name + "</em></strong></label>";
		retHtml += "</div><div class=\"col-sm-9\">";

		if ( rec.type === "Boolean" ) {
			retHtml += "<select class=\"form-control demopick\" data-link=\"db\" data-opt=\"" + rec.name + "\">";
			retHtml += "<option " + ( !rec.default ? "selected=\"selected\"" : "" ) + " value=\"false\">False</option>";
			retHtml += "<option " + (  rec.default ? "selected=\"selected\"" : "" ) + " value=\"true\">True</option>";
			retHtml += "</select>";
		} else {
			retHtml += "<input class=\"form-control demopick\" data-link=\"db\" data-opt=\"" + 
				rec.name + "\" value=\"" + rec.default +
				"\" placeholder=\"" + rec.default + "\"/>";
		}
		retHtml += "<small class=\"form-text text-muted\">" + rec.short +
			(( rec.sample !== false ) ? "<br /><strong>Sample: </strong>" + rec.sample : "") +
			"</small></div></div>";

		return retHtml;
	},
	makeCard = function( rec ) {
		var theCard = "<div class=\"card border-dark\" id=\"" + rec.safeID + "\">";

		theCard += "<button class=\"btn card-header text-left py-4 d-flex align-items-center\" " +
			"id=\"heading" + rec.safeID + "\" data-toggle=\"collapse\" data-target=\"#collapse" + 
			rec.safeID + "\">";

		theCard += "<div class=\"w-25 h6 my-0\">" + rec.name + "</div>";
		theCard += "<div class=\"w-50 text-muted pl-3\">" +  rec.short + "</div>";
		theCard += "<div class=\"ml-auto h5 my-0 text-right\">" +
			"<span class=\"badge badge-pill " + rec.badge + "\">" +
			rec.cat + "</span></div>";
	
		theCard += "</button>";

		theCard += "<div id=\"collapse" + rec.safeID + "\" class=\"collapse\" data-parent=\"#apiDoc\">";
		theCard += "<div class=\"pb-2 pt-4 px-4\">";
		theCard += mdConvert.makeHtml(rec.long);
		theCard += "</div>";

		if ( rec.i18n !== undefined ) {
			theCard += "<div class=\"border-top pb-2 pt-4 px-4 text-info\">" +
				mdConvert.makeHtml(rec.i18n) + "</div>";
		}

		if ( rec.overrideName !== undefined ) {
			theCard += cardSnip( 
				"Override Name",
				rec.overrideName,
				"Option to be passed to override default value"
			);
		}

		theCard += cardSnip(
			"Default",
			( typeof rec.default === "boolean" ) ? ( rec.default ? "true" : "false" ) :	rec.default,
			"The default value of the option. Many options use \"false\" to disable them."
		);

		theCard += cardSnip(
			"Data Type Expected",
			rec.type,
			"The datatype the option is expecting"
		);

		theCard += cardSnip(
			"Option is Dynamic",
			((rec.dynamic) ? "<em class='text-success'>yes</em>" : "<em class='text-danger'>no</em>"),
			"The option can be toggled or reset after the control has loaded"
		);

		theCard += cardSnip(
			"Valid Mode(s)",
			rec.modes.join(", "),
			"Operation mode(s) this option applies to"
		);

		theCard += "</div></div>";

		return theCard;
	},
	makeFrame = function ( rec ) {
		var theCard = "<div class=\"card border-dark my-2\" id=\"" + rec.safeID + "\">";

		theCard += "<div class=\"card-header d-flex\">" + rec.name + 
			"<span class=\"d-inline-block ml-auto mr-0 text-muted\">" + rec.short +
			"</span></div>";

		theCard += "<div class=\"card-body\">" + mdConvert.makeHtml(rec.long) + "</div>";

		theCard += "<ul class=\"list-group list-group-flush\">";
		theCard += "<li class=\"list-group-item d-flex list-group-item-info\">" +
			"<strong>Prototype:</strong><em class=\"d-block-inline ml-auto mr-0\">" + 
			rec.definition + "</em></li>";

		if ( typeof rec.args === "object" && rec.args !== "" ) {
			theCard += "<li class=\"list-group-item list-group-item-dark\">Arguments</li>";
			for ( var i = 0; i < rec.args.length; i++ ) {
				for ( var argKey in rec.args[i] ) {
					theCard += "<li class=\"list-group-item d-flex\"><strong>" + argKey + 
						"</strong><em class=\"d-block-inline ml-auto mr-0\">" +
						rec.args[i][argKey] + "</em></li>";
				}
			}
		}
		theCard += "</ul>";

		theCard += "</div>";

		return theCard;
	},
	makeFunc = function( rec ) {
		var theCard = "<div class=\"card border-dark\">";

		theCard += "<button class=\"btn card-header text-left py-4 d-flex align-items-center\" " +
			"id=\"heading" + rec.safeID + "\" data-toggle=\"collapse\" data-target=\"#collapse" + 
			rec.safeID + "\">";

		theCard += "<div class=\"w-25 h6 my-0\">" + rec.name + "</div>";
		theCard += "<div class=\"w-50 text-muted pl-3\">" +  rec.short + "</div>";
		theCard += "<div class=\"ml-auto h5 my-0 text-right\">" +
			"<span class=\"badge badge-pill badge-danger\">" +
			rec.cat + "</span></div>";
	
		theCard += "</button>";

		theCard += "<div id=\"collapse" + rec.safeID + 
			"\" class=\"collapse\" data-parent=\"#apiDoc" +
			rec.type + "\">";
		theCard += "<div class=\"pb-2 pt-4 px-4\">";
		theCard += mdConvert.makeHtml(rec.long);
		theCard += "</div>";

		if ( rec.returns !== undefined ) {
			theCard += cardSnip( 
				"Return Type",
				rec.overrideName,
				"Datatype of value returned from function"
			);
		}

		theCard += "</div></div>";

		return theCard;
	},
	cardSnip = function( name, value, desc ) {
		return "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>" + name + ": </strong>" + value + "</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" + desc + "</small></small></div>" +
		"</div>";
	},
	makeMenu = function ( conf, menu ) {
		var menuHtml = "", url = "";

		for ( var i = 0; i < menu.length; i++ ) {
			url = ( typeof menu[i].exturl !== "undefined" ) ?
				menu[i].exturl :
				conf.url + menu[i].url;

			menuHtml += "<a href=\"" + url + "\" class=\"list-group-item list-group-item-action\">";
			menuHtml += menu[i].name;
			menuHtml += "</a>";
		}
		return menuHtml;
	},
	makeSup = function ( conf ) {
		var retHtml = "<ul>";

		for ( var i = 0; i < conf.supports.length; i++ ) {
			retHtml += "<li>" + conf.supports[i] + "</li>";
		}

		return retHtml + "</ul>";
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

				filePart += makeFunc(rec);
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

				filePart += makeCard(rec);
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
					filePart += makeCard(rec);
				}
			}
			return filePart + "</div>";
		},
		getFrame : function( api, type ) {
			var filePart = "";
			for ( var apiKey in api[ type ] ) {
				var rec = api[type][apiKey];

				rec.name   = apiKey;

				filePart += makeFrame(rec);
			}
			return filePart;
		}
	};


module.exports = function(grunt) {
	"use strict";
	
	grunt.registerMultiTask("buildSite", "Build Doumentation Site", function() {
		var o = this.options(),
			cnt = 0, execTime = 0,
			headerHTML = grunt.file.read(o.headerFile),
			footerHTML = grunt.file.read(o.footerFile),

			api    = yaml.safeLoad( grunt.file.read( o.apidocFile ) ),
			config = yaml.safeLoad( grunt.file.read( o.configFile ) ),
			iface  = yaml.safeLoad( grunt.file.read( o.interfFile ) ),
			frames = yaml.safeLoad( grunt.file.read( o.framesFile ) ),

			compFile = "",
			doneFile = "";

		//console.log(config);

		this.files.forEach( function( thisFile ) {
			compFile = 
				headerHTML +
				mdConvert.makeHtml( grunt.file.read( thisFile.src[0] ) ) +
				footerHTML;

			doneFile = beautify_html( compFile.replace(/{{(.+)}}/g, function( match, term ) {

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
							case "frameGen":
								return apiGen.getFrame( frames, "sfs" );
						}
						break;
					case "dmo:":
						return makeDemo( api, term.substr(4) );
					case "cnf:":
						switch ( term.substr(4) ) {
							case "version" :
								return config.version;
							case "menu" :
								return makeMenu( config, config.menu );
							case "demo" :
								return makeMenu( config, config.demo );
							case "supports" :
								return makeSup( config );
							case "url" :
								return config.url;
						}
						break;

				}
				return match;
			}) );

			grunt.file.write( thisFile.dest, doneFile );

			grunt.log.writeln( 
				"Converting " + 
				(thisFile.src[0]).cyan + 
				" -> " + 
				(thisFile.dest).cyan + 
				"..." + "OK".green
			);

			cnt++;
		});

		endTime = new Date();
		execTime = ( endTime.getTime() - startTime.getTime() ) / 1000;

		grunt.log.writeln( cnt + " File(s) processed in " + execTime.toFixed(3) + "s" );
	});
};

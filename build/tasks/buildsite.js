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

	makeCard = function( rec ) {
		var theCard = "<div class=\"card border-dark\">";

		theCard += "<button class=\"btn card-header text-left py-4 d-flex align-items-center\" " +
			"id=\"heading" + rec.safeID + "\" data-toggle=\"collapse\" data-target=\"#collapse" + 
			rec.safeID + "\">";

		theCard += "<div class=\"w-25 h5 my-0\">" + rec.name + "</div>";
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
	cardSnip = function( name, value, desc ) {
		return "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>" + name + ": </strong>" + value + "</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" + desc + "</small></small></div>" +
		"</div>";
	},
	makeMenu = function ( conf ) {
		var menuHtml = "", url = "";

		for ( var i = 0; i < conf.menu.length; i++ ) {
			url = ( typeof conf.menu[i].exturl !== "undefined" ) ?
				conf.menu[i].exturl :
				conf.url + conf.menu[i].url;

			menuHtml += "<a href=\"" + url + "\" class=\"list-group-item list-group-item-action\">";
			menuHtml += conf.menu[i].name;
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
		getAll : function( api, type ) {
			var filePart = "<div class=\"accordion mx-3\" id=\"apiDoc\">";
			for ( var apiKey in api[ type ] ) {
				var rec = api.opts[apiKey];

				rec.safeID = apiKey.replace(/[\W]/g, "_");
				rec.name = apiKey;
				rec.badge = badgeMap[rec.cat];

				filePart += makeCard(rec);
			}
			return filePart + "</div>";
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
						}
						break;

					case "cnf:":
						switch ( term.substr(4) ) {
							case "version" :
								return config.version;
							case "menu" :
								return makeMenu( config );
							case "supports" :
								return makeSup( config );
						}
						break;

				}
				return match;
			}) );

			grunt.file.write( thisFile.dest, doneFile );

			grunt.log.writelns( 
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

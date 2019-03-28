/**
 * JTSage-DateBox
 * @fileOverview Documentation functions.
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

const showdown      = require( "showdown" ),
	mdConvert       = new showdown.Converter();

exports.makeDemo = function( api, mode ) {
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
};


function makeDemoIn( rec ) {
	var retHtml = "<div class=\"form-group row\"><div class=\"col-sm-3\">";

	retHtml += "<label><strong></em>" + rec.name + "</em></strong></label>";
	retHtml += "</div><div class=\"col-sm-9\">";

	if ( rec.type === "Boolean" ) {
		retHtml += "<select class=\"form-control demopick\" data-link=\"db\" data-opt=\"" +
			rec.name + "\">";
		retHtml += "<option " + ( !rec.default ? "selected=\"selected\"" : "" ) +
			" value=\"false\">False</option>";
		retHtml += "<option " + (  rec.default ? "selected=\"selected\"" : "" ) +
			" value=\"true\">True</option>";
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
}

exports.makeCard = function( rec ) {
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

	theCard += "<div id=\"collapse" + rec.safeID +
		"\" class=\"collapse\" data-parent=\"#apiDoc\">";
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
		((rec.dynamic) ?
			"<em class='text-success'>yes</em>" :
			"<em class='text-danger'>no</em>"
		),
		"The option can be toggled or reset after the control has loaded"
	);

	theCard += cardSnip(
		"Valid Mode(s)",
		rec.modes.join(", "),
		"Operation mode(s) this option applies to"
	);

	theCard += "</div></div>";

	return theCard;
};

exports.makeFunc = function( rec ) {
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
};

function cardSnip( name, value, desc ) {
	return "<div class=\"d-flex border-top\">" +
	"<div class=\"p-2 pl-4 flex-grow-1\"><strong>" + name + ": </strong>" + value + "</div>" +
	"<div class=\"p-2 pr-4 text-muted\"><small><small>" + desc + "</small></small></div>" +
	"</div>";
}

exports.makeMenu = function ( conf, menu ) {
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
};

exports.makeSup = function ( conf ) {
	var retHtml = "<ul>";

	for ( var i = 0; i < conf.supports.length; i++ ) {
		retHtml += "<li>" + conf.supports[i] + "</li>";
	}

	return retHtml + "</ul>";
};


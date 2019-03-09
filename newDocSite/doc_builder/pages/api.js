/*
  Generates api.html, list of all options.
*/
var outFile       = "../dist/api.html",
	inFile        = "api.md",
	yaml          = require( "js-yaml" ),
	fs            = require( "fs" ),
	showdown      = require( "showdown" ),
	mdConvert     = new showdown.Converter(),
	beautify_html = require( "js-beautify" ).html,

	headerHTML = fs.readFileSync( "../include/header.html", "utf8" ),
	footerHTML = fs.readFileSync( "../include/footer.html", "utf8" ),

	api = yaml.safeLoad(fs.readFileSync( "../data/api.yml", "utf8") ),

	compiledFile = headerHTML,
	finishedFile = "",

	badgeMap = {
		"Display-Form"    : "badge-dark",
		"Display-Control" : "badge-secondary",
		"Limits"          : "badge-warning",
		"Theme"           : "badge-info",
		"i18n"            : "badge-success",
		"Callback"        : "badge-danger",
		"Operation"       : "badge-primary"
	},

	first = true;

compiledFile += mdConvert.makeHtml( fs.readFileSync( inFile, "utf8" ) );

compiledFile += "<div class=\"accordion mx-3\" id=\"apiDoc\">";

for ( var apiKey in api.opts ) {
	var rec = api.opts[apiKey],
		theCard = "",
		safeID = apiKey.replace(/[\W]/g, "_"),
		saneDefault = ( typeof rec.default === "boolean" ) ?
			( rec.default ? "true" : "false" ) :
			rec.default;

	theCard += "<div class=\"card border-dark\">";

	theCard += "<div class=\"card-header d-flex " + 
		( !first ? "mt-1" : "" ) + "\" id=\"heading" + safeID +
		"\" data-toggle=\"collapse\" data-target=\"#collapse" + safeID + "\">";

	theCard += "<div class=\"w-25\"><h5 class=\"d-inline-block mb-0\">" + apiKey + "</h5></div>";
	theCard += "<div class=\"w-50\"><span class=\"ml-3 text-muted\">" +  rec.short + "</span></div>";
	theCard += "<div class=\"ml-auto\"><h5 class=\"d-inline-block float-right\">" +
		"<span class=\"badge badge-pill " + badgeMap[rec.cat] + "\">" +
		rec.cat + "</span></h5></div>";
	
	theCard += "</div>";

	theCard += "<div id=\"collapse" + safeID + "\" class=\"collapse\" data-parent=\"#apiDoc\">";
	theCard += "<div class=\"pb-2 pt-4 px-4\">";
	theCard += mdConvert.makeHtml(rec.long);
	theCard += "</div>";

	if ( rec.i18n !== undefined ) {
		theCard += "<div class=\"border-top pb-2 pt-4 px-4 text-info\">" +
			mdConvert.makeHtml(rec.i18n) + "</div>";
	}

	if ( rec.overrideName !== undefined ) {
		theCard += "<div class=\"d-flex border-top\">" +
			"<div class=\"p-2 pl-4 flex-grow-1\"><strong>Override Name: </strong>" + 
			rec.overrideName + "</div>" +
			"<div class=\"p-2 pr-4 text-muted\"><small><small>" + 
			"Option to be passed to override default value</small></small></div>" +
			"</div>";
	}

	theCard += "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>Default: </strong>" +
		saneDefault + "</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" +
		"The default value of the option. Many options use \"false\" to disable them.</small></small></div>" +
		"</div>";

	theCard += "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>Data Type Expected: </strong>" +
		rec.type + "</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" +
		"The datatype the option is expecting</small></small></div>" +
		"</div>";

	theCard += "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>Option is Dynamic: </strong>" +
		((rec.dynamic) ? "<em class='text-success'>yes</em>" : "<em class='text-danger'>no</em>") +
		"</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" +
		"The option can be toggled or reset after the control has loaded</small></small></div>" +
		"</div>";

	theCard += "<div class=\"d-flex border-top\">" +
		"<div class=\"p-2 pl-4 flex-grow-1\"><strong>Valid Mode(s): </strong>" +
		rec.modes.join(", ") + "</div>" +
		"<div class=\"p-2 pr-4 text-muted\"><small><small>" +
		"Operation mode(s) this option applies to</small></small></div>" +
		"</div>";

	theCard += "</div></div>";

	compiledFile += theCard;
	first = false;
}

compiledFile += "</div>";
compiledFile += footerHTML;

finishedFile = beautify_html(compiledFile);

fs.writeFile( outFile, finishedFile, function( err ) {

	if( err ) {
		console.log( "Failed: api.html" );
		return console.log(err);
	}

	console.log( "Complete: api.html" );
}); 



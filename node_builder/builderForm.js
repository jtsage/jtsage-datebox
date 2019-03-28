/**
 * JTSage-DateBox
 * @fileOverview Builder Server - Form page functions
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

/* eslint-disable max-len */

exports.header = function ( version ) {
	return [
		"<!doctype html>",
		"<html lang=\"en\">",
		"<head>",
		"<meta charset=\"utf-8\">",
		"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">",
		"<meta name=\"google\" content=\"notranslate\">",
		"<meta http-equiv=\"Content-Language\" content=\"en\"></meta>",
		"<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">",
		"<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" />",
		"<title>JTsage::DateBox:Documentation</title>",
		"</head>",
		"<body>",
		"<nav class=\"navbar navbar-light bg-light\">",
		"<a class=\"navbar-brand\" href=\"https://datebox.jtsage.dev/\">JTSage<span style=\"color:#C3593C\">DateBox</span></a>",
		"<span class=\"navbar-text\">Builder Tool</span>",
		"</nav>",
		"<div class=\"container\"><h1>DateBox <small>Builder Tool</small></h1><p>Currently building v." + version + "</p>",
		"<form method=\"POST\" action=\"./build\">"].join("\n");
};


exports.footer = function ( version ) {
	return [
		"</form>",
		"<div class=\"text-center text-muted\">JTSage DateBox Documentation v." + version + "</div>",
		"</div>",
		"<script src=\"https://code.jquery.com/jquery-3.3.1.min.js\"></script>",
		"<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>",
		"<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>",
		"</body>",
		"</html>",
	].join("\n");
};

exports.framePick = function( config, supportMap, prettyMap, frameFilesJS ) {
	var returnHTML = "<div class=\"form-group row py-3\"><label class=\"col-sm-2 col-form-label\" for=\"framework\">CSS Framework</label>";

	returnHTML += "<div class=\"col-sm-10\">";
	returnHTML += "<select class=\"form-control\" id=\"framework\" name=\"framework\">";
	returnHTML += "<option value=\"false\">-- Choose One --</option>";

	Object.keys( frameFilesJS ).forEach( thisKey => {
		returnHTML += "<option value=\"" +  thisKey + "\">";
		returnHTML += prettyMap[thisKey] + " v." + config.supports[ supportMap[ thisKey ] ];
		returnHTML += "</option>";
		
	});

	returnHTML += "</select></div></div>";

	return returnHTML;
};

exports.modePick = function( prettyMap, modeFilesJS ) {
	var returnHTML = "<div class=\"form-group row py-3\"><label class=\"col-sm-2 col-form-label\" for=\"mode\">Include Modes</label>";

	returnHTML += "<div class=\"col-sm-10\">";

	Object.keys( modeFilesJS ).forEach( thisKey => {
		returnHTML += "<div class=\"form-check\">";
		returnHTML += "<input class=\"form-check-input\" type=\"checkbox\" name=\"modes\" value=\"" + thisKey + "\" id=\"mode-" + thisKey + "\">";
		returnHTML += "<label class=\"form-check-label\" for=\"mode-" + thisKey + "\">";
		returnHTML += prettyMap[ thisKey ];
		returnHTML += "</label></div>";
	});

	returnHTML += "</div></div>";

	return returnHTML;
};

exports.downloadButton = [
	"<div class=\"form-group row py-3\">",
	"<label class=\"col-sm-2 col-form-label\" for=\"singlebutton\">Build and Download</label>",
	"<div class=\"col-sm-10\">",
	"<button id=\"singlebutton\" name=\"singlebutton\" class=\"btn btn-success w-100\">Go!</button>",
	"</div></div>" ].join( "\n" );

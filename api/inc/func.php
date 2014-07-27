<?php
// DateBox API Documentation

$VERSION_JQM = "1.4.3";
$VERSION_JQ = "2.1.1";
$ROOT = "/jQM-DateBox/";
$DPATH = $ROOT . "api/";
$JSPATH = $ROOT . "js/";
$CSSPATH = $ROOT . "css/";

function do_header($title, $back=NULL, $fwd=NULL, $mods="ALL") {
	$outtext  = mk_head($title, $mods);
	$outtext .= mk_top($title, $back, $fwd);
	return $outtext;
}

function do_footer() {
	return "</div>\n\n".'<div data-role="footer" data-position="fixed"><div data-role="controlgroup" data-mini="true" data-type="horizontal" class="ui-mini"><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/jQM-DateBox/doc/">Main Documentation</a><a data-role="button" data-mini="true" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a><a data-role="button" data-mini="true" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a><a data-role="button" data-mini="true" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a><a data-role="button" data-mini="true" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a></div></div>'."\n";
}

function mk_top($title, $back, $fwd) {
	$t  = "<body>\n<div data-role=\"page\" id=\"main\">\n";
	$t .= "\t<div data-role=\"header\" data-position=\"fixed\">\n";
	$t .= "\t\t<a href='index.php' data-icon='arrow-l' data-role='button'>Index</a>\n";
	$t .= "\t\t<h1>jQMDateBox - {$title}</h1>\n";
	$t .= "\t</div>\n";
	$t .= "<div data-role=\"content\">\n";
	return $t;
}

function mk_head($title, $mods) {
	GLOBAL $VERSION_JQ, $VERSION_JQM, $DPATH, $JSPATH, $CSSPATH;
	$t  = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n";
	$t .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n";
	$t .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\">\n";
	$t .= "<title>jQM::DateBox - {$title}</title>\n\n";
	$t .= '<link rel="stylesheet" href="http://code.jquery.com/mobile/' . $VERSION_JQM . '/jquery.mobile-'.$VERSION_JQM.'.min.css" />' . "\n";
	$t .= "<link rel=\"stylesheet\" href=\"{$CSSPATH}jqm-datebox.css\" />\n";
	$t .= "\n";
	$t .= "<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-{$VERSION_JQ}.js\"></script>\n";
	$t .= "<script src=\"http://code.jquery.com/mobile/{$VERSION_JQM}/jquery.mobile-{$VERSION_JQM}.min.js\"></script>\n";
	$t .= "<script type=\"text/javascript\" src=\"http://dev.jtsage.com/jquery.mousewheel.min.js\"></script>\n\n";
	$t .= "<script type=\"text/javascript\">\n";
	$t .= "\tjQuery.extend(jQuery.mobile, { ajaxEnabled: false });\n";
	$t .= "</script>\n";
	$t .= "<script type=\"text/javascript\" src=\"http://dev.jtsage.com/gpretty/prettify.js\"></script>\n";
	$t .= "<link href=\"http://dev.jtsage.com/gpretty/prettify.css\" rel=\"stylesheet\" />\n";
	$t .= "<script type=\"text/javascript\">\n\t$(document).on('pagecreate', function() {\n\t\t prettyPrint()\n\t });\n";
	$t .= "</script>\n";
	$t .= "</head>\n";
	return $t;
}
	

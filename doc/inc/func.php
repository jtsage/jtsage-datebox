<?php
$VERSION_JQM = "1.4.2";
$VERSION_JQ = "2.1.1";
$ROOT = "/jQM-DateBox/";
$DPATH = $ROOT . "doc/";
$JSPATH = $ROOT . "js/";
$CSSPATH = $ROOT . "css/";

function do_header($title, $back=NULL, $fwd=NULL, $mods="ALL") {
	$outtext  = mk_head($title, $mods);
	$outtext .= mk_top($title, $back, $fwd);
	return $outtext;
}

function do_footer() {
	return "</div>\n\n".'<div data-role="footer" data-position="fixed"><div data-role="controlgroup" data-mini="true" data-type="horizontal" class="ui-mini"><a data-role="button" data-mini="true" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a><a data-role="button" data-mini="true" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a><a data-role="button" data-mini="true" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a><a data-role="button" data-mini="true" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a></div></div>'."\n";
}

function mk_top($title, $back, $fwd) {
	$t  = "<body>\n<div data-role=\"page\" id=\"main\">\n";
	$t .= "\t<div data-role=\"header\" data-position=\"fixed\">\n";
	$t .= "\t\t<h1>jQMDateBox - {$title}</h1>\n";
	$t .= "\t</div>\n";
	$t .= "<div data-role=\"navbar\">\n\t<ul>\n";
	if ( is_null($back) ) {
		$text = "--"; $href = "#"; $ext = " class=\"ui-state-disabled\"";
	} else {
		$text = $back[1]; $href = $back[0]; $ext = "";
	}
	$t .= "\t\t<li><a href=\"{$href}\"{$ext} data-icon='arrow-l'>{$text}</a></li>\n";
	$t .= "\t\t<li><a href=\"0-contents.php\" data-icon='grid'>Contents</a></li>\n";
	if ( is_null($fwd) ) {
		$text = "--"; $href = "#"; $ext = " class=\"ui-state-disabled\"";
	} else {
		$text = $fwd[1]; $href = $fwd[0]; $ext = "";
	}
	$t .= "\t\t<li><a href=\"{$href}\"{$ext} data-icon='arrow-r'>{$text}</a></li>\n";
    $t .= "\t</ul>\n</div>\n";
	$t .= "<div data-role=\"content\">\n";
	return $t;
}

function mk_head($title, $mods) {
	GLOBAL $VERSION_JQ, $VERSION_JQM, $DPATH, $JSPATH, $CSSPATH;
	$t  = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n";
	$t .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n";
	$t .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\">\n";
	$t .= "<title>jQM::DateBox - {$title}</title>\n\n";
	$t .= "<link rel=\"stylesheet\" href=\"http://code.jquery.com/mobile/{$VERSION_JQM}/jquery.mobile-{$VERSION_JQM}.min.css\" />\n";
	$t .= "<link rel=\"stylesheet\" href=\"{$CSSPATH}jqm-datebox.css\" />\n";
	$t .= "\n";
	$t .= "<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-{$VERSION_JQ}.js\"></script>\n";
	$t .= "<script src=\"http://code.jquery.com/mobile/{$VERSION_JQM}/jquery.mobile-{$VERSION_JQM}.min.js\"></script>\n";
	$t .= "<script type=\"text/javascript\" src=\"http://dev.jtsage.com/jquery.mousewheel.min.js\"></script>\n\n";
	$t .= "<script type=\"text/javascript\" src=\"{$DPATH}inc/doc.js\"></script>\n";
	$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.core.js\"></script>\n";
	if ( $mods == "ALL" || $mods == "calbox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.calbox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "datebox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.datebox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "flipbox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.flipbox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "durationbox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.durationbox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "durationflipbox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.durationflipbox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "slidebox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.slidebox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "custombox" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.custombox.js\"></script>\n";
	}
	if ( $mods == "ALL" || $mods == "customflip" ) {
		$t .= "<script type=\"text/javascript\" src=\"{$JSPATH}jqm-datebox.mode.customflip.js\"></script>\n";
	}
	$t .= "<script type=\"text/javascript\" src=\"http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js\"></script>\n";
	if ( isset($_COOKIE['jqmdateboxlang']) ) {
		$t .= "<script type=\"text/javascript\" src=\"http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.{$_COOKIE['jqmdateboxlang']}.utf8.js\"></script>\n";
	}
	$t .= "<script type=\"text/javascript\">\n\tjQuery.extend(jQuery.mobile.datebox.prototype.options, {\n";
	$t .= "\t\t'useNewStyle': true,\n\t\t'useInline':true\n";
	$t .= "\t});\n";
	$t .= "\t$(document).bind(\"mobileinit\", function(){\n\t\t$.mobile.ajaxEnabled = false;\n\t});\n";
	$t .= "</script>\n</head>\n";
	return $t;
}
	

<?php
$VERSION_JQM = "1.4.3";
$VERSION_JQ = "2.1.1";
$ROOT = "/jQM-DateBox/";
$DPATH = $ROOT . "doc/";
$JSPATH = $ROOT . "js/";
$CSSPATH = $ROOT . "css/";


$TOC = array(
	array('index.php',			"1. Introduction"),
	array('1-1-features.php',	"1.1. Features"),
	array('2-installing.php',	"2. Installation"),
	array('3-first-datebox.php',"3. Your First Datebox"),
	array('3-1-themes.php',		"3.1. Themeing Datebox"),
	array('3-2-locale.php',		"3.2. Localizing Datebox"),
	array('3-3-output.php',		"3.3. Output Formats"),
	array('3-4-display.php', 	"3.4. Display Modes"),
	array('3-5-advdisplay.php', "3.5. Display Modifiers"),
	array('3-6-open.php',		"3.6. Open Methods"),
	array('4-limits.php',		"4. Data Limiting"),
	array('4-1-defaults.php',	"4.1. Default / Start Dates"),
	array('4-2-limit.php',		"4.2. Excluding Dates"),
	array('4-3-include.php',	"4.3. Including Dates"),
	array('5-control.php',		"5. UI Controls"),
	array('6-prog.php',			"6. Extending Datebox"),
	array('6-1-callback.php',	"6.1. Callbacks / Listeners"),
	array('6-2-link.php',		"6.2. Linking Dateboxes"),
	array('6-3-func.php',		"6.3. Common Functions"),
	array('6-4-trigger.php',	"6.4. Triggers"),
	array('6-5-globals.php',	"6.5. Global Data"),
	array('7-demos.php',		"7. Advanced Demos"),
	array('8-pack.php',			"8. 3rd-Party Integration")
);

$LANGS = array(
	array("en", "English US"),
	array("af", "Afrikaans"),
	array("ar", "Arabic"),
	array("bg", "Bulgarian"),
	array("ca", "Catalan"),
	array("cs", "Czech"),
	array("da", "Danish"),
	array("de", "German"),
	array("el", "Greek Modern"),
	array("es-ES", "Spanish"),
	array("fi", "Finnish"),
	array("fr", "French"),
	array("he", "Hebrew"),
	array("hr", "Croatian"),
	array("hu", "Hungarian"),
	array("id", "Indonesian"),
	array("it", "Italian"),
	array("ja", "Japanese"),
	array("ko", "Korean"),
	array("lt", "Lituanian"),
	array("nl", "Dutch"),
	array("nl-BE", "Dutch Belgium"),
	array("no", "Norwegian"),
	array("pl", "Polish"),
	array("pt-BR", "Portuguese"),
	array("pt-PT", "Portuguese"),
	array("ro", "Romainian"),
	array("ru", "Russian"),
	array("sl", "Slovenian"),
	array("sr", "Serbian"),
	array("sv-SE", "Swedish"),
	array("th", "Thai"),
	array("tr", "Turkish"),
	array("uk", "Ukrainian"),
	array("vi", "Vietnamese"),
	array("zh-CN", "Chinese - Simplified"),
	array("zh-TW", "Chinese - Traditional")
);

function api($idx,$key) {
	global $ROOT;
	echo "\"<a href='{$ROOT}api/index.php?idx={$idx}&amp;key={$key}'>{$key}</a>\"";
}

function do_all_lang() {
	global $LANGS;
	return "<script type=\"text/javascript\" src=\"http://cdn.jtsage.com/datebox/i18n/jqm-datebox.lang.utf8.js\"></script>\n";
}

function do_lang_pick() {
	global $LANGS;
	$t = "";
	foreach ( $LANGS as $thislang ) {
		$t .= "<option value=\"{$thislang[0]}\">{$thislang[1]}</option>";
	}
	return $t;
}

function do_header($title, $back=NULL, $fwd=NULL, $mods="ALL") {
	$outtext  = mk_head($title, $mods);
	$outtext .= mk_top($title, $back, $fwd);
	return $outtext;
}

function do_footer() {
	return "</div>\n\n".'<div data-role="footer" data-position="fixed"><div data-role="controlgroup" data-mini="true" data-type="horizontal" class="ui-mini"><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/jQM-DateBox/api/">API Documentation</a><a data-role="button" data-mini="true" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a><a data-role="button" data-mini="true" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a><a data-role="button" data-mini="true" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a><a data-role="button" data-mini="true" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a></div></div></div>'."\n";
}

function mk_toc() {
	GLOBAL $TOC;
	$t  = "<div data-role=\"panel\" data-display=\"overlay\" id=\"toc\">\n";
	$t .= "\t<ul data-role='listview'>\n";
	$t .= "\t\t<li data-role=\"list-divider\">Contents</li>\n";
	foreach($TOC as $thistoc) {
		$t .= "\t\t<li><a href='{$thistoc[0]}'>{$thistoc[1]}</a></li>\n";
	}
	$t .= "\t</ul>\n</div>\n";
	return $t;
}

function mk_top($title, $back, $fwd) {
	$t  = "<body>\n<div data-role=\"page\" id=\"main\">\n";
	$t .= mk_toc();
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
	$t .= "\t\t<li><a href=\"#toc\" data-icon='grid'>Contents</a></li>\n";
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

function mk_head($title, $mods, $iline) {
	GLOBAL $VERSION_JQ, $VERSION_JQM, $DPATH, $JSPATH, $CSSPATH;
	$t  = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n";
	$t .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n";
	$t .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\">\n";
	$t .= "<title>jQM::DateBox - {$title}</title>\n\n";
	$t .= "<link rel=\"stylesheet\" href=\"css/demos.min.css\" />\n"; 
	$t .= '<link rel="stylesheet" href="css/jquery.mobile.icons.min.css" />' . "\n";
	$t .= '<link rel="stylesheet" href="http://code.jquery.com/mobile/' . $VERSION_JQM . '/jquery.mobile.structure-'.$VERSION_JQM.'.min.css" />' . "\n";
	$t .= "<link rel=\"stylesheet\" href=\"{$CSSPATH}jqm-datebox.css\" />\n";
	$t .= "\n";
	$t .= "<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-{$VERSION_JQ}.js\"></script>\n";
	$t .= "<script src=\"http://code.jquery.com/mobile/{$VERSION_JQM}/jquery.mobile-{$VERSION_JQM}.min.js\"></script>\n";
	$t .= "<script type=\"text/javascript\" src=\"http://dev.jtsage.com/jquery.mousewheel.min.js\"></script>\n\n";
	$t .= "<script type=\"text/javascript\" src=\"inc/doc.js\"></script>\n";
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
	$t .= "\t\t'useNewStyle': true,\n\t\t'useInline': true\n";
	$t .= "\t});\n";
	$t .= "\tjQuery.extend(jQuery.mobile, { ajaxEnabled: false });\n";
	$t .= "</script>\n";
	$t .= "<script type=\"text/javascript\" src=\"http://dev.jtsage.com/gpretty/prettify.js\"></script>\n";
	$t .= "<link href=\"http://dev.jtsage.com/gpretty/prettify.css\" rel=\"stylesheet\" />\n";
	$t .= "<script type=\"text/javascript\">\n\t$(document).on('pagecreate', function() {\n\t\t prettyPrint()\n\t });\n";
	$t .= "</script>\n";
	$t .= "</head>\n";
	return $t;
}
	

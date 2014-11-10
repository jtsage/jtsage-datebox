---
---
<?php

$versions = array(
	"1.4.5",
	"1.4.4",
	"1.4.3",
	"1.4.2",
	"1.4.1",
	"1.4.0",
	"dev",
);

$filemap = array(
	array( "calbox", "CalBox Calendar Mode" ),
	array( "datebox", "DateBox and TimeBox Modes" ),
	array( "flipbox", "FlipBox and TimeFlipBox Modes" ),
	array( "slidebox", "SlideBox Mode" ),
	array( "durationbox", "DurationBox Mode (included in DateBox since 1.4.4)" ),
	array( "durationflipbox", "DurationFlipBox Mode (included in FlipBox since 1.4.4)" ),
	array( "customflip", "CustomFlip Mode")
);

$langs = json_decode('[
	"en: English US", "af: Afrikaans", "ar: العربية", "bg: български език", "ca: Català",
	"cs: Čeština", "da: Dansk", "de: Deutsch", "el: ελληνικά", "es-ES: Español", "fi: Suomi",
	"fr: Français", "he: עברית", "hr: Hrvatski Jezik", "hu: Magyar", "id: Bahasa Indonesia",
	"it: Italiano", "ja: 日本語", "ko: 한국어", "lt: Lietuvių Kalba", "nl: Nederlands",
	"nl-BE: Nederlands, Belgium", "no: Norsk", "pl: Język Polski", "pt-BR: Português",
	"pt-PT: Português", "ro: Limba Română", "ru: русский язык", "sl: Slovenski Jezik",
	"sr: српски језик", "sv-SE: Svenska", "th: ไทย", "tr: Türkçe", "uk: українська мова",
	"vi: Tiếng Việt", "zh-CN: 中文 (Simplified)", "zh-TW: 中文 (Traditional)"]');
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>jQueryMobile - DateBox Builder</title>
	
	<link rel="stylesheet" href="http://code.jquery.com/mobile/{{ site.jqmver }}/jquery.mobile-{{ site.jqmver }}.min.css" />
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-{{ site.jqver }}.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/{{ site.jqmver }}/jquery.mobile-{{ site.jqmver }}.min.js"></script>
</head>
<body>
<div data-role="page">
	<div data-role="header">
		<h1>jQM-DateBox - Download Builder</h1>
	</div>
	
	<div data-role="content">
		<h3>Download Builder</h3>
		<p>Please select the version of jQueryMobile to build against, along with components that you wish to have enabled.</p>
		<p><i>Note: if you are using jQueryMobile 1.3.2, the 1.4.0 build will likely still work.  The 1.4.1+ builds will not.</i></p>
		<p><strong>Using this to make the -dev version is a real bad idea.  Seriously, that version is probably broken anyway.</strong></p>
		<form action="make.php" target="_blank" method="post" id="build" data-ajax="false">
		<?php
			$itt = 0;
			echo "<fieldset data-role=\"controlgroup\">\n";
			echo "<legend>Version:</legend>\n";
			foreach ( $versions as $ver ) {
				echo "<input type='radio' name='ver' id='ver-{$itt}' value='{$ver}'" . ( ( $itt == 0 ) ? " checked='checked'":"" ) . ">\n";
				echo "<label for='ver-{$itt}'>jQueryMobile {$ver}</label>\n";
				$itt++;
			}
			echo "</fieldset>\n";
			echo "<fieldset data-role='controlgroup'>\n";
			echo "<legend>AMD Bindings:</legend>";
			echo "<input type='radio' name='amd' id='amd-1' value='no' checked='checked'>\n";
			echo "<label for='amd-1'>NOT Included</label>\n";
			echo "<input type='radio' name='amd' id='amd-2' value='yes'>\n";
			echo "<label for='amd-2'>Included</label>\n";
			echo "</fieldset>\n";
			echo "<fieldset>\n";
			echo "<legend>Components Enabled:</legend>\n";
			foreach ( $filemap as $comp ) {
				echo "<label>\n";
				echo "\t<input type='checkbox' value='true' name='comp-{$comp[0]}' checked='checked'>{$comp[1]}\n";
				echo "</label>\n";
			}
			echo "</fieldset>\n";
			echo "<div class='ui-field-contain'\n";
			echo "<label for='langs'>Languages:</label>\n";
			echo "<select name='langs[]' id='langs' multiple='multiple' data-native-menu='false'>\n";
			echo "<option>Choose languages</option>\n";
			foreach ( $langs as $name ) {
				$parts = split(": ", $name);
				$abv = $parts[0];
				echo "<option value='{$abv}'" . (($abv == "en")?" selected='selected'":"") . ">{$name}</option>\n";
			}
			echo "</select></div>\n";
		?>
			<input type="submit" value="Download File">
		</form>
		<h3>CSS Include</h3>
		<p>The base CSS is available in the CDN: 
			<?php 
				foreach ( $versions as $ver ) {
					$link = "http://cdn.jtsage.com/datebox/{$ver}/jqm-datebox-{$ver}.";
					echo "<div data-role='navbar'><ul>\n";
					echo "<li><a href='{$link}css'>Version {$ver} Full</a></li>\n";
					echo "<li><a href='{$link}min.css'>Version {$ver} Min</a></li>\n";
					echo "</ul></div>\n";
				}
			?>
		</p>
		<h3>Minimizing</h3>
		<p>This builder does not minimize for you - I suspect if you want to minify, and know why that might be a good idea, you also know how to do it.  If not, <a href="https://www.google.com/search?q=javascript+minify">google</a> provides a few online minifiers.</p>
	</div>
	<div data-role="footer">
		<h3>jQM-DateBox (c) 2014</h3>
	</div>
</div>
</body>
</html>

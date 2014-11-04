---
---
<?php

$defaults = array(
	// Common Options
	'mWidth' 		=> array(290, "Widget Width", 'common', 100, 700),
	
	// CalBox Options
	'cGDWidth' 		=> array(36, "Date Width", 'calbox',5 ,100),
	'cGDHeight'		=> array(30, "Date Height", 'calbox', 5, 100),
	'cGDLHeight'	=> array(30, "Date Line Height", 'calbox', 5, 50),
	'cGDFont'		=> array(12, "Date Font Size", 'calbox', 5, 50),
	'cGDWWidth'		=> array(31, "Week # Width", 'calbox', 5, 100),
	'cGDEColor'		=> array("#888888", "Non-Month Day Color", 'calbox', false),
	
	// FlipBox Options
	'fLensWidth'	=> array(260, "Lens Width", 'flipbox', 100, 700),
	'fLensHeight'	=> array(40, "Lens Height", 'flipbox', 5, 100),
	'fTotHeight'	=> array(125, "Scroll Box Height", 'flipbox', 50, 350),
	'fScrHeight'	=> array(120, "Scroller Height", 'flipbox', 50, 350),
	'fScrWidth'		=> array(77, "Scroller Width", 'flipbox', 5, 200),
	'fDScrWidth'	=> array(60, "Scroller Width (Dur)", 'flipbox', 5, 200),
	'fEleHeight'	=> array(30, "Date Height", 'flipbox', 5, 50),
	
	// SlideBox Options
	'sYWidth'		=> array(84, "Year Width", 'slidebox', 5, 150),
	'sMWidth'		=> array(51, "Month Width", 'slidebox', 5, 150),
	'sDWidth'		=> array(32, "Date Width", 'slidebox', 5, 150),
	'sHWidth'		=> array(32, "Hour Width", 'slidebox', 5, 150),
	'sIWidth'		=> array(32, "Minute Width", 'slidebox', 5, 150),
	
	'sYMHigh'		=> array(30, "Year/Month Height", 'slidebox', 5, 50),
	'sDHigh'		=> array(38, "Date Height", 'slidebox', 5, 50),
	'sHIHigh'		=> array(24, "Hour/Min Height", 'slidebox', 5, 50),
	
	'sYMLHigh'		=> array(30, "Year/Month Line Height", 'slidebox', 5, 50),
	'sDLHigh'		=> array(20, "Date Line Height", 'slidebox', 5, 50),
	'sHILHigh'		=> array(22, "Hour/Min Line Height", 'slidebox', 5, 50),
	
	'sYFont'		=> array(14, "Year Font Size", 'slidebox', 5, 50),
	'sMFont'		=> array(12, "Month Font Size", 'slidebox', 5, 50),
	'sDFont'		=> array(14, "Date Font Size", 'slidebox', 5, 50),
	'sHFont'		=> array(14, "Hour Font Size", 'slidebox', 5, 50),
	'sIFont'		=> array(14, "Minute Font Size", 'slidebox', 5, 50),
	'sSubFont'		=> array(10, "Subtitle Font Size", 'slidebox', 5, 50)
);

$use = array();

foreach ( $defaults as $key => $value ) {
	if ( isset($_REQUEST[$key]) ) {
		$use[$key] = $_REQUEST[$key];
	} else {
		$use[$key] = $value[0];
	}
}
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>jQueryMobile - DateBox Themeing</title>
	
	<!-- NOTE: Script load order is significant! -->
	<link rel="stylesheet" href="http://code.jquery.com/mobile/{{ site.jqmver }}/jquery.mobile-{{ site.jqmver }}.min.css" />
	
	
	<?php if ( !empty($_SERVER['QUERY_STRING']) ) {
		echo '<link type="text/css" href="sheet.php?'.$_SERVER['QUERY_STRING'].'" rel="stylesheet" />'."\n";
	} else {
		echo '<link type="text/css" href="sheet.php" rel="stylesheet" />'."\n";
	} ?>
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-{{ site.jqver }}.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/{{ site.jqmver }}/jquery.mobile-{{ site.jqmver }}.min.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/external/jquery.mousewheel.min.js"></script>

	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jqm-datebox-{{ site.dbver }}.core{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jqm-datebox-{{ site.dbver }}.mode.calbox{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jqm-datebox-{{ site.dbver }}.mode.datebox{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jqm-datebox-{{ site.dbver }}.mode.flipbox{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jqm-datebox-{{ site.dbver }}.mode.slidebox{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.i18n }}jqm-datebox.lang.utf8.js"></script>
	
	<script type="text/javascript">
		$(document).ready( function() {
			$('.applysheet').click(function () {
				theList = $('#css').serialize();
				$("link[href*=sheet\\.php]:last").after('<link href="sheet.php?' + theList + '" type="text/css" rel="Stylesheet" />');
				if ($("link[href*=sheet\\.php]").size() > 2) {
					$("link[href*=sheet\\.php]:first").remove();
				}
			});
			$('#css input').change(function() {
				var theLink = "index.php?" + $('#css').serialize();
				$('#bookmark').attr('href', theLink);
			});
			$('#getsheet').click(function () {
				theList = $('#css').serialize();
				location.href = "sheet.php?" + theList;
			});
		});
	</script>
	<script type="text/javascript">
		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			useInline: true,
			hideInput: true,
			overrideSlideFieldOrder: ['y','m','d','h','i']
		});
	</script>
</head>
<body>
<div data-role="page">
	<div data-role="header">
		<h1>jQM-DateBox - Theme Roller</h1>
	</div>
	
	<div data-role="content">
		<form id="css">
		<?php
			echo "\n";
			$lasttype = "";
			$intype = 0;
			$ins = array(
				array(array( "datebox", "", 'a' )),
				array(array( "calbox", "", 'b'), array( "calbox", '"calShowWeek":true, ', 'c')),
				array(array( "flipbox", "", 'd')),
				array(array( "slidebox", "", 'e'))
			);
			foreach ( $defaults as $key => $item ) {
				if ( $item[2] <> $lasttype ) {
					if ( $lasttype <> "" ) {
						$intype++;
						foreach ( $ins[$intype-1] as $thisin ) {
							echo "\t\t\t<input type='text' name='theme{$thisin[2]}' data-role='datebox' data-datebox-mode='{$thisin[0]}' data-options='{{$thisin[1]}}'>\n";
						}
						echo "\t\t\t</div>\n";
						
						
						echo "\t\t\t<a href='#' class='applysheet ui-btn ui-btn-a ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all'>Apply Changes</a>\n";
						echo "\t\t\t<a data-rel='popup' href='#display' class='ui-btn ui-btn-a ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all'>Show Samples</a>\n";
					}
					echo "\t\t\t<h2>{$item[2]} Options</h2>\n";
					echo "\t\t\t<div class='ui-field-contain'>\n";
					$lasttype = $item[2];
				}
				echo "\t\t\t\t<label for='{$key}'>{$item[1]}</label>\n";
				if ( $item[3] <> false ) {
					echo "\t\t\t\t<input name='{$key}' id='{$key}' value='{$use[$key]}' type='range' min='{$item[3]}' max='{$item[4]}'>\n";
				} else {
					echo "\t\t\t\t<input name='{$key}' id='{$key}' value='{$use[$key]}' type='text'>\n";
				}
			}
			$intype++;
			foreach ( $ins[$intype-1] as $thisin ) {
				echo "\t\t\t<input type='text' name='theme{$thisin[2]}' data-role='datebox' data-datebox-mode='{$thisin[0]}' data-options='{{$thisin[1]}}'>\n";
			}
			echo "\t\t\t</div>\n";
			echo "\t\t\t<a href='#' class='applysheet ui-btn ui-btn-a ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all'>Apply Changes</a>\n";
			echo "\t\t\t<a data-rel='popup' href='#display' class='ui-btn ui-btn-a ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all'>Show Samples</a>\n";
		?>
		</form>
		<a id="getsheet" href="#" data-role="button" data-theme="b">Get Stylesheet</a>
		<a id="bookmark" href="#" data-role="button" data-theme="b">Bookmark this Version</a>
	</div>
	<div data-role="footer">
		<h3>jQM-DateBox (c) 2014</h3>
	</div>
</div>
</body>
</html>

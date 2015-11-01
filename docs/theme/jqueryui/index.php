---
---
<?php

//Bootstrap version

$defaults = array(
	// Common Options
	'mWidth' 		=> array(290, "Widget Width", 'common', 100, 700),
	
	// CalBox Options
	'cGDWidth' 		=> array(39, "Date Width", 'calbox',5 ,100),
	'cGDHeight'		=> array(30, "Date Height", 'calbox', 5, 100),
	'cGDLHeight'	=> array(30, "Date Line Height", 'calbox', 5, 50),
	'cGDFont'		=> array(12, "Date Font Size", 'calbox', 5, 50),
	'cGDWWidth'		=> array(34, "Week # Width", 'calbox', 5, 100),
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
	'sDWidth'		=> array(40, "Date Width", 'slidebox', 5, 150),
	'sHWidth'		=> array(60, "Hour Width", 'slidebox', 5, 150),
	'sIWidth'		=> array(40, "Minute Width", 'slidebox', 5, 150),
	
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
	<title>jQueryUI - DateBox Themeing</title>
	
	<!-- NOTE: Script load order is significant! -->
	
	<link rel="stylesheet" href="https://code.jquery.com/ui/{{ site.jquiver }}/themes/overcast/jquery-ui.css">

	<?php if ( !empty($_SERVER['QUERY_STRING']) ) {
		echo '<link type="text/css" href="sheet.php?'.$_SERVER['QUERY_STRING'].'" rel="stylesheet" />'."\n";
	} else {
		echo '<link type="text/css" href="sheet.php" rel="stylesheet" />'."\n";
	} ?>

	
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-{{ site.jqver }}.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/{{ site.jquiver }}/jquery-ui.min.js"></script>

	<script type="text/javascript" src="{{ site.cdn }}{{ site.dbver }}/jtsage-datebox{{ site.dbver }}.jqueryui{{site.min}}.js"></script>
	<script type="text/javascript" src="{{ site.i18n }}jtsage-datebox.lang.utf8.js"></script>
	<script type="text/javascript">
		jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
			'useLang': 'en'
		});
	</script>
	
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
		jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
			useInline: true,
			hideInput: true,
			overrideSlideFieldOrder: ['y','m','d','h','i']
		});
	</script>
	<style>

		.form-group.row { margin-bottom: 1.7em; }
		.col-xs-3 { width: 200px; display: inline-block; vertical-align: top;}
		.col-xs-9 { display: inline-block; width: 600px ;}
		.col-xs-9 .help-block {
			display:block;
			color: #777;
		}
		.col-xs-9 input { width: 90%; }
	</style>
</head>
<body style="padding-top: 80px;">


<div id="toolbar" style="position: fixed; z-index:1000; top:0; width: 95%; left: 2.5%; text-align:center" class="ui-widget-header ui-corner-all">
	<h3 style="padding: 10px; margin:0; text-align:center">JTSage<span style="color:#C3593C">DateBox</span></h3>

	<a href="{{ site.basesite}}doc" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
		<span class="ui-button-text">Documentation</span>
	</a>
	<a href="{{ site.basesite}}api" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
		<span class="ui-button-text">API &amp; Options</span>
	</a>
	<a href="{{ site.basesite}}bootstrap" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
		<span class="ui-button-text">Bootstrap Demos</span>
	</a>
	<a href="{{ site.basesite}}jqm" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
		<span class="ui-button-text">jQM Demos</span>
	</a>
	<a href="{{ site.basesite}}jqueryui" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
		<span class="ui-button-text">jQueryUI Demos</span>
	</a>
</div>

<div class="container" role="main">
	<h1>jQueryUI Theme Builder</h1>
		<div class="row"><div class="col-md-8">
		<form id="css">
		<?php
			echo "\n";
			$lasttype = "";
			$intype = 0;
			$dateboxen = "";
			$ins = array(
				array(array( "datebox", "", 'a' )),
				array(array( "calbox", "", 'b'), array( "calbox", '"calShowWeek":true', 'c')),
				array(array( "flipbox", "", 'd')),
				array(array( "slidebox", "", 'e'))
			);
			foreach ( $defaults as $key => $item ) {
				if ( $item[2] <> $lasttype ) {
					if ( $lasttype <> "" ) {
						$intype++;
						foreach ( $ins[$intype-1] as $thisin ) {
						 	$dateboxen .= "\t\t\t<input type='text' name='theme{$thisin[2]}' data-role='datebox' data-datebox-mode='{$thisin[0]}' data-options='{" . $thisin[1] . "}'>\n";
						}
						echo "\t\t\t<a href='#' class='applysheet ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'><span class='ui-button-text'>Apply Changes</span></a>\n";
					}
					echo "\t\t\t<h2>{$item[2]} Options</h2>\n";
					
					$lasttype = $item[2];
				}
				echo "\t\t\t<div class='field-group row'>\n";
				echo "\t\t\t\t<div class='col-xs-3'><label for='{$key}'>{$item[1]}</label></div><div class='col-xs-9'>\n";
				if ( false ) {
					echo "\t\t\t\t<input name='{$key}' id='{$key}' data-slider-id='{$key}Slider' data-slider-value='{$use[$key]}' data-doit='yes' type='text' data-slider-step='1' data-slider-min='{$item[3]}' data-slider-max='{$item[4]}'>\n";
				} else {
					echo "\t\t\t\t<input name='{$key}' id='{$key}' class='form-control' value='{$use[$key]}' type='text'>\n";
				}
				echo "\t\t\t</div></div>\n";
			}
			$intype++;
			foreach ( $ins[$intype-1] as $thisin ) {
				$dateboxen .= "\t\t\t<input type='text' name='theme{$thisin[2]}' data-role='datebox' data-datebox-mode='{$thisin[0]}' data-options='{" . $thisin[1] . "}'>\n";
			}
			echo "\t\t\t<a href='#' class='applysheet ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'><span class='ui-button-text'>Apply Changes</span></a>\n";
		?>
		</form>
		<br />
		<a id="getsheet" href="#" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
			<span class="ui-button-text">Get Stylesheet</span>
		</a>
		<a id="bookmark" href="#" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">
			<span class="ui-button-text">Bookmark this Version</span>
		</a>
		</div><div class="col-md-4" style="width: auto; position: absolute; top: 90px; right: 0;">
			<?php echo $dateboxen; ?>
		</div>
		</div>
</div>

{% include jqui_footer.html api="true" %}

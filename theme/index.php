<?php

$defaults = array(
	'cgdw' => '36', // Cal box width (calbox)
	'cgdwk' => '31', // Cal box width (calbox)
	'cgdh' => '30', // Cal box height (calbox)
	'cgdl' => '30', // Cal box line-height (calbox)
	'cgfs' => '12', // Cal box font size (calbox)
	'cgdec' => '#888', // Empty date color (calbox)
	'cgddc' => '#888888', // Disabled date color (calbox)
	'width' => '280', // Master Width
	'fw' => '77', // width (flipbox)
	'fwl' => '260', // lens width (flipbox)
	'fh' => '30', // cell heigh (flipbox)
	'fhl' => '40', // lens height (flipbox)
	'fch' => '125', // content height (flipbox)
	'fcsh' => '120', // scroller height (flipbox)
	'ssyw' => 84,
	'ssyl' => 30,
	'ssyh' => 30,
	'ssyf' => 14,
	'ssmw' => 51,
	'ssml' => 30,
	'ssmh' => 30,
	'ssmf' => 12,
	'ssdw' => 32,
	'ssdl' => 20,
	'ssdh' => 38,
	'ssdf' => 14,
	'sshw' => 32,
	'sshl' => 22,
	'sshh' => 24,
	'sshf' => 14,
	'swdf' => 10
);

$use = array();

foreach ( $defaults as $key => $value ) {
	if ( isset($_REQUEST[$key]) ) {
		$use[$key] = $_REQUEST[$key];
	} else {
		$use[$key] = $value;
	}
}
?>
<!DOCTYPE html> 
<html lang="en" class="ui-body-b"> 
<head> 
	<!--meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /--> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>jQueryMobile - DateBox Demo</title>
	<link href="http://code.jquery.com/mobile/latest/jquery.mobile.css" rel="stylesheet" type="text/css" />
	
	<?php if ( !empty($_SERVER['QUERY_STRING']) ) {
		echo '<link type="text/css" href="sheet.php?'.$_SERVER['QUERY_STRING'].'" rel="stylesheet" />'."\n";
	} else {
		echo '<link type="text/css" href="sheet.php" rel="stylesheet" />'."\n";
	} ?>
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script> 
	<script src="http://code.jquery.com/mobile/latest/jquery.mobile.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="../js/jqm-datebox.core.js"></script>
	<!--script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.core.min.js"></script-->
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.datebox.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.flipbox.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.durationbox.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.slidebox.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
	
	<script type="text/javascript">
		$(document).ready( function() {
			$('#display').find('input').val('0');
			$('.applysheet').click(function () {
				theList = $('#css').serialize();
				$("link[href*=sheet\\.php]:last").after('<link href="sheet.php?' + theList + '" type="text/css" rel="Stylesheet" />');
				if ($("link[href*=sheet\\.php]").size() > 2) {
					$("link[href*=sheet\\.php]:first").remove();
				}
			});
			
			$('#css input[type=checkbox]').change(function() {
				$('#' + $(this).attr('id') + 'div').toggle();
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
		});
	</script>
	<style>
		label.ui-input-text { font-size: .8em !important; vertical-align: middle !important;}
		.ui-datebox-grid { clear: right !important; }
	</style>
	
</head>
<body>
	<div data-role="page">
		<div data-role="header">
			<h1>jQM-DateBox - Theme Roller</h1>
		</div>
		
		<div data-role="content">
		<div id="ui" style="width: 550px; float: left;">
		<form id="css" style="padding-left: 30px;">
			<div data-role="fieldcontain">
				<label for="width">Master Width</label>
				<input name="width" id="width" value="<?php echo $use['width']; ?>" type="range" min="10" max="700">
				<label for="cgddc">Master Disable Date Color</label>
				<input name="cgddc" id="cgddc" value="<?php echo $use['cgddc']; ?>" type="text">
			</div>
			<a class="applysheet" href="#" data-role="button" data-mini="true">Apply Changes</a>
			
			<h2>CalBox</h2>
			<div data-role="fieldcontain">
				<label for="cgdwk">Date Width (w/ Week)</label>
				<input name="cgdwk" id="cgdwk" value="<?php echo $use['cgdwk']; ?>" type="range" min="5" max="100">
				<label for="cgdw">Date Width</label>
				<input name="cgdw" id="cgdw" value="<?php echo $use['cgdw']; ?>" type="range" min="5" max="100">
				<label for="cgdh">Date Height</label>
				<input name="cgdh" id="cgdh" value="<?php echo $use['cgdh']; ?>" type="range" min="5" max="100">
				<label for="cgdl">Date Line-Height</label>
				<input name="cgdl" id="cgdl" value="<?php echo $use['cgdl']; ?>" type="range" min="5" max="100">
				<label for="cgfs">Date Font Size</label>
				<input name="cgfs" id="cgfs" value="<?php echo $use['cgfs']; ?>" type="range" min="5" max="40">
				<label for="cgdec">Different Month Color</label>
				<input name="cgdec" id="cgdec" value="<?php echo $use['cgdec']; ?>" type="text">
			</div>
			<a class="applysheet" href="#" data-role="button" data-mini="true">Apply Changes</a>
			
			<h2>FlipBox</h2>
			<div data-role="fieldcontain">
				<label for="fw">Roller Width</label>
				<input name="fw" id="fw" value="<?php echo $use['fw']; ?>" type="range" min="5" max="150">
				<label for="fwl">Lens Width</label>
				<input name="fwl" id="fwl" value="<?php echo $use['fwl']; ?>" type="range" min="5" max="550">
				<label for="fh">Cell Height</label>
				<input name="fh" id="fh" value="<?php echo $use['fh']; ?>" type="range" min="5" max="150">
				<label for="fhl">Lens Height</label>
				<input name="fhl" id="fhl" value="<?php echo $use['fhl']; ?>" type="range" min="5" max="150">
				<label for="fch">Content Height</label>
				<input name="fch" id="fch" value="<?php echo $use['fch']; ?>" type="range" min="5" max="350">
				<label for="fcsh">Scroller Height (-5px from Content usually)</label>
				<input name="fcsh" id="fcsh" value="<?php echo $use['fcsh']; ?>" type="range" min="5" max="350">
			</div>
			<a class="applysheet" href="#" data-role="button" data-mini="true">Apply Changes</a>

			<h2>SlideBox</h2>
			<div data-role="fieldcontain">
				<label for="ssyw">Width - Year</label>
				<input name="ssyw" id="ssyw" value="<?php echo $use['ssyw']; ?>" type="range" min="5" max="200">
				<label for="ssmw">Width - Month</label>
				<input name="ssmw" id="ssmw" value="<?php echo $use['ssmw']; ?>" type="range" min="5" max="200">
				<label for="ssdw">Width - Day</label>
				<input name="ssdw" id="ssdw" value="<?php echo $use['ssdw']; ?>" type="range" min="5" max="200">
				<label for="sshw">Width - Time</label>
				<input name="sshw" id="sshw" value="<?php echo $use['sshw']; ?>" type="range" min="5" max="200">
				
				<label for="ssyl">Line Height - Year</label>
				<input name="ssyl" id="ssyl" value="<?php echo $use['ssyl']; ?>" type="range" min="5" max="100">
				<label for="ssml">Line Height - Month</label>
				<input name="ssml" id="ssml" value="<?php echo $use['ssml']; ?>" type="range" min="5" max="100">
				<label for="ssdl">Line Height - Day</label>
				<input name="ssdl" id="ssdl" value="<?php echo $use['ssdl']; ?>" type="range" min="5" max="100">
				<label for="sshl">Line Height - Time</label>
				<input name="sshl" id="sshl" value="<?php echo $use['sshl']; ?>" type="range" min="5" max="100">
				
				<label for="ssyh">Height - Year</label>
				<input name="ssyh" id="ssyh" value="<?php echo $use['ssyh']; ?>" type="range" min="5" max="100">
				<label for="ssmh">Height - Month</label>
				<input name="ssmh" id="ssmh" value="<?php echo $use['ssmh']; ?>" type="range" min="5" max="100">
				<label for="ssdh">Height - Day</label>
				<input name="ssdh" id="ssdh" value="<?php echo $use['ssdh']; ?>" type="range" min="5" max="100">
				<label for="sshh">Height - Time</label>
				<input name="sshh" id="sshh" value="<?php echo $use['sshh']; ?>" type="range" min="5" max="100">
				
				<label for="ssyf">Font Size - Year</label>
				<input name="ssyf" id="ssyf" value="<?php echo $use['ssyf']; ?>" type="range" min="5" max="50">
				<label for="ssmf">Font Size - Month</label>
				<input name="ssmf" id="ssmf" value="<?php echo $use['ssmf']; ?>" type="range" min="5" max="50">
				<label for="ssdf">Font Size - Day</label>
				<input name="ssdf" id="ssdf" value="<?php echo $use['ssdf']; ?>" type="range" min="5" max="50">
				<label for="sshf">Font Size - Time</label>
				<input name="sshf" id="sshf" value="<?php echo $use['sshf']; ?>" type="range" min="5" max="50">
				<label for="swdf">Font Size - Subscripts</label>
				<input name="swdf" id="swdf" value="<?php echo $use['swdf']; ?>" type="range" min="5" max="50">
			</div>
			<a class="applysheet" href="#" data-role="button" data-mini="true">Apply Changes</a>

		</form>
		<a id="getsheet" href="#" data-role="button" data-theme="b">Get Stylesheet</a>
		<a id="bookmark" href="#" data-role="button" data-theme="b">Bookmark this Version</a>
		</div>
		
		<div id="display" style="margin-left: 553px; margin-top: 180px">
			<input name="theme1" id="theme0" type="text" data-role="datebox" data-options='{"mode":"calbox", "calShowWeek":true}' />
			<input name="theme1" id="theme1" type="text" data-role="datebox" data-options='{"mode":"calbox"}' />
			<input name="theme2" id="theme2" type="text" data-role="datebox" data-options='{"mode":"datebox"}' />
			<input name="theme3" id="theme3" type="text" data-role="datebox" data-options='{"mode":"flipbox"}' />
			<input name="theme4" id="theme4" type="text" data-role="datebox" data-options='{"mode":"slidebox", "overrideSlideFieldOrder":["y","m","d","h","i"], "overrideDateFormat":"%Y-%m-%d %H:%M:00"}' />
		</div>
		</div>
		<div data-role="footer">
			<h3>jQM-DateBox (c) 2012</h3>
		</div>
	</div>
</body>
</html>

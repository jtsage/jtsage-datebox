<?php
	$verA = "1.4.5";
	$verB = "1.4.5";
	if ( isset($_REQUEST['ver']) ) {
		$verA = $_REQUEST['ver'];
		$verB = $_REQUEST['ver'];
	}
	if ( isset($_REQUEST['verB']) ) {
		$verB = $_REQUEST['verB'];
	}
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>jQueryMobile - DateBox Demo</title>
	
	<!-- NOTE: Script load order is significant! -->
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script> 
	
	
	<link rel="stylesheet" href="http://code.jquery.com/mobile/<?php echo $verA; ?>/jquery.mobile-<?php echo $verA; ?>.min.css" />
	<script src="http://code.jquery.com/mobile/<?php echo $verA; ?>/jquery.mobile-<?php echo $verA; ?>.min.js"></script>
	
	<script type="text/javascript" src="http://cdn.jtsage.com/external/jquery.mousewheel.min.js"></script>
	
	<link type="text/css" href="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.css" rel="stylesheet" /> 
	
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.core.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.calbox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.datebox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.flipbox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.durationbox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.durationflipbox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/<?php echo $verB; ?>/jqm-datebox-<?php echo $verB; ?>.mode.slidebox.js"></script>
	<script type="text/javascript" src="http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
	<script type="text/javascript">
		jQuery.extend(jQuery.mobile, { ajaxEnabled: false });
	</script>
	
</head>
<body>
<div data-role="page" id="main"> 
	<div data-role="header" data-position="fixed"> 
		<h1>jQueryMobile - Dev Page</h1>
	</div>
	<div class="ui-content" role="main">
		<form method="POST" action="index.php">
			<div class="ui-field-contain">
				<label for="ver">jQM Version</label>
				<input type="text" id="ver" name="ver" value="<?php echo $verA; ?>">
			</div>
			<div class="ui-field-contain">
				<label for="verB">DateBox Version (or dev)</label>
				<input type="text" id="verB" name="verB" value="<?php echo $verB; ?>">
			</div>
			<input type="submit" value="Set Versions">
		</form>
			
		<div class="ui-field-contain">
			<label for="aa1">text comparison</label>
			<input name="aa1" type="text" data-mini="true" id="aa1"/>
		</div>

		<div class="ui-field-contain">
			<label for="lang1">calbox</label>
			<input name="lang1" type="text" data-role="datebox" data-options='{"mode": "calbox"}' id="lang1" />
		</div>
		<div class="ui-field-contain">
			<label for="lang2">datebox</label>
			<input name="lang2" type="text" data-role="datebox" data-options='{"mode": "datebox"}' id="lang2" />
		</div>
		<div class="ui-field-contain">
			<label for="lang3">flipbox</label>
			<input name="lang3" type="text" data-role="datebox" data-options='{"mode": "flipbox"}' id="lang3" />
		</div>
		<div class="ui-field-contain">
			<label for="lang4">slidebox</label>
			<input name="lang4" type="text" data-role="datebox" data-options='{"mode": "slidebox"}' id="lang4" />
		</div>
		<div class="ui-field-contain">
			<label for="lang5">timebox</label>
			<input name="lang5" type="text" data-role="datebox" data-options='{"mode": "timebox"}' id="lang5" />
		</div>
		<div class="ui-field-contain">
			<label for="lang6">timeflipbox</label>
			<input name="lang6" type="text" data-role="datebox" data-options='{"mode": "timeflipbox"}' id="lang6" />
		</div>
		<div class="ui-field-contain">
			<label for="lang7">durationbox</label>
			<input name="lang7" type="text" data-role="datebox" data-options='{"mode": "durationbox"}' id="lang7" />
		</div>
		<div class="ui-field-contain">
			<label for="lang8">durationflipbox</label>
			<input name="lang8" type="text" data-role="datebox" data-options='{"mode": "durationflipbox"}' id="lang8" />
		</div>

	</div>
	<div data-role="footer" data-position="fixed">
		<h1>Some Footer Information or Something.</h1>
	</div>
</div>
</html>

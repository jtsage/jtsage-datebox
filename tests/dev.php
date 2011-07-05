<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQueryMobile - DateBox Demo</title>
	<link href="http://code.jquery.com/mobile/latest/jquery.mobile.min.css" rel="stylesheet" type="text/css" />
	<link type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.css" rel="stylesheet" /> 
	
	<!-- NOTE: Script load order is significant! -->
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.1.min.js"></script> 
	<script type="text/javascript">
		$( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = 'text';
		});	
	</script>
	<script src="http://code.jquery.com/mobile/latest/jquery.mobile.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.js"></script>
	<script type="text/javascript">
		jQuery.extend(jQuery.mobile.datebox.prototype.options, {
			'experimentalReg': true
		});
	</script>
	
</head>
<body>
<div data-role="page" data-theme="a" id="main"> 
	<div data-role="header"> 
		<h1>jQueryMobile - Dev Page</h1>
	</div>
	<div data-role="content" data-theme="c">
		<div data-role="fieldcontain">
			<label for="aa">Cal</label>
			<input name="aa" type="date" data-role="datebox" data-options='{"mode": "calbox", "pickPageHighButtonTheme": "a", "pickPageButtonTheme": "d", "pickPageOHighButtonTheme": "b", "highDays": [0,6]}' id="aa" />
		</div>
		<div data-role="fieldcontain">
			<label for="bb">Slide</label>
			<input name="bb" type="date" data-role="datebox" data-options='{"mode": "slidebox"}' id="bb" />
		</div>
		<div data-role="fieldcontain">
			<label for="cc">Droid</label>
			<input name="cc" type="date" data-role="datebox" data-options='{"mode": "datebox", "dateFormat": "ddd the ddSS of mmm in the year YYYY"}' id="cc" />
		</div>
		<div data-role="fieldcontain">
			<label for="dd">Time</label>
			<input name="dd" type="text" data-role="datebox" data-options='{"mode": "timebox", "timeFormat":12}' id="dd" />
		</div>
		<div data-role="fieldcontain">
			<label for="ee">Length</label>
			<input name="ee" type="text" data-role="datebox" data-options='{"mode": "durationbox", "durationOrder": ["d", "h", "i"]}' id="ee" />
		</div>
		
		<div data-role="fieldcontain" class="ui-grid-a">
			<div class="ui-block-a">
				<label for="f1">Date</label>
				<input name="f1" type="text" data-role="datebox" data-options='{"mode": "datebox", "centerWindow": true, "closeCallback": "$(\"#f2\").datebox(\"open\");"}' id="f1" />
			</div>
			<div class="ui-block-b">
				<label for="f2">Time</label>
				<input name="f2" type="text" data-role="datebox" data-options='{"mode": "timebox", "timeFormat":12, "centerWindow": true}' id="f2" />
			</div>
		</div>
		
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a rel='external' href="http://dev.jtsage.com/blog/">Blog</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

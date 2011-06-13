<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<title>jQueryMobile - DateBox Demo</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
	<link type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.css" rel="stylesheet" /> 
	
	<!-- NOTE: Script load order is significant! -->
	
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.1.min.js"></script> 
	<script type="text/javascript">
		$( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = 'text';
		});	
	</script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
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
			<input name="aa" type="date" data-role="datebox" data-options='{"mode": "calbox", "calWeekMode": "true", "pickPageHighButtonTheme": "a", "pickPageButtonTheme": "d", "afterToday":true}' id="aa" />
		</div>
		<div data-role="fieldcontain">
			<label for="bb">Slide</label>
			<input name="bb" type="date" data-role="datebox" data-options='{"mode": "slidebox"}' id="bb" />
		</div>
		<div data-role="fieldcontain">
			<label for="cc">Droid</label>
			<input name="cc" type="date" data-role="datebox" data-options='{"mode": "datebox", "dateFormat": "ddd ddo mmm"}' id="cc" />
		</div>
		<div data-role="fieldcontain">
			<label for="dd">Time</label>
			<input name="dd" type="text" data-role="datebox" data-options='{"mode": "timebox", "minuteStep": 15, "timeFormat":12}' id="dd" />
		</div>
		<div data-role="fieldcontain">
			<label for="ee">Length</label>
			<input name="ee" type="text" data-role="datebox" data-options='{"mode": "durationbox", "durationSteppers":{"d":2,"h":1,"i":15,"s":20}}' id="ee" />
		</div>
		
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a rel='external' href="http://dev.jtsage.com/blog/">Blog</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

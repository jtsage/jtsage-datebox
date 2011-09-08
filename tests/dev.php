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
	<script src="http://code.jquery.com/mobile/latest/jquery.mobile.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.js"></script>
	<!--<script type="text/javascript">
		$('input').live('datebox', function(e, p) {
			if ( p.method === "offset" ) { 
				console.log(p);
			}
		});
	</script>-->
	
</head>
<body>
<div data-role="page" data-theme="a" id="main"> 
	<div data-role="header"> 
		<h1>jQueryMobile - Dev Page</h1>
	</div>
	<div data-role="content" data-theme="c">
		<div data-role="fieldcontain">
			<label for="aa">Cal</label>
			<input name="aa" type="date" data-role="datebox" data-options='{"mode": "calbox", "useDialogForceTrue": true, "pickPageHighButtonTheme": "a", "pickPageButtonTheme": "d", "pickPageOHighButtonTheme": "b", "highDays": [0,6]}' id="aa" />
		</div>
		<div data-role="fieldcontain">
			<label for="bb">Slide</label>
			<input name="bb" type="date" data-role="datebox" data-options='{"mode": "slidebox"}' id="bb" />
		</div>
		<div data-role="fieldcontain">
			<label for="bb2">Slide w/ time</label>
			<input name="bb2" type="text" data-role="datebox" data-options='{"debug": true, "mode": "slidebox", "dateFormat": "MM/DD/YYYY at hh:iiaa", "headerFormat": "MM/DD/YYYY hh:iiaa", "timeFormat": 12, "fieldsOrder": ["y","m","d","h", "i"]}' id="bb2" />
		</div>
		<div data-role="fieldcontain">
			<label for="cc">Droid</label>
			<input name="cc" type="date" data-role="datebox" data-options='{"debug":true,"mode": "datebox", "useDialogForceTrue": true, "dateFormat": "ddd the ddSS of mmm in the year YYYY"}' id="cc" />
		</div>
		<div data-role="fieldcontain">
			<label for="dd">Time</label>
			<input name="dd" type="text" data-role="datebox" data-options='{"mode": "timebox", "timeFormat":12}' id="dd" />
		</div>
		<div data-role="fieldcontain">
			<label for="ee">Length</label>
			<input name="ee" type="text" data-role="datebox" data-options='{"mode": "durationbox", "defaultDate": 3612, "durationOrder": ["d", "h", "i"]}' id="ee" />
		</div>
		<div data-role="fieldcontain">
			<label for="ff">Flip (Date)</label>
			<input name="ff" type="date" data-role="datebox" data-options='{"mode": "flipbox"}' id="ff" />
		</div>
		<div data-role="fieldcontain">
			<label for="gg">Flip (12hr Time)</label>
			<input name="gg" type="text" data-role="datebox" data-options='{"mode": "timeflipbox", "minuteStep": 5, "timeFormat": 12}' id="gg" />
		</div>
		
		
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a rel='external' href="http://dev.jtsage.com/blog/">Blog</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

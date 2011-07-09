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
      'dateFormat': 'ddd, DD. mmm YYYY',
      'headerFormat': 'ddd, DD. mmm YYYY',
      'daysOfWeek': ['Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag'],
        'daysOfWeekShort': ['So',
            'Mo',
            'Di',
            'Mi',
            'Do',
            'Fr',
            'Sa'],
        'monthsOfYear': ['Januar',
            'Februar',
            'Marz',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'],
        'monthsOfYearShort': ['Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dez'],
        'durationLabel': ['Tage', 'Stunden', 'Minuten', 'Sekunden'],
        'durationDays': ['Tag', 'Tage'],
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
			<label for="datetime">Cal</label>
			<input data-options="{'noButtonFocusMode':'true','mode':'calbox','noAnimation':'false','calHighPicked':'true'}" data-role="datebox" id="datetime" name="" readonly="readonly" style="width: 100% !important" type="date" value="Mittwoch, 29. Juni 2011"></input>
		</div>
		
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a rel='external' href="http://dev.jtsage.com/blog/">Blog</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

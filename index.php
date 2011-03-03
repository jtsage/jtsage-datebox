
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<title>jQueryMobile - DateBox Demo</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a3/jquery.mobile-1.0a3.min.css" />
	<link type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.css" rel="stylesheet" /> 
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script> 
	<script type="text/javascript">
		$( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = 'text';
		});	
	</script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0a3/jquery.mobile-1.0a3.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.js"></script>
</head>
<body>
<div data-role="page" data-theme="a" id="main"> 
	<div data-role="header"> 
		<h1>jQueryMobile - DateBox Demo</h1>
	</div>
	<div data-role="content" data-theme="c">
		<form method="post" action="#">
			<div data-role="fieldcontain"><label for="date">Some Date with Default</label><input value="01/01/2011" name="date" type="date" data-role="datebox" id="date" />	</div>
			<div data-role="fieldcontain"><label for="txt">Some Text</label><input id="txt" value="Plain text input for comparison" type="text" /></div>
		</form>	
		<div>
		<?php
		include_once "../markdown.php";
		$md_text = file_get_contents("README.md");
		echo Markdown($md_text);
		?>
		</div>
		<form method="post" action="#">
			<label for="date2">Some Other Date Here</label><input name="date2" type="date" data-options='{"buttonTheme": "b", "daysOfWeek" : ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]}' data-role="datebox" id="date2" />
		</form>
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

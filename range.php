
<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<title>jQueryMobile - DateBox Date Range Demo</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4/jquery.mobile-1.0a4.min.css" />
	<link type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.css" rel="stylesheet" /> 
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script> 
	<script type="text/javascript">
		$( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = 'text';
		});	
	</script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0a4/jquery.mobile-1.0a4.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.js"></script>
</head>
<body>
<div data-role="page" data-theme="a" id="main"> 
	<div data-role="header"> 
		<h1>jQueryMobile - DateBox Date Range Demo (1.0a4 base)</h1>
	</div>
	<div data-role="content" data-theme="c">
		<script type="text/javascript">
			function updateEndDate() { // UPDATE END DATE FIELD
				// TO ACCESS THE DATE, GRAB FROM HERE
				var newdate = new Date($('#startdate').data('datebox').theDate);
				if ( newdate.getDate() ) { // VALID DATE IN FIRST INPUT
				
					// ADD THE VALUE OF #days SELECT TO DATE
					newdate.setDate(newdate.getDate() + parseInt($('#days').val()));
					
					// ADD PADDING ZEROS
					var padMonth = (( newdate.getMonth() < 9 ) ? "0" : "") + ( newdate.getMonth() + 1 ),
						padDay = (( newdate.getDate() < 10 ) ? "0" : "") + newdate.getDate();
					
					// DUMP OUTPUT INTO #enddate TEXT INPUT
					$('#enddate').val(newdate.getFullYear() + "-" + padMonth + "-" + padDay);
				}
			}
			
			$('#startdate').live('change', function() {
				// UPDATE WHEN THE START DATE IS CHANGED
				updateEndDate();
			});
			
			$('#days').live('change', function() {
				// UPDATE WHEN THE DATE RANGE IS CHANGED
				updateEndDate();
			});
		</script>
		<p>View source for method - this details how jQM-DateBox might be used to automatically fill in a range of dates.</p>
		<form method="post" action="#">
			<div data-role="fieldcontain"><label for="startdate">Start Date:</label><input value="2011-01-01" name="startdate" type="date" data-role="datebox" id="startdate" data-options='{"useDialogForceFalse": true'/>	</div>
			<div data-role='fieldcontain'><label for='days'>Number of Days:</label><select data-native-menu="false" name='days' id='days' >
				<option value='7' selected="selected">1 Week</option>
				<option value='6'>6 Days</option>
				<option value='5'>5 Days</option>
				<option value='4'>4 Days</option>
				<option value='3'>3 Days</option>
				<option value='2'>2 Days</option>
				<option value='1'>1 Day</option>
			</select></div>
			<div data-role="fieldcontain"><label for="enddate">End Date:</label><input id="enddate" type="text" /></div>
		</form>	
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
	<title>jQueryMobile - DateBox Demo</title>
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.css" />
	<link type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.css" rel="stylesheet" /> 
	
	<!-- NOTE: Script load order is significant! -->
	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script> 
	<script type="text/javascript">
		$( document ).bind( "mobileinit", function(){
			$.mobile.page.prototype.options.degradeInputs.date = 'text';
		});	
	</script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js"></script>
	<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jquery.mobile.datebox.js"></script>
	
</head>
<body>
<div data-role="page" data-theme="a" id="main"> 
	<div data-role="header"> 
		<h1>jQueryMobile - DateBox Demo (1.0a4.1 base)</h1>
	</div>
	<div data-role="content" data-theme="c">
		<div data-role="collapsible">
			<h3>All Default Demo (src line: 28)</h3>
			<div data-role="fieldcontain">
				<label for="plugindefault">Plugin Defaults</label>
				<input value="2011-01-01" name="plugindefault" type="date" data-role="datebox" id="plugindefault" />
			</div>
		</div>
		<div data-role="collapsible" data-collapsed="true">
			<h3>Available Modes (src line: 35)</h3>
			<div data-role="fieldcontain"><!-- Date Picker, Android Styling -->
				<label for="defandroid">Date Picker, Android Style</label>
				<input value="2011-01-01" name="defandroid" type="date" data-role="datebox" id="defandroid" />
			</div>
			<div data-role="fieldcontain"><!-- Date Picker, Calendar Display -->
				<label for="defcal">Date Picker, Calendar Style</label>
				<input name="defcal" type="date" data-role="datebox" id="defcal" data-options='{"mode": "calbox"}'/>
			</div>
			<div data-role="fieldcontain"><!-- Date Picker, Slide Display -->
				<label for="slide">Date Picker, Slide Style</label>
				<input value="2012-04-25" name="slide" type="date" data-options='{"mode": "slidebox"}' data-role="datebox" id="slide" />
			</div>
			<div data-role="fieldcontain"><!-- Time Picker, 12 Hour Clock -->
				<label for="time12">Time Picker, 12 Hour Clock</label>
				<input value="8:03 AM" name="time12" type="text" data-options='{"mode": "timebox", "timeFormat": 12}' data-role="datebox" id="time12" />
			</div>
			<div data-role="fieldcontain"><!-- Time Picker, 24 Hour Clock -->
				<label for="time24">Time Picker, 24 Hour Clock</label>
				<input value="10:22" name="time24" type="text" data-options='{"mode": "timebox"}' data-role="datebox" id="time24" />
			</div>
		</div>
		<div data-role="collapsible" data-collapsed="true">
			<h3>Advanced Option Demos</h3><div data-role="collapsible-set">
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Forced Dialog Mode (src line: 61)</h3>
				<p>Forces the use of the jQM Dialog System, works in all modes</p>
				<div data-role="fieldcontain">
					<label for="adv1">Some Date</label>
					<input value="2011-01-01" name="adv1" type="date" data-role="datebox" id="adv1" data-options='{"useDialogForceTrue": true}'/>
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Forced Popup, Day-Month-Year display, Constrained Year (src line: 70)</h3>
				<p>Foces the use of the popup overlay mode (all modes), Input as Day-Month-Year (android only), with a minimum year of 2009 (android only)</p>
				<div data-role="fieldcontain">
					<label for="adv2">Some Date, After 2009 only.</label>
					<input value="2011-01-01" name="adv2" type="date" data-role="datebox" id="adv2" data-options='{"useDialogForceFalse": true, "minYear": 2009, "fieldsOrder": ["d", "m", "y"]}'/>
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Forced Popup No Animation mode (src line: 79)</h3>
				<p>Foces the use of the popup overlay mode (all modes) with no animation (all modes, limited to popup)</p>
				<div data-role="fieldcontain">
					<label for="adv3">Some Date</label>
					<input value="2011-01-01" name="adv3" type="date" data-role="datebox" id="adv3" data-options='{"mode": "calbox", "useDialogForceFalse": true, "noAnimation": true}'/>
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Modal Popup, Hidden Default, 1 Month Only (src line: 88)</h3>
				<p>Uses the modal popup for forced input (all modes), a hidden default date (all date modes), and shows only the current months dates (calendar only)</p>
				<div data-role="fieldcontain">
					<label for="adv4">Some Date</label><input name="adv4" type="date" data-role="datebox" id="adv4" data-options='{"mode": "calbox", "calShowOnlyMonth": true, "useModal": true, "defaultDate": "2010-01-01"}'/>
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Credit Card Expiration Entry (src line: 96)</h3>
				<p>Uses return formatting and field order limiting to input a month / year for a credit card (android only).</p>
				<div data-role="fieldcontain">
					<label for="adv5">Credit Card Expiration</label>
					<input value="1/2014" name="adv5" type="text" data-role="datebox" id="adv5" data-options='{"dateFormat": "mm/YYYY", "fieldsOrder": ["m", "y"]}' />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>No button focus mode (src line: 105)</h3>
				<p>Demonstrates opening the date picker on focus rather than icon click or tap (all modes)</p>
				<div data-role="fieldcontain">
					<label for="adv6">Some Date</label>
					<input value="2011-01-01" name="adv6" type="date" data-role="datebox" id="adv6" data-options='{"mode": "calbox", "noButtonFocusMode": "true"}'/>
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Link Open (src line: 114)</h3>
				<p>Demonstrates opening the date picker with a <a href="#" id="plainlink">link</a></p>
				<script type="text/javascript">
					$('#plainlink').live('click', function() {
						$('#plainlinkdate').datebox('open');
					});
				</script>
				<div data-role="fieldcontain">
					<label for="plainlinkdate">Some Date</label>
					<input value="2011-01-01" name="plainlinkdate" type="date" data-role="datebox" id="plainlinkdate" />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Date Range (src line: 128)</h3>
				<p>Demonstrates using date picker and a text box to enter a date range (customizable)</p>
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
		
				<div data-role="fieldcontain">
					<label for="startdate">Start Date:</label>
					<input value="2011-01-01" name="startdate" type="date" data-role="datebox" id="startdate" data-options='{"useDialogForceFalse": true'/>
				</div>
				<div data-role='fieldcontain'>
					<label for='days'>Number of Days:</label>
					<select data-native-menu="false" name='days' id='days' >
						<option value='7' selected="selected">1 Week</option>
						<option value='6'>6 Days</option>
						<option value='5'>5 Days</option>
						<option value='4'>4 Days</option>
						<option value='3'>3 Days</option>
						<option value='2'>2 Days</option>
						<option value='1'>1 Day</option>
					</select>
				</div>
				<div data-role="fieldcontain">
					<label for="enddate">End Date:</label>
					<input id="enddate" type="text" />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Hidden Input, Link Open (src line: 182)</h3>
				<p>Demonstrates opening a hidden date picker (value: <span id="hiddendateval"></span>) with a <a href="#" id="hlink">link</a>. Only works with forced dialog mode.</p>
				<script type="text/javascript">
					// NOTE: The event seemed to be attaching multiple times - threw a die in there to prevent 
					$('#hlink').die('click');
					$('#hlink').live('click', function(e) {
						$('#hiddenlinkdate').datebox('open');
					});
					$('#hiddenlinkdate').live('change', function() {
						$('#hiddendateval').text($('#hiddenlinkdate').val());
					});
				</script>
				<div data-role="fieldcontain" style="display: none !important;">
					<input value="2011-01-01" name="hiddenlinkdate" type="date" data-role="datebox" id="hiddenlinkdate" data-options='{"mode": "calbox", "useDialogForceTrue": true, "dateFormat": "MM/DD/YYYY"}' />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Limit to today + 60 days (src line: 200)</h3>
				<p>Limit the allowed dates to at minimum today, and at maximum 60 days in the future. (both date modes)</p>
				<p>Note: the calendar mode limits users to viewing months with valid dates.</p>
				<div data-role="fieldcontain">
					<label for="limit">Android Style</label>
					<input name="limit" type="date" data-role="datebox" id="limit" data-options='{"afterToday": true, "maxDays": 60}'/>
				</div>
				<div data-role="fieldcontain">
					<label for="limit2">Calendar Style</label>
					<input name="limit2" type="date" data-role="datebox" data-options='{"minDays": 2, "maxDays": 60, "mode": "calbox"}' id="limit2" />
				</div>
			</div>

			<div data-role="collapsible" data-collapsed="true">
				<h3>Inline, hidden input display (src line: 214)</h3>
				<p>Display the date picker (any mode) inline.  Note that inline display will always take precendence.</p>
				<p>The current date is <span id="inlinedateval"></span></p>
				<script type="text/javascript">
					$('#inline').live('change', function() {
						$('#inlinedateval').text($('#inline').val());
					});
				</script>
				<div data-role="fieldcontain"><div id="isodiv"><style type="text/css">#isodiv>.ui-datebox-container { margin-right: auto; margin-left: auto; }</style>
					<label for="inline">Some Date</label>
					<input name="inline" type="date" data-role="datebox" data-options='{"useInline": true, "useInlineHideInput": true, "mode": "calbox"}' id="inline" />
				</div></div>
			</div>

			<div data-role="collapsible" data-collapsed="true">
				<h3>Blacklisted Days and Dates (src line: 229)</h3>
				<p>Blacklist days (day of week), or dates (yyyy/mm/dd) - Calendar mode only</p>
				<p>Date Format:  must be a simple array of ISO style dates, i.e.: ["2011-01-01", "2011-01-02"] etc.</p>
				<p>Example shows No Tuesdays and a few days in May and June 2011 disabled.</p>

				<div data-role="fieldcontain">
					<label for="blacklist2">Some ISO Date</label>
					<input value="2011-05-01" name="blacklist2" type="date" data-role="datebox" id="blacklist2" data-options='{"mode": "calbox", "blackDays": [2], "blackDates": ["2011-05-31", "2011-06-01", "2011-05-03","2011-05-04","2011-05-05"]}'/>
				</div>
			</div>

			<div data-role="collapsible" data-collapsed="true">
				<h3>Limit to today + 10 days, then based on start. (src line: 245)</h3>
				<p>The first date is limited from "today" to 10 days in the future.</p>
				<p>The second date is limited from the first date, to 10 days after the first date</p>
				<p>Note: yes, apparently some of the options can be changed dynamicly.  cool</p>
				<p>Note #2: minDays will take a negative number.   *very* cool.</p>
				<script type="text/javascript">
					$('#rlimit').live('change', function() {
						$('#rlimit2').val($('#rlimit').val());
						var temp = new Date(),
							diff = parseInt(($('#rlimit').data('datebox').theDate - temp) / ( 1000 * 60 * 60 * 24 ));
							diffstrt = (diff * -1)-1; // If you want a minimum of 1 day between, make this -2 instead of -1
							diffend = diff + 11; // Why 11 instead of 10?  No idea...
					
						$('#rlimit2').data('datebox').options.minDays = diffstrt;
						$('#rlimit2').data('datebox').options.maxDays = diffend;
					});
				</script>
				<div data-role="fieldcontain">
					<label for="rlimit">Beginning Date</label>
					<input name="rlimit" type="date" data-role="datebox" id="rlimit" data-options='{"mode": "calbox", "afterToday": true, "maxDays": 10}'/>
				</div>
				<div data-role="fieldcontain">
					<label for="rlimit2">Ending Date</label>
					<input name="rlimit2" type="date" data-role="datebox" data-options='{"minDays": -10, "maxDays": 10, "mode": "calbox"}' id="rlimit2" />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Week Mode (src line: 273)</h3>
				<p>Use the first day of week (configurable day, set to monday [1] in demo) mode.  Calendar only.</p>
				
				<div data-role="fieldcontain">
					<label for="week">Some Monday</label>
					<input value="2011-01-01" name="week" type="date" data-role="datebox" id="week" data-options='{"mode": "calbox", "calWeekModeFirstDay": 1, "calWeekMode": true}' />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Different Start Day (src line: 279)</h3>
				<p>Start the calendar on a day other than sunday (monday shown). Calendar only.</p>
				
				<div data-role="fieldcontain">
					<label for="shiftday">Some Date</label>
					<input name="shiftday" type="date" data-role="datebox" data-options='{"mode": "calbox", "calStartDay": 1}' id="shiftday" />
				</div>
			</div>
			
			<div data-role="collapsible" data-collapsed="true">
				<h3>Linked Inputs [callbacks] (src line: 289)</h3>
				<p>While it is almost always enough to listen for the 'change' event on the datebox input, occasionly you may need to trigger an event only when DateBox is done.  For this purpose, DateBox provides a very simple callback mechanism.  The following date and time inputs are linked so that a user might need to supply both.</p>
				
				<div data-role="fieldcontain">
					<label for="linkdate">Some Date</label>
					<input name="linkdate" type="date" data-role="datebox" data-options='{"closeCallback": "$(\"#linktime\").datebox(\"open\");"}' id="linkdate" />
					<label for="linktime">Some Time</label>
					<input name="linktime" type="text" data-role="datebox" data-options='{"mode": "timebox", "timeFormat": 12, "noButton": true}' id="linktime" />
				</div>
			</div>
			
		</div></div>
		<div data-role="collapsible">
			<!-- NOTE: When running locally, just nuke this section, or go grab PHP Markdown -->
			<h3>Readme File</h3>
			<?php
				include_once "../markdown.php";
				$md_text = file_get_contents("README.md");
				echo Markdown($md_text);
			?>
		</div>
	</div>
	<div data-role="footer">
		<a href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a rel='external' href="http://dev.jtsage.com/blog/">Blog</a><a href="mailto:jtsage+datebox@gmail.com">Contact</a>
	</div>
</div>
</html>

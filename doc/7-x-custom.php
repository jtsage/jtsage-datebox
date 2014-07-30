<?php require_once('inc/func.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>jQM::DateBox - Main Documentation</title>

<link rel="stylesheet" href="css/demos.min.css" />
<link rel="stylesheet" href="css/jquery.mobile.icons.min.css" />
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.3/jquery.mobile.structure-1.4.3.min.css" />
<link rel="stylesheet" href="/jQM-DateBox/css/jqm-datebox.css" />

<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script src="http://code.jquery.com/mobile/1.4.3/jquery.mobile-1.4.3.min.js"></script>
<script type="text/javascript" src="http://dev.jtsage.com/jquery.mousewheel.min.js"></script>

<script type="text/javascript" src="inc/doc.js"></script>
<script type="text/javascript" src="/jQM-DateBox/js/jqm-datebox.core.js"></script>
<script type="text/javascript" src="/jQM-DateBox/js/jqm-datebox.mode.customflip.js"></script>
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
<script type="text/javascript">
	var selectdata = ['Single', 'Separated', 'Involved', 'Married', 'Widowed', 'Lover', 'Other'];
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		'customData': [{
			'input': true,
			'name': '',
			'data': selectdata
		}],
		"customDefault": [0,0,0],
		"useNewStyle": true,
		"enablePopup": false,
		"useFocus": true,
		"useHeader": true,
		"customFormat": "%Xa",
	});
	jQuery.extend(jQuery.mobile, { ajaxEnabled: false });
</script>
<script type="text/javascript" src="http://dev.jtsage.com/gpretty/prettify.js"></script>
<link href="http://dev.jtsage.com/gpretty/prettify.css" rel="stylesheet" />
<script type="text/javascript">
	$(document).on('pagecreate', function() {
		 prettyPrint()
	 });
</script>
</head>
<body>
<div data-role="page" id="main">
	<div data-role="header" data-position="fixed">
		<a href="7-demos.php" data-icon="arrow-l" data-role="button">Back</a>
		<h1>jQMDateBox - CustomBox/CustomFlip</h1>
	</div>
	<div data-role="content">
		<h1>CustomBox / CustomFlip</h1>
		<p>The custom modes allow you display and select data that has absolutly nothing to do with dates.  It uses the bare minimum of
		the datebox framework to provide the same UI to any matrix data you might have.</p>
		<p>Shown below are the configuration options.  This is the most complete documentation for this mode, but it does appear in the API as well.</p>
		
		<h2>Options</h2>
		<h3>Simple Options</h3>
		<ul>
			<li><strong><?php api('custom', 'themeOptPick'); ?></strong>: Theme for centered data (flip)</li>
			<li><strong><?php api('custom', 'themeOpt'); ?></strong>: Theme for all other data (flip)</li>
			<li><strong><?php api('themes', 'themeButton'); ?></strong>: Theme for +/- buttons (box)</li>
			<li><strong><?php api('themes', 'themeInput'); ?></strong>: Theme for input box data (box)</li>
			<li><strong><?php api('control', 'useSetButton'); ?></strong>: Show a set button (box)</li>
		</ul>
		<h3><?php api('custom', 'overrideCustomSet'); ?></h3>
		<p>Set button text.  Note that this really should be set in a language pack.  But included here for easy use. If you needed 
		to do a lot on a per page basis, something like:</p>
		<pre class="prettyprint">jQuery.mobile.datebox.prototype.options.lang['en'].customSet = "English"; //etc...</pre>
			
		<h3><?php api('custom', 'customHead'); ?></h3>
		<p>Allows you to force the header text to whatever you specify.  Leaving it false allows datebox to work as normal, grabbing
		either the placeholder attribute, or the label text (in that order of preference).  If neither is found, it will be blank.
		Note that this option is <b>not</b> i18n aware.</p>
		<h3><?php api('custom', 'customFormat'); ?></h3>
		<p>The intended output format for the data.  At a glance, valid options are %Xa ... %Xe and %X1 ... %X6 - if numeric, it will
		output the <b>index</b> of the data, if alphabetic, it will be the actual data.  Note that re-opening the control when 
		outputting the actual data is <b>very</b> error-prone, usually resulting in the control reverting to the "default" values. When
		left 'false', datebox will build an appropriate format of just the indexes.</p>
		<h3><?php api('custom', 'customDefault'); ?></h3>
		<p>The default selection for the data.  This is an array of <b>indexes</b>.  This <b>must</b> be set, as datebox can not really
		take a reasonable guess at your data.  By default it is [0,0,0], which will choose the first data element of up to three sources.</p>
		<h3><?php api('custom', 'customData'); ?></h3>
		<p>customData takes an array of data objects, up to 6. (a/n: probably this isn't checked, but 6 can be made to display somewhat ok).  The objects must contain:
		<ul>
			<li><strong>input</strong>: Only used for customBox - show data in an input (true) or a div (false).</li>
			<li><strong>name</strong>: The header text for the field - can be blank.</li>
			<li><strong>data</strong>: A simple array of your data. Your data must be a string. Otherwise, it can be anything, including valid HTML.</li>
		</ul>
		
		<h2>Working Example</h2>
		<div class="ui-field-contain">
			<label for="headd">customHead</label>
			<input type="text" id="headd" class="demopick" data-link="cf" data-opt="customHead">
		</div>
		<div class="ui-field-contain">
			<label for="setd">overrideCustomSet</label>
			<input type="text" id="setd" class="demopick" data-link="cf" data-opt="overrideCustomSet">
		</div>
		<div class="ui-field-contain">
			<label for="setf">customFormat</label>
			<input type="text" id="setf" class="demopick" data-link="cf" data-opt="customFormat" value="%Xa">
		</div>
		<div class="ui-field-contain">
			<label for="dat">customData</label>
			<textarea id="dat" class="demopick" data-link="cf" data-opt="customData">[{
 "input": true,
 "name": "",
 "data": ["Single", "Separated", "Involved", "Married", "Widowed", "Lover", "Other"]
}]</textarea>
		</div>
				
				
		<div class="ui-field-contain">
			<label for="cf">CustomFlip</label>
			<input name="cf" type="date" data-role="datebox" id="cf" data-options='{"mode": "customflip"}' />
		</div>
		
		<h2>Sample Data</h2>
		<p>Default.  (customFormat === '%Xa')</p>
		<pre class="prettyprint">[{
 "input": true,
 "name": "",
 "data": ["Single", "Separated", "Involved", "Married", "Widowed", "Lover", "Other"]
}]</pre>
		<p>Slot Machine! (SET customFormat === '%X1,%X2,%X3' FIRST)</p>
		<pre class="prettyprint">[
 {"input": false, "name": "Wheel1", "data":[
    "&lt;img src='img/slot1.png'>","&lt;img src='img/slot2.png'>","&lt;img src='img/slot3.png'>","&lt;img src='img/slot4.png'>"
 ]},
 {"input": false, "name": "Wheel2", "data":[
    "&lt;img src='img/slot1.png'>","&lt;img src='img/slot2.png'>","&lt;img src='img/slot3.png'>","&lt;img src='img/slot4.png'>"
 ]},
 {"input": false, "name": "Wheel3", "data":[
    "&lt;img src='img/slot1.png'>","&lt;img src='img/slot2.png'>","&lt;img src='img/slot3.png'>","&lt;img src='img/slot4.png'>"
 ]}
]</pre>

	</div>
<div data-role="footer" data-position="fixed"><div data-role="controlgroup" data-mini="true" data-type="horizontal" class="ui-mini"><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/jQM-DateBox/api/">API Documentation</a><a data-role="button" data-mini="true" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a><a data-role="button" data-mini="true" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a><a data-role="button" data-mini="true" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a><a data-role="button" data-mini="true" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a><a data-role="button" data-mini="true" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a></div></div></div>


<?php
require_once('inc/func.php');
echo do_header("Excluding Dates", array('4-1-defaults.php',"Default / Start Dates"), array('4-3-include.php',"Including Dates"));
?>

<h1>Overview</h1>
<p>There are many, many ways to limit date selection in DateBox.  Rather than spend a lot of time explaining each of them, I've choosen to show groupings of similar options below, along with the links to the appropriate API documentation. Please refer to the API documentation for <em>which</em> modes are valid for each option, they are not nessisarily universal.</p>
<p>By far the simplest method of limiting dates is to use the min/max attributes of the element.  These should be set to an ISO style date string i.e. 2000-01-01</p>

<h1>Today booleans</h1>

<div class="ui-field-contain">
	<label for="cal1a"><?php api('limiting','afterToday'); ?>:</label>
	<select id="cal1a" data-link="cal1" data-opt="afterToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1b"><?php api('limiting','beforeToday'); ?>:</label>
	<select id="cal1b" data-link="cal1" data-opt="beforeToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1c"><?php api('limiting','notToday'); ?>:</label>
	<select id="cal1c" data-link="cal1" data-opt="notToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain"><input type="text" id="cal1" data-role="datebox" data-options='{"mode":"calbox"}'></div>

<h1>Numeric Date Limits</h1>

<div class="ui-field-contain">
	<label for="cal2a"><?php api('limiting','maxDays'); ?>: </label>
	<input id="cal2a" data-link="cal2" data-opt="maxDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2b"><?php api('limiting','minDays'); ?>: </label>
	<input id="cal2b" data-link="cal2" data-opt="minDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2c"><?php api('limiting','minYear'); ?>: </label>
	<input id="cal2c" data-link="cal2" data-opt="minYear" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2d"><?php api('limiting','maxYear'); ?>: </label>
	<input id="cal2d" data-link="cal2" data-opt="maxYear" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain"><input type="text" id="cal2" data-role="datebox" data-options='{"mode":"flipbox"}'></div>

<h1>Numeric Time Limits</h1>
<p>Note: valid hours is an array.  i.e. [1,2,3,4]</p>
<div class="ui-field-contain">
	<label for="cal3a"><?php api('limiting','minHour'); ?>: </label>
	<input id="cal3a" data-link="cal3" data-opt="minHour" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3b"><?php api('limiting','maxHour'); ?>: </label>
	<input id="cal3b" data-link="cal3" data-opt="maxHour" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3c"><?php api('limiting','minuteStep'); ?>: </label>
	<input id="cal3c" data-link="cal3" data-opt="minuteStep" value="1" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3d"><?php api('limiting','validHours'); ?>: </label>
	<input id="cal3d" data-link="cal3" data-opt="validHours" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain"><input type="text" id="cal3" data-role="datebox" data-options='{"mode":"timeflipbox"}'></div>

<h1>Date List Limits</h1>
<p>Note: Please view the API documentation for each option to understand the required data format.</p>
<div class="ui-field-contain">
	<label for="cal4a"><?php api('limiting','blackDays'); ?>: </label>
	<input id="cal4a" data-link="cal4" data-opt="blackDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4b"><?php api('limiting','blackDates'); ?>: </label>
	<input id="cal4b" data-link="cal4" data-opt="blackDates" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4c"><?php api('limiting','blackDatesRec'); ?>: </label>
	<input id="cal4c" data-link="cal4" data-opt="blackDatesRec" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4d"><?php api('limiting','enableDates'); ?>: </label>
	<input id="cal4d" data-link="cal4" data-opt="enableDates" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4e"><?php api('limiting','whiteDates'); ?>:</label>
	<input id="cal4e" data-link="cal4" data-opt="whiteDates" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain"><input type="text" id="cal4" data-role="datebox" data-options='{"mode":"calbox"}'></div>


<?php
echo do_footer();
?>

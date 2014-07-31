<?php
require_once('inc/func.php');
echo do_header("Including Dates", array('4-2-limit.php',"Excluding Dates"), array('5-control.php',"UI Controls"));
?>

<h1>Overview</h1>
<p>Including dates is done by a series of highlighting tools - it does not so much include those dates, as it visually distiguishes them</p>


<h1>Date List Highlights</h1>
<p>Note: Please view the API documentation for each option to understand the required data format.</p>
<div class="ui-field-contain">
	<label for="cal4a"><?php api('limiting','highDays'); ?>: </label>
	<input id="cal4a" data-link="cal4" data-opt="highDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4b"><?php api('limiting','highDates'); ?>: </label>
	<input id="cal4b" data-link="cal4" data-opt="highDates" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4c"><?php api('limiting','highDatesAlt'); ?>: </label>
	<input id="cal4c" data-link="cal4" data-opt="highDatesAlt" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal4d"><?php api('limiting','highDatesRec'); ?>: </label>
	<input id="cal4d" data-link="cal4" data-opt="highDatesRec" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain"><input type="text" id="cal4" data-role="datebox" data-options='{"mode":"calbox", "themeDateHighAlt":"c", "themeDateHighRec":"d"}'></div>


<h1>Date Jump-To List</h1>
<p>Note: there is no default list for this option - you must supply one.</p>
<div class="ui-field-contain">
	<label for="cal1a"><?php api('limiting','calShowDateList'); ?>:</label>
	<select id="cal1a" data-link="cal1" data-opt="calShowDateList" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1d"><?php api('limiting','calDateList'); ?>: </label>
	<input id="cal1d" data-link="cal1" data-opt="calDateList" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain"><input type="text" id="cal1" data-role="datebox" data-options='{"mode":"calbox"}'></div>



<?php
echo do_footer();
?>

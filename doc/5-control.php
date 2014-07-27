<?php
require_once('inc/func.php');
echo do_header("UI Controls", array('4-3-include.php',"Including Dates"), array('6-prog.php',"Extending Datebox"));
?>
<h1>UI Controls</h1>
<p>This section deals with options that change how the UI looks, feels, and acts. Although it was mentioned before briefly, <?php api('control','useImmediate'); ?> really fits into this section better.</p>

<h1>Buttons and Headers</h1>
<p>There is also <?php api('control','useHeader'); ?>, which is not applicable in the "inline" context, so it is not shown here.</p>

<div class="ui-field-contain">
	<label for="cal1b"><?php api('control','useSetButton'); ?>:</label>
	<select id="cal1b" data-link="cal1" data-opt="useSetButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1c"><?php api('control','useClearButton'); ?>:</label>
	<select id="cal1c" data-link="cal1" data-opt="useClearButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1d"><?php api('control','useCollapsedBut'); ?>:</label>
	<select id="cal1d" data-link="cal1" data-opt="useCollapsedBut" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain"><input type="text" id="cal1" data-role="datebox" data-options='{"mode":"datebox"}'></div>

<h1>CalBox Specific - Display</h1>
<p>This group of options deals with the extra information displayed on the calendar.</p>
<div class="ui-field-contain">
	<label for="cal2a"><?php api('control','calShowDays'); ?>:</label>
	<select id="cal2a" data-link="cal2" data-opt="calShowDays" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2b"><?php api('control','calShowWeek'); ?>:</label>
	<select id="cal2b" data-link="cal2" data-opt="calShowWeek" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2c"><?php api('control','calOnlyMonth'); ?>:</label>
	<select id="cal2c" data-link="cal2" data-opt="calOnlyMonth" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2d"><?php api('themes','calHighToday'); ?>:</label>
	<select id="cal2d" data-link="cal2" data-opt="calHighToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2e"><?php api('themes','calHighPick'); ?>:</label>
	<select id="cal2e" data-link="cal2" data-opt="calHighPick" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2f"><?php api('themes','calWeekHigh'); ?>:</label>
	<select id="cal2f" data-link="cal2" data-opt="calWeekHigh" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2g"><?php api('themes','calControlGroup'); ?>:</label>
	<select id="cal2g" data-link="cal2" data-opt="calControlGroup" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain"><input type="text" id="cal2" data-role="datebox" data-options='{"mode":"calbox"}'></div>

<h1>CalBox Specific - Control</h1>
<p>These options deal with how dates are selected in calbox</p>
<div class="ui-field-contain">
	<label for="cal3a"><?php api('control','useTodayButton'); ?>:</label>
	<select id="cal3a" data-link="cal3" data-opt="useTodayButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3b"><?php api('control','calWeekMode'); ?>:</label>
	<select id="cal3b" data-link="cal3" data-opt="calWeekMode" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3c"><?php api('control','calWeekModeDay'); ?>:</label>
	<input id="cal3c" data-link="cal3" data-opt="calWeekModeDay" type="text" value="1" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3d"><?php api('themes','calUsePickers'); ?>:</label>
	<select id="cal3d" data-link="cal3" data-opt="calUsePickers" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3e"><?php api('themes','calYearPickMin'); ?>:</label>
	<input id="cal3e" data-link="cal3" data-opt="calYearPickMin" type="text" value="-6" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3f"><?php api('themes','calYearPickMax'); ?>:</label>
	<input id="cal3f" data-link="cal3" data-opt="calYearPickMax" type="text" value="6" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3g"><?php api('themes','calNoHeader'); ?>:</label>
	<select id="cal3g" data-link="cal3" data-opt="calNoHeader" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain"><input type="text" id="cal3" data-role="datebox" data-options='{"mode":"calbox"}'></div>

<?php
echo do_footer();
?>

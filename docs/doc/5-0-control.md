---
title: UI Controls
pagenum: 14
layout: doc
---

# UI Controls
This section deals with options that change how the UI looks, feels, and 
acts. Although it was mentioned before briefly, {% api_doc useImmediate %}
really fits into this section better.

# Buttons and Headers

There is also {% api_doc useHeader %}, which is not applicable in the 
"inline" context, so it is not shown here. {% api_doc useCollapsedBut %} does
not behave well dynamicly, so it is also not shown here.

<div class="ui-field-contain">
	<label for="cal1b">{% api_doc useSetButton %}</label>
	<select id="cal1b" data-link="cal1" data-opt="useSetButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1c">{% api_doc useClearButton %}</label>
	<select id="cal1c" data-link="cal1" data-opt="useClearButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1">Buttons</label>
	<input type="text" id="cal1" data-role="datebox" data-options='{"mode":"datebox", "useInline":true, "hideInput":true}'>
</div>

# CalBox Specific - Display

This group of options deals with the extra information displayed on the 
calendar. Perhaps the most useful of these, although it is not shown here (very hard to demo), is
{% api_doc calFormatter %}.

<div class="ui-field-contain">
	<label for="cal2a">{% api_doc calShowDays %}</label>
	<select id="cal2a" data-link="cal2" data-opt="calShowDays" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2b">{% api_doc calShowWeek %}</label>
	<select id="cal2b" data-link="cal2" data-opt="calShowWeek" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2c">{% api_doc calOnlyMonth %}</label>
	<select id="cal2c" data-link="cal2" data-opt="calOnlyMonth" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2d">{% api_doc calHighToday %}</label>
	<select id="cal2d" data-link="cal2" data-opt="calHighToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2e">{% api_doc calHighPick %}</label>
	<select id="cal2e" data-link="cal2" data-opt="calHighPick" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true" selected="selected">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2g">{% api_doc calControlGroup %}</label>
	<select id="cal2g" data-link="cal2" data-opt="calControlGroup" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal2">CalBox</label>
	<input type="text" id="cal2" data-role="datebox" data-options='{"mode":"calbox", "useInline":true, "hideInput":true}'>
</div>

# CalBox Specific - Control

These options deal with how dates are selected in calbox

<div class="ui-field-contain">
	<label for="cal3a">{% api_doc useTodayButton %}</label>
	<select id="cal3a" data-link="cal3" data-opt="useTodayButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3h">{% api_doc useTomorrowButton %}</label>
	<select id="cal3h" data-link="cal3" data-opt="useTomorrowButton" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3b">{% api_doc calWeekMode %}</label>
	<select id="cal3b" data-link="cal3" data-opt="calWeekMode" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3c">{% api_doc calWeekModeDay %}</label>
	<input id="cal3c" data-link="cal3" data-opt="calWeekModeDay" type="text" value="1" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3d">{% api_doc calUsePickers %}</label>
	<select id="cal3d" data-link="cal3" data-opt="calUsePickers" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3e">{% api_doc calYearPickMin %}</label>
	<input id="cal3e" data-link="cal3" data-opt="calYearPickMin" type="text" value="-6" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3f">{% api_doc calYearPickMax %}</label>
	<input id="cal3f" data-link="cal3" data-opt="calYearPickMax" type="text" value="6" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3g">{% api_doc calNoHeader %}</label>
	<select id="cal3g" data-link="cal3" data-opt="calNoHeader" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal3">CalBox</label>
	<input type="text" id="cal3" data-role="datebox" data-options='{"mode":"calbox", "useInline": true, "hideInput":true }'>
</div>

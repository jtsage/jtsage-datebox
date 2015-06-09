---
title: Excluding Dates
pagenum: 12
layout: doc
---

# Overview

There are many, many ways to limit date selection in DateBox.  Rather than spend
a lot of time explaining each of them, I've choosen to show groupings of similar
options below, along with the links to the appropriate API documentation. Please
refer to the API documentation for <em>which</em> modes are valid for each option
they are not nessisarily universal.

By far the simplest method of limiting dates is to use the min/max attributes of
the element.  These should be set to an ISO style date string i.e. 2000-01-01

# Today booleans

These are *exclusive* switches - so afterToday means "selected date must be *after* today's date (or on it)", beforeToday means "selected date must be *before* today's date (or on it)",
notToday means "slected date can not be today's date"


<div class="ui-field-contain">
	<label for="cal1a">{% api_doc afterToday %}</label>
	<select id="cal1a" data-link="cal1" data-opt="afterToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1b">{% api_doc beforeToday %}</label>
	<select id="cal1b" data-link="cal1" data-opt="beforeToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1c">{% api_doc notToday %}</label>
	<select id="cal1c" data-link="cal1" data-opt="notToday" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="ui-field-contain">
	<label for="cal1">Today's</label>
	<input type="text" id="cal1" data-role="datebox" data-options='{"mode":"calbox", "hideInput":true, "useInline": true}'>
</div>

# Numeric Date Limits

<div class="ui-field-contain">
	<label for="cal2a">{% api_doc maxDays %}</label>
	<input id="cal2a" data-link="cal2" data-opt="maxDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2b">{% api_doc minDays %}</label>
	<input id="cal2b" data-link="cal2" data-opt="minDays" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2c">{% api_doc minYear %}</label>
	<input id="cal2c" data-link="cal2" data-opt="minYear" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2d">{% api_doc maxYear %}</label>
	<input id="cal2d" data-link="cal2" data-opt="maxYear" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal2">Date Numbers</label>
	<input type="text" id="cal2" data-role="datebox" data-options='{"mode":"flipbox", "hideInput": true, "useInline": true}'>
</div>

# Numeric Time Limits

Note: valid hours is an array.  i.e. [1,2,3,4]

<div class="ui-field-contain">
	<label for="cal3a">{% api_doc minHour %}</label>
	<input id="cal3a" data-link="cal3" data-opt="minHour" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3b">{% api_doc maxHour %}</label>
	<input id="cal3b" data-link="cal3" data-opt="maxHour" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3e">{% api_doc minTime %}</label>
	<input id="cal3e" data-link="cal3" data-opt="minTime" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3f">{% api_doc maxTime %}</label>
	<input id="cal3f" data-link="cal3" data-opt="maxTime" value="false" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3c">{% api_doc minuteStep %}</label>
	<input id="cal3c" data-link="cal3" data-opt="minuteStep" value="1" type="text" class="demopick">
</div>
<div class="ui-field-contain">
	<label for="cal3d">{% api_doc validHours %}</label>
	<input id="cal3d" data-link="cal3" data-opt="validHours" value="false" type="text" class="demopick" placeholder="[9,10,11,12,13,14,15,16] / false">
</div>
<div class="ui-field-contain">
	<label for="cal3">Time Numbers</label>
	<input type="text" id="cal3" data-role="datebox" data-options='{"mode":"timeflipbox", "hideInput":true, "useInline":true}'>
</div>

# Date List Limits

Note: Please view the API documentation for each option to understand the required data format.

<div class="ui-field-contain">
	<label for="cal4a">{% api_doc blackDays %}</label>
	<input id="cal4a" data-link="cal4" data-opt="blackDays" value="false" type="text" class="demopick" placeholder='[0,6] / false'>
</div>
<div class="ui-field-contain">
	<label for="cal4b">{% api_doc blackDates %}</label>
	<input id="cal4b" data-link="cal4" data-opt="blackDates" value="false" type="text" class="demopick" placeholder='["2001-01-01", "2000-12-31"] / false'>
</div>
<div class="ui-field-contain">
	<label for="cal4c">{% api_doc blackDatesRec %}</label>
	<input id="cal4c" data-link="cal4" data-opt="blackDatesRec" value="false" type="text" class="demopick" placeholder='[[-1,11,25],[-1,0,1]] / false'>
</div>
<div class="ui-field-contain">
	<label for="cal4d">{% api_doc enableDates %}</label>
	<input id="cal4d" data-link="cal4" data-opt="enableDates" value="false" type="text" class="demopick" placeholder='["2001-01-01", "2000-12-31"] / false'>
</div>
<div class="ui-field-contain">
	<label for="cal4e">{% api_doc whiteDates %}</label>
	<input id="cal4e" data-link="cal4" data-opt="whiteDates" value="false" type="text" class="demopick" placeholder='["2001-01-01", "2001-12-25"] / false'>
</div>
<div class="ui-field-contain">
	<label for="cal4">Lists</label>
	<input type="text" id="cal4" data-role="datebox" data-options='{"mode":"calbox", "hideInput":true, "useInline":true}'>
</div>

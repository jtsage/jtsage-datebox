---
title: DateBox
layout: demoboot
pagenum: not0
---



<div class="row">
<div class="col-sm-8">

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc afterToday %}</label></div>
	<div class="col-xs-10">
		<select class="form-control demopick" data-link="db" data-opt="afterToday">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates after "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc beforeToday %}</label></div>
	<div class="col-xs-10">
		<select class="form-control demopick" data-link="db" data-opt="beforeToday">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates before "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc blackDates %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="blackDates">
		<span class="help-block">ISO Style Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc blackDatesRec %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="blackDatesRec">
		<span class="help-block">Recurring Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc blackDays %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="blackDays">
		<span class="help-block">Days of the week to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc maxDays %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="maxDays">
		<span class="help-block">Maximum number of days forward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc maxYear %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="maxYear">
		<span class="help-block">Maximum year to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc minDays %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="minDays">
		<span class="help-block">Maximum number of days backward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc minYear %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="minYear">
		<span class="help-block">Minimum year to allow</span>
	</div>
</div>


<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc rolloverMode %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="rolloverMode" value='{ "m": true, "d": true, "h": true, "i": true, "s": true }'>
		<span class="help-block">Control how the DateBox "rolls over"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-2"><label>{% api_doc themeButton %}</label></div>
	<div class="col-xs-10">
		<input class="form-control demopick" data-link="db" data-opt="themeButton" value='default'>
		<span class="help-block">Theme for the +/- Buttons</span>
	</div>
</div>

<!--
themeCancelButton
themeClearButton
themeInput
themeSetButton
themeTodayButton
themeTomorrowButton
useClearButton
useCollapsedBut
useLang
useSetButton
useTodayButton
useTomorrowButton
whiteDates
-->



</div>
<div class="col-sm-4" style="position:fixed; right:0;">

<div class="form-group">
<label for="db">DateBox</label>
<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"datebox","useInline":true,"useInlineAlign":"center"}'>
</div>
</div>
---
title: SlideBox
layout: demojqueryui
pagenum: not0
---



<div class="row">
<div class="col-sm-8">

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc afterToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="afterToday" value='false'>
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates after "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc beforeToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="beforeToday" value='false'>
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates before "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDates" value='false'>
		<span class="help-block">ISO Style Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDatesRec %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDatesRec" value='false'>
		<span class="help-block">Recurring Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDays" value='false'>
		<span class="help-block">Days of the week to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label><small>override</small>{% api_doc dateFormat %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideDateFormat" value=''>
		<span class="help-block">The format the control returns to the input</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxDays" value='false'>
		<span class="help-block">Maximum number of days forward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxYear %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxYear" value='false'>
		<span class="help-block">Maximum year to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minDays" value='false'>
		<span class="help-block">Maximum number of days backward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minYear %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minYear" value='false'>
		<span class="help-block">Minimum year to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minuteStep %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minuteStep" value='1'>
		<span class="help-block">Minutes will increment by this value</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minuteStepRound %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minuteStepRound" value='0'>
		<span class="help-block">When stepping, minutes will be forced to round in this direction</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label><small>override</small>{% api_doc slideFieldOrder %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideSlideFieldOrder" value='["y","m","d"]'>
		<span class="help-block">The order of the input elements</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDate %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDate" value='default'>
		<span class="help-block">Theme for the non-selected Date Buttons</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDatePick %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDatePick" value='success'>
		<span class="help-block">Theme for the selected Date Buttons</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeCancelButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeCancelButton" value='default'>
		<span class="help-block">Theme for the "cancel" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeClearButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeClearButton" value='default'>
		<span class="help-block">Theme for the "clear" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeInput %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeInput" value=''>
		<span class="help-block">Theme for the "clear" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeSetButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeSetButton" value='default'>
		<span class="help-block">Theme for the "set" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeTodayButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeTodayButton" value='default'>
		<span class="help-block">Theme for the "jump to today" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeTomorrowButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeTomorrowButton" value='default'>
		<span class="help-block">Theme for the "jump to tomorrow" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useCancelButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useCancelButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "clear input" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useClearButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useClearButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "clear input" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useCollapsedBut %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useCollapsedBut">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Attempt to show all buttons on one line</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useLang %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="useLang" value='en'>
		<span class="help-block">ISO Language code to use.</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useSetButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useSetButton">
			<option value="false">False</option>
			<option value="true" selected="selected">True</option>
		</select>
		<span class="help-block">Show the "set" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useTodayButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useTodayButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "jump to today" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useTomorrowButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useTomorrowButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "jump to tomorrow" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc whiteDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="whiteDates" value='false'>
		<span class="help-block">ISO Style Dates to re-allow</span>
	</div>
</div>


</div>
<div class="col-sm-4" style="position:fixed; right:0; top:90px;">

<div class="form-group">
<label for="db">SlideBox</label>
<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"slidebox","useInline":true,"useInlineAlign":"center"}'>
</div>
</div>
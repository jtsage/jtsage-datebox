---
title: TimeBox
layout: demoboot4
pagenum: not0
---



<div class="row">
<div class="col-sm-8">

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxHour %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxHour" value='false'>
		<span class="help-block">Only allow hours before this to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxTime %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxTime" value='false'>
		<span class="help-block">Only allow times before this to be selected (24hr)</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minHour %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minHour" value='false'>
		<span class="help-block">Only allow hours after this to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minTime %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minTime" value='false'>
		<span class="help-block">Only allow times after this to be selected (24hr)</span>
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
	<div class="col-xs-3"><label>{% api_doc rolloverMode %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="rolloverMode" value='{ "m": true, "d": true, "h": true, "i": true, "s": true }'>
		<span class="help-block">Control how the DateBox "rolls over"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeButton" value='default'>
		<span class="help-block">Theme for the +/- Buttons</span>
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
	<div class="col-xs-3"><label><small>override</small>{% api_doc timeFormat %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideTimeFormat" value=''>
		<span class="help-block">Input the time in either 12 or 24 hour mode</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label><small>override</small>{% api_doc timeOutput %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideTimeOutput" value=''>
		<span class="help-block">The format the control returns to the input</span>
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
	<div class="col-xs-3"><label>{% api_doc validHours %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="validHours" value='false'>
		<span class="help-block">Array of valid hours to select (24hr)</span>
	</div>
</div>


</div>
<div class="col-sm-4" style="position:fixed; right:0;">

<div class="form-group">
<label for="db">TimeBox</label>
<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"timebox","useInline":true,"useInlineAlign":"center"}'>
</div>
</div>

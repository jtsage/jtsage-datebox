---
title: DurationBox
layout: demoboot
pagenum: not0
---



<div class="row">
<div class="col-sm-8">

<div class="form-group row">
	<div class="col-xs-3"><label><small>override</small>{% api_doc durationFormat %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideDurationFormat" value=''>
		<span class="help-block">Format for the control to return to the input</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc durationStep %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="durationStep" value='1'>
		<span class="help-block">Stepper for the least precise duration unit</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxDur %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxDur" value='false'>
		<span class="help-block">Maximum amount of duration allowed, in seconds</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minDur %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minDur" value='false'>
		<span class="help-block">Minimum amount of duration allowed, in seconds</span>
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



</div>
<div class="col-sm-4" style="position:fixed; right:0;">

<div class="form-group">
<label for="db">DurationBox</label>
<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"durationbox","useInline":true,"useInlineAlign":"center"}'>
</div>
</div>
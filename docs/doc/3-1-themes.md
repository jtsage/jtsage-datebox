---
title: Theming DateBox
pagenum: 4
layout: doc
---

# Theming DateBox - Overview

An overall theme of DateBox is easy - just specify it like any other element. For jQueryMobile
DateBox will do it's best to inherit it's theme from it's parent(s) if you
don't specify, finally falling back on 'a'.

For bootstrap and jQueryUI things work a bit differently - you'll need to specify themes directly for those 
elements you wish to change.

An important thing to note is that the theme "names" are a part of a class name.  For instance, in
bootstrap mode, most themes are set to "primary" - for buttons, this results in the class "btn-primary" being added.  There is no limitation to the string length, so you could certainly add 
additional arbitrary classes.  In the example below, the {% api_doc themeDate %} option has been set
to "warning annoying-blink".

There are 3 really, really awful themes included in the jQueryUI css file to show how to be specific enough for your theme to apply.

<style type="text/css">
	@keyframes blink {  
		0% { opacity: 1.0; }
		50% { opacity: 0.5; }
		100% { opacity: 1.0; }
	}
	@-webkit-keyframes blink {
		0% { opacity: 1.0; }
		50% { opacity: 0.5; }
		100% { opacity: 1.0; }
	}
	.annoying-blink {
		animation: blink 1s step-start 0s infinite;
		-webkit-animation: blink 1s step-start 0s infinite;
	}
</style>

{% highlight html %}
<input type="text" data-role="datebox" data-datebox-theme-date="warning annoying-blink" data-datebox-mode="calbox">
{% endhighlight %}

<div class="form-group">
	<label for="in1">An Ugly DateBox</label>
	<input id="in1" type="text" class="form-control" data-role="datebox" data-datebox-theme-date="warning annoying-blink" data-options='{"mode":"calbox", "useInlineAlign": "center", "useInline":true}'>
</div>

The results from this are pretty hideous - but, DateBox provides a method
in which to theme individual elements of each control, for the look you want.

## Shared Themes

These themes tend to appear, based on configuration in all of the display modes.

 - {% api_doc themeClearButton %} : Theme for clear input button
 - {% api_doc themeTodayButton %} : Theme for "Jump to Today" button
 - {% api_doc themeTomorrowButton %} : Theme for "Jump to Tomorrow" button
 - {% api_doc themeCancelButton %} : Theme for cancel button
 - {% api_doc themeSetButton %} : Theme for set button


## Theming CalBox

CalBox has the largest number of theme configuration options, as the date limiting options are most
useful with this display mode.

 - {% api_doc themeDate %} : Theme for otherwise un-specified date buttons
 - {% api_doc themeDateToday %} : Theme for "today"
 - {% api_doc themeDatePick %} : Theme for chosen date (used last after other options fail)
 - {% api_doc themeDayHigh %} : Theme for highlighted DAYS
 - {% api_doc themeDateHigh %} : Theme for highlighted DATES
 - {% api_doc themeDateHighAlt %} : Theme for highlighted ALTERNATE DATES
 - {% api_doc themeDateHighRec %} : Theme for highlighted RECURRING DATES
		
<div class="form-group">
	<label for="cal1dateb">themeDate</label>
	<select id="cal1dateb" class="form-control demopick" data-link="cal1" data-opt="themeDate">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>
<div class="form-group">
	<label for="cal1datec">themeDatePick</label>
	<select id="cal1datec" class="form-control demopick" data-link="cal1" data-opt="themeDatePick">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success" selected="selected">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>
<div class="form-group">
	<label for="cal1dated">themeDateToday</label>
	<select id="cal1dated" class="form-control demopick" data-link="cal1" data-opt="themeDateToday">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info" selected="selected">info</option>
		<option value="success">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>

<div class="form-group">
	<label for="cal1">A CalBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"calbox", "hideInput": true, "useInline":true, "useInlineAlign": "center"}' id="cal1">
</div>

## Theming DateBox/TimeBox/DurationBox

DateBox, TimeBox, and DurationBox have a small number of theme options. 
	
 - {% api_doc themeButton %} : Theme for +/- buttons
 - {% api_doc themeInput %} : Theme for text inputs

		
<div class="form-group">
	<label for="db1a">themeButton</label>
	<select id="db1a" class="form-control demopick" data-link="db1" data-opt="themeButton">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
	</div>
<div class="form-group">
	<label for="db1b">themeInput</label>
	<select id="db1b" class="form-control demopick" data-link="db1" data-opt="themeInput">
		<option value="">(empty) [default]</option>
		<option value="has-success">has-success</option>
		<option value="has-warning">has-warning</option>
		<option value="has-error">has-error</option>
	</select>
</div>

<div class="ui-field-contain">
	<label for="db1">A DateBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"datebox","hideInput":true,"useInline":true,"useInlineAlign":"center"}' id="db1">
</div>

# Theming FlipBox/TimeFlipBox/DurationFlipBox

FlipBox, TimeFlipBox and DurationFlipBox likewise have a small number of theme options.
	
 - {% api_doc themeDate %} : Theme for default dates
 - {% api_doc themeDatePick %} : Theme for chosen date


<div class="form-group">
	<label for="fb1a">themeDate</label>
	<select id="fb1a" class="form-control demopick" data-link="fb1" data-opt="themeDate">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>
<div class="form-group">
	<label for="fb1b">themeDatePick</label>
	<select id="fb1b" class="form-control demopick" data-link="fb1" data-opt="themeDatePick">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success" selected="selected">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>

<div class="ui-field-contain">
	<label for="fb1">A FlipBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"flipbox","hideInput":true,"useInline":true,"useInlineAlign":"center"}' id="fb1">
</div>

# Theming SlideBox
SlideBox too has a small number of theme options.
	
 - {% api_doc themeDate %} : Theme for default dates
 - {% api_doc themeDatePick %} : Theme for chosen date


<div class="form-group">
	<label for="sb1a">themeDate</label>
	<select id="sb1a" class="form-control demopick" data-link="sb1" data-opt="themeDate">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>
<div class="form-group">
	<label for="sb1b">themeDatePick</label>
	<select id="sb1b" class="form-control demopick" data-link="sb1" data-opt="themeDatePick">
		<option value="default">default</option>
		<option value="primary">primary</option>
		<option value="info">info</option>
		<option value="success" selected="selected">success</option>
		<option value="warning">warning</option>
		<option value="danger">danger</option>
	</select>
</div>

<div class="ui-field-contain">
	<label for="sb1">A SlideBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"slidebox", "hideInput":true, "useInline": true, "useInlineAlign":"center"}' id="sb1">
</div>


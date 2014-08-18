---
title: Themeing Datebox
pagenum: 4
layout: doc
---

# Themeing Datebox - Overview

An overall theme of datebox is easy - just specify it like any other element.  Of
course, datebox will do it's best to inherit it's theme from it's parent(s) if you
don't specify, finally falling back on 'a' if none is specified anywhere.

{% highlight html %}
<input type="text" data-role="datebox" data-theme="c" data-options='{"mode":"calbox"}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="in1">An Ugly DateBox</label>
	<input type="text" data-role="datebox" data-theme="c" data-options='{"mode":"calbox", "useInline":true}'>
</div>

The results from this are usually pretty hideous - so, DateBox provides a method
in which the theme individual elements of each control, for the look you want (jQM
really doesn't provide enough variations in a single theme for quick reading of compex
data).  This method is used for the basic bits of each control - background, set
button, etc.

# Themeing CalBox
CalBox has a number of theme options that can be added to the "data-options" attribute - they are:

 - {% api_doc themeDate %} : Theme for otherwise un-specified date buttons
 - {% api_doc themeDateToday %} : Theme for "today"
 - {% api_doc themeDatePick %} : Theme for choosen date (used last after other options fail)
 - {% api_doc themeDayHigh %} : Theme for highlighted DAYS
 - {% api_doc themeDateHigh %} : Theme for highlighted DATES
 - {% api_doc themeDateHighAlt %} : Theme for highlighted ALTERNATE DATES
 - {% api_doc themeDateHighRec %} : Theme for highlighted RECURRING DATES
		
<div class="ui-field-contain"><label for="cal1dateb">themeDate</label><select name="cal1dateb" class="demopick" data-link="cal1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="cal1datec">themeDatePick</label><select name="cal1datec" class="demopick" data-link="cal1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="cal1dated">themeDateToday</label><select name="cal1dated" class="demopick" data-link="cal1" data-opt="themeDateToday"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div class="ui-field-contain">
	<label for="cal1">A CalBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"calbox", "hideInput": true, "useInline":true}' id="cal1">
</div>

# Themeing DateBox/TimeBox/DurationBox

DateBox/TimeBox/DurationBox have a number of theme options that can be added to the
"data-options" attribute, - they are:
	
 - {% api_doc themeButton %} : Theme for +/- buttons
 - {% api_doc themeInput %} : Theme for text inputs
		
<div class="ui-field-contain"><label for="db1a">themeButton</label><select name="db1a" class="demopick" data-link="db1" data-opt="themeButton"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="db1b">themeInput</label><select name="db1b" class="demopick" data-link="db1" data-opt="themeInput"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div class="ui-field-contain">
	<label for="db1">A DateBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"datebox","hideInput":true,"useInline":true}' id="db1">
</div>

# Themeing FlipBox/TimeFlipBox

FlipBox/TimeFlipBox have a number of theme options that can be added to the "data
options" attribute, - they are:
	
 - {% api_doc themeDate %} : Theme for default dates
 - {% api_doc themeDatePick %} : Theme for choosen date
		
<div class="ui-field-contain"><label for="fb1a">themeDate</label><select name="fb1a" class="demopick" data-link="fb1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="fb1b">themeDatePick</label><select name="fb1b" class="demopick" data-link="fb1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>


<div class="ui-field-contain">
	<label for="fb1">A FlipBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"flipbox","hideInput":true,"useInline":true}' id="fb1">
</div>

# Themeing SlideBox
SlideBox have a number of theme options that can be added to the "data-options" attribute - they are:
	
 - {% api_doc themeDate %} : Theme for default dates
 - {% api_doc themeDatePick %} : Theme for choosen date
		
<div class="ui-field-contain"><label for="sb1a">themeDate</label><select name="sb1a" class="demopick" data-link="sb1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="sb1b">themeDatePick</label><select name="sb1b" class="demopick" data-link="sb1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div class="ui-field-contain">
	<label for="sb1">A SlideBox</label>
	<input type="text" data-role="datebox" data-options='{"mode":"slidebox", "hideInput":true, "useInline": true}' id="sb1">
</div>


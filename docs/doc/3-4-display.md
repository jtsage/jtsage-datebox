---
title: Display Modes
pagenum: 7
layout: doc
---

# Display Modes
This page will give you an overview of the available display modes.  Please take
a look at the next page as well, as all of these modes have  quite a number of small
associated options.

## DateBox Popup - Default
Given no other options, datebox will default to using it's a popup method - it relies on the native
jQM popups, so it is reasonable efficient, and it does not suffer from old DateBox bugs - namely, 
jQM core takes care of positioning, repositioning, click-behind detection, etc.  This example is 
shown with {% api_doc useFocus %} enabled.
	
<div class="ui-field-contain">
	<label for="ex1">A CalBox</label>
	<input id="ex1" type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true}'>
</div>

## Inline and Inline-Blind
Sometimes (such as in these documents), it is preferable to have the control simply
appear inline with the rest of the form.  To show the control inline, with no hiding
set {% api_doc useInline %}.  Note that you will want to include the control in a "ui-field-contain"
for optimal results.  On the next few pages we will look at the fun things you can do with original 
input element.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":true}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="in1">Inline CalBox</label>
	<input id="in1" type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline": true}'>
</div>

Or, you might want DateBox to mimic the behavior of jQuery-UI - that is, to slide
down the control when you click the input.  To do this, set {% api_doc useInlineBlind %}.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true}'>
{% endhighlight %}

<div class="ui-field-contain">
	<label for="in2">InlineBlind CalBox</label>
	<input type="text" id="in2" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true, "useFocus":true}'>
</div>

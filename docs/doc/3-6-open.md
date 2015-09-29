---
title: Open Methods
pagenum: 9
layout: doc
---

# Original Input

If for some reason you wish you end-user to be able to directly enter a date in the
input, set {% api_doc lockInput %} false.

# Input Styles

There are a number of input styles, which I will demonstrate below.

<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
Default Display
</h3></div><div class="panel-body">

<p>Note that the button may not display correctly if the input does not have a named ID</p>

<div class="form-group"><input id="cal1" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox","useNewStyle":false}'></div>
</div></div>

<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
{% api_doc useButton %} false with {% api_doc useFocus %}
</h3></div><div class="panel-body">

<p>Setting 'useButton' off will prevent the button decoration (but will currently add a preceding decoration in bootstrap mode).</p>

<div class="form-group"><input id="cal2" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox","useFocus":true,"useButton":false}'></div>
</div></div>


<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
{% api_doc buttonIcon %} 
</h3></div><div class="panel-body">

Setting 'buttonIcon' to a different class will result in a different button ("cog" shown).

<div class="form-group"><input type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox","useFocus":true,"buttonIcon":"cog"}'></div>
</div></div>


<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
{% api_doc hideContainer %} and opening with a link or button
</h3></div><div class="panel-body">

<div class="form-group">
<label for="cal3">Hidden CalBox!</label>
<input id="cal3" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox","popupPosition":"window","hideContainer":true}'>
</div>

<p>Note, that if you use {% api_doc hideContainer %}, {% api_doc popupPosition %} = "window" is pretty much required for jQM.</p>

<p>Also note that {% api_doc hideContainer %} can be used with {% api_doc useInline %} - it just sits on the left edge of the screen and styling it is up to you.</p>

<p><strong>This feature is currently broken for bootstrap.</strong></p>

<a href="javascript:$('#cal3').datebox('open');" data-role="button">Open Datebox</a>

{% highlight html %}
<a href="javascript:$(input).datebox('open');" data-role="button">Open Datebox</a>
{% endhighlight %}
</div></div>


<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
{% api_doc hideInput %} and {% api_doc useInline %}
</h3></div><div class="panel-body">

<p>DateBox can be displayed right inline with other controls very prettily by combining these two options.</p>

<p>If you are not using CalBox in this manner, you might need to investigate {% api_doc useImmediate %} to 
make sure that when your user sets a date, that is really what gets sent to the server - particularly 
if it is in a simple form control.</p>

<div class="form-group">
	<label for="cal4">No Input Box</label>
	<input id="cal4" class="form-control" type="text" data-role="datebox" data-options='{"mode":"calbox","useInlineAlign":"center","useInline":true,"hideInput":true}'>
</div>
</div></div>

# Fine-Tuning Input styling

<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">
{% api_doc usePlaceholder %}
</h3></div><div class="panel-body">

<p>When 'usePlaceholder' is true, it will grab the label of the element and set it as
the placeholder. If it is a string, it will use that instead.  You may have also
noticed that DateBox always tries to use the label as it's header text, when appropriate.</p>

<div class="form-group"><label for="cal5">Date Of Birth</label><input id="cal5" class="form-control"
type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"usePlaceholder":true}'></div>


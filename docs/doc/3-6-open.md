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

### Default Display

Note that the button may not display correctly if the input does not have a named ID

<div class="ui-field-contain"><input id="cal1" type="text" data-role="datebox" data-options='{"mode":"calbox","useNewStyle":false}'></div>


### {% api_doc useButton %} false with {% api_doc useFocus %}

Setting 'useButton' off will prevent the button decoration

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useFocus":true,"useButton":false}'></div>

### {% api_doc buttonIcon %} 

Setting 'buttonIcon' to a different class will result in a different button

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useFocus":true,"buttonIcon":"grid"}'></div>


### {% api_doc hideContainer %} and opening with a link or button

<div class="ui-field-contain">
	<label for="cal2">Hidden CalBox!</label>
	<input id="cal2" type="text" data-role="datebox" data-options='{"mode":"calbox","popupPosition":"window","hideContainer":true}'>
</div>

Note, that if you use {% api_doc hideContainer %}, {% api_doc popupPosition %} = "window" is pretty much required.

Also note that {% api_doc hideContainer %} can be used with {% api_doc useInline %} - it just sits on the left edge of the screen and styling it is up to you.

<a href="javascript:$('#cal2').datebox('open');" data-role="button">Open Datebox</a>

{% highlight html %}
<a href="javascript:$(input).datebox('open');" data-role="button">Open Datebox</a>
{% endhighlight %}

### {% api_doc hideInput %} and {% api_doc useInline %}

DateBox can be displayed right inline with other controls very prettily by combining these two options.

If you are not using CalBox in this manner, you might need to investigate {% api_doc useImmediate %} to 
make sure that when your user sets a date, that is really what gets sent to the server - particularly 
if it is in a simple form control.

<div class="ui-field-contain">
	<label for="cal4">No Input Box</label>
	<input id="cal4" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":true,"hideInput":true}'>
</div>

# Fine-Tuning Input styling

### {% api_doc usePlaceholder %}

When 'usePlaceholder' is true, it will grab the label of the element and set it as
the placeholder. If it is a string, it will use that instead.  You may have also
noticed that DateBox always tries to use the label as it's header text, when appropriate.

<div class="ui-field-contain"><label for="cal3">Date Of Birth</label><input id="cal3" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"usePlaceholder":true}'></div>


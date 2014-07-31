---
title: Open Methods
pagenum: 9
layout: doc
---

# Original Input

If for some reason you wish you end-user to be able to directly enter a date in the
input, set {% api_doc lockInput %} false.

# Input Styles

There are a number of input styles - my favorite by far is {% api_doc useNewStyle %}.
But there are other options as well, which I will demonstrate below.

## Default Display

Note that the button will not display correctly if the input does not have a named ID

<div class="ui-field-contain"><input id="cal1" type="text" data-role="datebox" data-options='{"mode":"calbox","useNewStyle":false}'></div>


### {% api_doc useNewStyle %} coupled with {% api_doc useFocus %}

You *can* use this mode without 'useFocus', however I find the button to be too small
to acurately click

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useFocus":true}'></div>

### {% api_doc useButton %} false with {% api_doc useFocus %}

Setting 'useButton' off will prevent the button decoration

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useFocus":true,"useNewStyle":false,"useButton":false}'></div>

### {% api_doc hideInput %} and opening with a link or button

<div><input id="cal2" type="text" data-role="datebox" data-options='{"mode":"calbox","centerVert":true, "centerHoriz":true,"hideInput":true}'></div>

This is where the options {% api_doc centerHoriz %} and {% api_doc centerVert %} are most useful.

<a href="javascript:$('#cal2').datebox('open');" data-role="button">Open Datebox</a>

{% highlight html %}
<a href="javascript:$(input).datebox('open');" data-role="button">Open Datebox</a>
{% endhighlight %}

# Fine-Tuning Input styling

### {% api_doc useNewStyle %} and {% api_doc useAltIcon %}

Depending on your theme choice, it may be preferable to use a light colored icon
rather than a dark one.

If this is still not enough, the option {% api_doc overrideStyleClass %} allows you
to pass your own icon theme to the control.

<div><input data-theme="b" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"useAltIcon":true}'></div>

### {% api_doc usePlaceholder %}

When 'usePlaceholder' is true, it will grab the label of the element and set it as
the placeholder. If it is a string, it will use that instead.  You may have also
noticed that DateBox always tries to use the label as it's header text, when appropriate.

<div class="ui-field-contain"><label for="cal3">Date Of Birth</label><input id="cal3" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"usePlaceholder":true}'></div>


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
Given no other options, datebox will default to using it's a popup method - for jQueryMobiel,
this relies on the native jQM popups, so it is reasonable efficient, and it does not suffer 
from old DateBox bugs - namely, jQM core takes care of positioning, repositioning, 
click-behind detection, etc.

For bootstrap, a subset of the dropdown functionality is used (although none of the bootstrap
javascript code is called). This means that the bootstrap mode should work just fine even if 
bootstrap is not loaded.  This example is shown with {% api_doc useFocus %} enabled.
	
<div class="form-group">
	<label for="ex1">A CalBox</label>
	<input id="ex1" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true}'>
</div>

## Inline and Inline-Blind
Sometimes (such as in these documents), it is preferable to have the control simply
appear inline with the rest of the form. When using bootstrap, an additional option
available to you is {% api_doc useInlineAlign %}.

You might want DateBox to mimic the behavior of jQuery-UI - that is, to slide
down the control when you click the input.  To do this, set {% api_doc useInlineBlind %}. Note that this is the default "popup" behavior for the jQuery(UI) framework, and this option has no effect there.

Page Length Note: If you display the control inline, and your page is shorter than the viewport window, clicking on a button in the control will likely jump the page scroll to the top in some browsers.  I have yet to find a fix for this.  Additionally, this is probably only an issue when using a browser extension that overlays a portion of the viewport, allowing it to scroll, *without* changing the viewport dimensions.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true}'>
{% endhighlight %}

<div class="form-group">
	<label for="in2">InlineBlind CalBox</label>
	<input type="text" id="in2" class="form-control" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true, "useInlineAlign": "right", "useFocus":true}'>
</div>


To show the control inline, with no hiding set {% api_doc useInline %}.  Note that you will want to
include the control in a "ui-field-contain" (jQM) or "form-group" (Bootstrap) for optimal results.

{% highlight html %}
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":true}'>
{% endhighlight %}

<div class="form-group">
	<label for="in1">Inline CalBox</label>
	<input id="in1" type="text" class="form-control" data-role="datebox" data-options='{"mode":"calbox", "useInlineAlign": "center", "useInline": true}'>
</div>

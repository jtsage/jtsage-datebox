---
title: Default / Start Dates
pagenum: 11
layout: doc
---

# Setting Default Date / Time

Setting the default is simple - you *can* simply set the input element - however, this
is risky, as it must be in the *exact* same format that datebox will output.  Better is to
use the option {% api_doc defaultValue %}. Please refer to the API docs on {% api_doc defaultValue %}, 
as there are quite a few options for the format of the default.

Additionally, when setting a default, you may also want to take advantage of {% api_doc showInitialValue %}.

<div class="form-group">
	<label for="dd">Default Date</label>
	<input id="dd" class="form-control" type="text" data-role="datebox" data-options='{"mode":"calbox", "defaultValue":[2001,0,1], "useInlineAlign":"center", "showInitialValue":true, "useInline": true}'>
</div>

<div class="form-group">
	<label for="dt">Default Time</label>
	<input id="dt" type="text" class="form-control" data-role="datebox" data-options='{"mode":"timeflipbox", "useInlineAlign":"center", "defaultValue":"18:35", "showInitialValue":true, "useInline": true}'>
</div>

# Other options

If for some reason you need to translate based off of the default value - perhaps
your default is a flight departure date, and you wish to guess that the user will
return a week after that, you can use:

 - {% api_doc startOffsetYears %} : Offset defaultValue by # years
 - {% api_doc startOffsetMonths %} : Offset defaultValue by # months
 - {% api_doc startOffsetDays %} : Offset defaultValue by # days

Note these will be applied to "today" if the input element is empty as well.  (for
instance, if you want the control to start one year from today, just set 
'startOffsetYears' to 1)

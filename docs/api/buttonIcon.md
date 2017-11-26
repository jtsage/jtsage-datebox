---
title: buttonIcon
short: Class of button to use in input element
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'customflip',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'display' ]
relat: "display"
layout: api
defval: "false"
dattype: "String"
dyn: "False"
---

This is the class of the button in the input element.  Any valid ui-icon-&lt;name> is fine. The 
default of "false" will cause DateBox to use framework defaults.

For jQueryMobile, "ui-icon-calendar" for date based modes, and "ui-icon-clock" for time or duration
modes.

For bootstrap, "glyphicon-calendar" for date based modes, and "glyphicon-time" for time or duration
modes.

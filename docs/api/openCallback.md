---
title: openCallback
short: Callback function to run on control open
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
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "false"
dattype: "Function"
dyn: "True"
---

Option can be a function, or, a string reference to a function in the window object.  Additionally, if this returns
false, the DateBox control will immediatally close.

For more information, please see: [Callbacks / Listeners]({{site.basesite}}doc/6-1-callback/).




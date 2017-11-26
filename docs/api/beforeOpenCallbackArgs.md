---
title: beforeOpenCallbackArgs
short: Extra arguments to pass to open callback.
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
defval: "[]"
dattype: "Array"
dyn: "True"
---

Note that 'this' in your function is the widget.  argument[0] is a return value object, this 
starts on argument[1]

For more information, please see: [Callbacks / Listeners]({{site.basesite}}doc/6-1-callback/).

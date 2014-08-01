---
title: openCallbackArgs
short: Extra arguments to pass to open callback.
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "[]"
dattype: "Array"
---

Note that 'this' in your function is the widget.  argument[0] is the date object, this starts on argument[1]

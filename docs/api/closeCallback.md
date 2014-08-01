---
title: closeCallback
short: Callback function to run on control close
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'custombox',
	'customflip'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "false"
dattype: "Function"
dyn: "True"
---

Option can be a function, or it can be a string that will be eval'ed - even though
THAT'S BAD.

For more information, please see: [Callbacks / Listeners]({{site.basesite}}doc/6-1-callback/).



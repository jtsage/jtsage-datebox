---
title: linkedField
short: The jQuery selector for the output linked field(s)
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'customflip'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "false"
dattype: "String"
dyn: "True"
---

This is a jQuery selector of the field(s) that you want to fill with the selected date
when choosen.  Uses {% api_doc linkedFieldFormat %} as the format.  Often used with a hidden
form element to simplify backend date processing.



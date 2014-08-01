---
title: defaultValue
short: Default value for the date
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
cats: [ 'common' ]
relat: "common"
layout: api
defval: "false"
dattype: "Array/String"
dyn: "False, True if input cleared"
---

Set the default date value, or time value.  Date should be supplied as a three 
element array [year, month, date] - time can be supplied as a 24hr string '15:41'

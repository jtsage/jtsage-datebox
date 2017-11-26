---
title: maxDays
short: Maximum number of days past today
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Integer"
dyn: "True"
---

Only accept dates that are today + # of days in the future. (no limit on past dates) 
Corresponds somewhat to the html max attribute.

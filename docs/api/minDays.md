---
title: minDays
short: Minimum amount of days before today
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

Only accept dates that are today minus(-) # of days in the past. (no limit on future dates). Corresponds somewhat to the html min attribute

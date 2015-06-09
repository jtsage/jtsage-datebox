---
title: minTime
short: Minimum allowed time
modes: [
	'timebox',
	'timeflipbox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Integer"
dyn: "True"
---

Allow only times after this to be selected. Format is 24hr click, i.e. 18:31

Note: this limits date/time selection to hours *after* this (inclusive) for TODAY.

Bug Note: if today happens to be the start/end of daylight savings, there will be a "jump" in the time.



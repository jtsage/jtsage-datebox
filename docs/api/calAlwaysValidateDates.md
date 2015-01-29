---
title: calAlwaysValidateDates
short: Always check each date to ensure validity
modes: [
	'calbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "false"
dattype: "Boolean"
dyn: "False"
---

Always, always validate each date for validity.  This is useful if you are using min/maxDays and they could 
concievably both be zero at the same time.  (The usual check for "should these dates be tested" uses falsy logic).


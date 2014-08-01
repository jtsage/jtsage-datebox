---
title: calOnlyMonth
short: Hide next/previous months in calendar
modes: [
	'calbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "false"
dattype: "Boolean"
dyn: "True"
---

This will hide the previous and next month dates in calendar view - that is, 
the 'overflow' dates - typically the first few days of next month, and the 
last few days of the previous month.  Particularly useful if you are doing a lot 
of data limiting, as while DateBox will not accept a bad "overflow" date, the display
does not always make it clear that the date is disabled, leading to user confusion.

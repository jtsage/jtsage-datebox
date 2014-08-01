---
title: calYearPickMin
short: Year picker lower limit
modes: [
	'calbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "-6"
dattype: "Mixed"
dyn: "True"
---

This is the lower limit for the year picker control. Valid options:

 - **< 1,800** :: Number of years from current year
 - **> 1800** :: Hard coded year
 - **NOW** :: Today's year
 
Note negative integers are interpetted the same as positive. So, -6 is the same as 6 in this context.



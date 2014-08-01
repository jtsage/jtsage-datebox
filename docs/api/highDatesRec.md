---
title: highDatesRec
short: Highlight these recurring dates
modes: [
	'calbox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Array"
---

Array of arrays to recursively highlight - inner array is 3 elements: [year,month,day] where month is zero based (0=January..11=December). Use '-1' to specify 'ALL'<br />Example: highlight Christmas and Christmas eve every year [[-1,11,24],[-1,11,25]]

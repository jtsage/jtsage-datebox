---
title: blackDatesRec
short: Do not allow these recurring dates to be selected
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Array"
---

Array of arrays to recursively disable - inner array is 3 elements: [year,month,day] where month is zero based (0=January..11=December). Use '-1' to specify 'ALL'<br />Example: disable Christmas and Christmas eve every year [[-1,11,24],[-1,11,25]]

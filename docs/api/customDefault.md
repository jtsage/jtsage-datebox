---
title: customDefault
short: Array of default indexs for custom modes
modes: [
	'customflip'
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "[0,0,0]"
dattype: "Array"
dyn: "False"
---

The default selection for the data.  This is an array of **indexes**.  This 
*must* be set, as datebox can not really take a reasonable guess at your data.
By default it is [0,0,0], which will choose the first data element of up to 
three sources.

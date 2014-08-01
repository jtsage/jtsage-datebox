---
title: customFormat
short: Format for returned data
modes: [
	'custombox',
	'customflip'
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "false"
dattype: "String"
dyn: "True"
---

The intended output format for the data.  At a glance, valid options are %Xa ... %Xe 
and %X1 ... %X6 - if numeric, it will output the *index* of the data, if 
alphabetic, it will be the *value* of the data.  Note that re-opening the control 
when outputting the *value* of the data is **very** error-prone (and ignored in
customBox), usually resulting in the control reverting to the "default" values. 
When left 'false', datebox will build an appropriate format of just the indexes.

---
title: customFormat
short: Format for returned data
modes: [
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "false"
dattype: "String"
---

The intended output format for the data.  At a glance, valid options are %Xa ... %Xe and %X1 ... %X6 - if numeric, it will output the <b>index</b> of the data, if alphabetic, it will be the actual data.  Note that re-opening the control when outputting the actual data is <b>very</b> error-prone, usually resulting in the control reverting to the "default" values. When left 'false', datebox will build an appropriate format of just the indexes.

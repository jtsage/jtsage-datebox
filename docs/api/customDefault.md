---
title: customDefault
short: Array of default indexs for custom modes
modes: [
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "[0,0,0]"
dattype: "Array"
---

The default selection for the data.  This is an array of <b>indexes</b>.  This <b>must</b> be set, as datebox can not really take a reasonable guess at your data.  By default it is [0,0,0], which will choose the first data element of up to three sources.

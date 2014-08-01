---
title: customHead
short: Force the header text
modes: [
]
cats: [ 'custom' ]
relat: "custom"
layout: api
defval: "false"
dattype: "String"
dyn: "True"
---

Allows you to force the header text to whatever you specify.  Leaving it false 
allows DateBox to work as normal, grabbing either the placeholder attribute, or 
the label text (in that order of preference).  If neither is found, it will be 
blank. Note that this option is **not** i18n aware.

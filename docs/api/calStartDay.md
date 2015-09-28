---
title: calStartDay
short: Day of week to start calendar on
modes: [
	'calbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "0"
dattype: "Integer"
dyn: "True"
---

Zero based (0=Sunday...6=Saturday). Really only tested extensivly with 
the heavily used '0' or '1' options, but anything *should* work.  This 
feature does not play particularly well with {% api_doc calShowWeek %}
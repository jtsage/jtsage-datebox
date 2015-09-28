---
title: daysOfWeekShort
short: Abbreviated days of the week
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox'
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "array('Su' ... 'Sa']"
dattype: "Array"
dyn: "True"
---

Note that if you are relying on short day names to read a date back in (very rare, as there is
almost always a more granular option available), and there are duplicates in this list (i.e.
array('S,'M','T','W','T'...) ) the parser will likely behave very strangely.

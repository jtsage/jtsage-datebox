---
title: rolloverMode
short: Allow rollover of each date element
modes: [
	'datebox',
	'flipbox',
	'timebox',
	'timeflipbox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "{ 'm': true, 'd': true, 'h': true, 'i': true, 's': true }"
dattype: "Object"
dyn: "True"
---

Allow rollover on a per-element basis.  i.e. - December + 1 = January of next year

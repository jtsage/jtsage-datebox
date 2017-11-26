---
title: minuteStepRound
short: Direction to round
modes: [
	'slidebox',
	'timebox',
	'timeflipbox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "0"
dattype: "Integer"
dyn: "True"
---

Control rounding of minutes when invalid minute is entered. That is, minuteStep=5 and you enter 3 direct to the element

 - **-1** : Down
 - **1** : Up
 - **0** : "Standard Rounding"

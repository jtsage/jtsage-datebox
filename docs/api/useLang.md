---
title: useLang
short: The current active langauge / locale
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "default"
dattype: "String"
dyn: "True"
---

Selects the current active langauge.  If a language string is not found, it will fall back on the string in the
"default" languge, or return "undefined" (as a String).


---
title: popupPosition
short: When set to "window", center control in window
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
cats: [ 'display' ]
relat: "display"
layout: api
defval: "false"
dattype: "String"
---

Control how the jqm builtin popup mode positions.  Set to 'window' to center in the open window.  Set to an '#id' to center over that element. When set to false, allow datebox to center over the input element (if it has a named id), or in the window.  Set to 'origin' to use X/Y coordinates.

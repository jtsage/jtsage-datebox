---
title: transition
short: Transition for display
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'customflip'
]
cats: [ 'display' ]
relat: "display"
layout: api
defval: "fade"
dattype: "String"
dyn: "False"
---

Transition to use on popup or dropdown.

jQM supports many transitions. 

Bootstrap supports only fade, however, this is a class name, and you can write your own.  This class
is added to the datebox on creation - when displaying, the "in" class is added.

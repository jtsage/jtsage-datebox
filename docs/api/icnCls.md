---
title: icnCls
short: Class of icons to use in control
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
frames: [ 'bootstrap' ]
relat: "display"
layout: api
defval: "-varies-"
dattype: "String"
dyn: "False"
---

This is the class of the icons in the control. The "name" option is appended to the end of 
this string, which is why the default ends with "fa-" - i.e. "fa-" + "plus"

For BootStrap 3, the default is: " glyphicon glyphicon-"

For BootStrap 4, the default is: " fa fa-"
---
title: bootstrapResponsive
short: Show the control as a dropdown from the input, or a modal, depending on screen size
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
frames: ['bootstrap']
relat: "display"
layout: api
defval: "true"
dattype: "Boolean"
dyn: "False"
---

This will show the control as a dropdown or a modal, depending on the screen size.  {% api_doc bootstrapDropdownRight %} will take effect on larger screens when it is set.

This option is semi-dynamic, changes will take effect on next open.

This option overrides {% api_doc bootstrapModal %} and {% api_doc bootstrapDropdown %}.
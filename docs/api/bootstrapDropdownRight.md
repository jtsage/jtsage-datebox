---
title: bootstrapDropdownRight
short: Show the control as a dropdown from the input (right align)
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

Attach the control directly to the input element, and roll it down from there when opened - aligned to the right.  {% api_doc bootstrapDropdown %} must be true for this to work.

This option is semi-dynamic, changes will take effect on next open.
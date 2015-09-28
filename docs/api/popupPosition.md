---
title: popupPosition
short: Controls position of the jQM Popup
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
frames: [ 'jqm' ]
cats: [ 'display' ]
relat: "display"
layout: api
defval: "false"
dattype: "String"
dyn: "True"
---

Control the placement of the pop upped control.

Valid Options:

 - *'window'* : Center in window
 - *'origin'* : Use value of {% api_doc popupForceX %} and {% api_doc popupForceY %}
 - *'#id'* : Center over #id element
 - *false* : If input has a named id, center over input, otherwise, center in window

---
title: hideContainer
short: Hide the Fieldcontainer Element
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
defval: "false"
dattype: "Boolean"
dyn: "True"
---

Cause the original fieldcontain to be hidden on the page - really only appropriate 
with {% api_doc useInline %}.

Also, this does no checks, it in fact hides the parent of the input element.  So, test first.


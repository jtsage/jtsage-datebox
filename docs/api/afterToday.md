---
title: afterToday
short: Limit dates to after today's date
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Boolean"
dyn: "True"
---

"Date selected must be *on* or *after* today's date"

(Disallow dates *before* today)

Allows those dates that are after the true value of the client's today
(new Date(); at widget open) to be selected. 

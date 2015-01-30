---
title: beforeToday
short: Limit dates to before today's date
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

"Date selected must be *on* or *before* today's date"

(Disallow dates *after* today)

Allows those dates that are before the true value of the client's today
(new Date(); at widget open) to be selected. Dates can be re-enabled via {% api_doc whiteDates %}.


---
title: notToday
short: Limit dates to *not* today's date
modes: [
	'calbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "false"
dattype: "Boolean"
dyn: "True"
---

Allows those dates that are not the true value of the client's today
(new Date(); at widget open) to be selected. Dates can be re-enabled via {% api_doc whiteDates %}.


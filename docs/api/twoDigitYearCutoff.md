---
title: twoDigitYearCutoff
short: Where the cutoff between 19XX and 20XX happens
modes: [
	'datebox',
	'calbox',
	'flipbox',
	'slidebox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'limiting' ]
relat: "limiting"
layout: api
defval: "38"
dattype: "Integer"
dyn: "True"
---

This sets where the century change happens.  By default, it is 38, that is, 2 digit years before
38 will be assumed to refer to 2000-2037, and years after will be assumed to refere to 1938-1999.

If {% api_doc afterToday %} is true, all years are assumed to be 20XX. The same would be true if this 
were set to 100+


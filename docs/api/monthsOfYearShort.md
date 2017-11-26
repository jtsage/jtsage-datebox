---
title: monthsOfYearShort
short: Abbreviated months of the year
modes: [
	'datebox',
	'calbox',
	'slidebox',
	'flipbox',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "['Jan' ... 'Dec']"
dattype: "Array"
dyn: "True"
---

When using short months as output (and input), make sure that there are 12 unique short names.  If you use too shot of an abbreviation (ex. Ju = June, Ju = July), not only is your outputted date ambiguous to the user, it also cannot be reliably re-read by DateBox.


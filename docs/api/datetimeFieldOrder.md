---
title: datetimeFieldOrder
short: Field order for datetime entry
modes: [
	'datetimebox',
	'datetimeflipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "array('y', 'm', 'd', 'h', 'i', 's', 'a')"
dattype: "Array"
---

Capitalizing "M" for month in "datebox" mode will enable string representations (short months)
instead. Note that this will break for any locale where the short string of two months is identical.



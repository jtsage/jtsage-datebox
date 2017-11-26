---
title: datetimeFormat
short: Format for returned datetime
modes: [
	'datetimebox',
	'datetimeflipbox',
]
cats: [ 'i18n' ]
relat: "i18n"
layout: api
defval: "%Y-%m-%dT%k:%M:%S"
dattype: "Array"
dyn: "True"
---

For more information on date and time format variables, see: [Output Formats]({{site.basesite}}doc/3-3-output/)

Typically, this type of return isn't based on locale, more on the format your backend is expecting.  It appears in the i18n settings for ease of site-specific i18n customization.

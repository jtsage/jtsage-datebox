---
title: linkedFieldFormat
short: The format to use with linkedField
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'customflip',
	'datetimebox',
	'datetimeflipbox'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "%J"
dattype: "String"
dyn: "True"
---

This can be any valid format string that {% api_doc linkedField %} will be populated with. The
default value is the format that .toJSON returns. 

note: this default format includes a 'Z' - it stands for "Zulu Time", a.k.a. "GMT", a.k.a. "UTC" - it
is the single instance of DateBox doing any time zone processing, it *does* translate the date and
time to GMT.  PHP only mostly understands ISO-8601, other languages do better.  Backend node.js
would be very happy with this format.  That said, if you have not otherwise handled time zones in 
your application, please, please, please do not use the default setting. Note also this is relying on 
the useragent to have a correctly implemented toJSON - which should be there, but...



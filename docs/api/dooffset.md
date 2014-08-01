---
title: dooffset
short: Send: Change the date
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "2 args"
---

This trigger will change the internal date of datebox.  Functionally identical to hitting a +/- button in the control, or sliding/flipping a value<br><br><b>Usage</b>: $(input).trigger('datebox', {'method':'dooffset', 'amount': &lt#>, 'type': &lt;field>})<br><br><b>Expects</b>: <em>'amount'</em>: The amount of offset, typically +/-1<br><b>Expects</b>: <em>'type'</em>: Field to change, where y=Year, m=Month, d=Date, h=Hour, i=Minute, s=Second, a=Meridian (AM/PM)

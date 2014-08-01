---
title: offset
short: Recieve: Date has been changed
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "3 args"
---

This trigger is received when the datebox control is changed.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'offset' ) {
    alert('New datet: ' + passed.newDate);
    alert('Field offset: ' + passed.type);
    alert('Offset amount: ' + passed.amount);
  }
});</pre><br><br><b>Returns</b>: <em>'amount'</em>: Amount of offset, an integer<br><b>Returns</b>: <em>'type'</em>: Field changed, where y=Year, m=Month, d=Date, h=Hour, i=Minute, s=Second, a=Meridian (AM/PM)

---
title: disable
short: Recieve: Datebox has been disabled
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "-"
---

This trigger is received when the datebox control is disabled.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'disable' ) {
    alert('Datebox was disabled!');
  }
});</pre>

---
title: enable
short: Recieve: Datebox has been enabled
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "-"
---

This trigger is received when the datebox control is enabled.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'enable' ) {
    alert('Datebox was enabled!');
  }
});</pre>

---
title: refresh
short: Recieve: Datebox has been refreshed
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "-"
---

This trigger is received when the datebox control is refreshed.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'refresh' ) {
    alert('Datebox was refreshed!');
  }
});</pre>

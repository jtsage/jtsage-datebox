---
title: clear
short: Recieve: Datebox input has been cleared
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "-"
---

This trigger is received when the datebox control is cleared.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'clear' ) {
    alert('Datebox was cleared!');
  }
});</pre>

---
title: set
short: Send & Recieve: Set the date
modes: [
]
cats: [ 'event' ]
relat: "event"
layout: api
defval: ""
dattype: "1 or 2 args"
---

<h3>Send</h3>This trigger will set the datebox value.  It will not automatically call the refresh method. Functionally similar to the 'setTheDate' function, however this function expects a formatted date string, not a javascript date object.  The same as setting the input value and then calling 'change' on the input<br><br><b>Usage</b>: $(input).trigger('datebox', {'method':'set', 'value': &lt;date string>})<br><br><b>Expects</b>: <em>'value'</em>: A formatted date string (format to match the current output format)<br><br><br><h3>Receive</h3>This trigger is also received when the datebox control sets a value.  It contains both a formatted date, and a javascript date object.<br><br><b>Usage</b>: <pre class='prettyprint'>$(input).bind('datebox', function (e, passed) { 
  if ( passed.method === 'set' ) {
    alert('Formatted value is: ' + passed.value);
    alert('JavaScript Date object is: ' + passed.date);
  }
});</pre><b>Returns</b>: <em>'value'</em>: Formatted date string<br><b>Returns</b>: <em>'date'</em>: Javascript date object

---
title: Linking DateBoxes
pagenum: 17
layout: doc
---

# Linking DateBoxes
The most requested bit of coding for DateBox is to link a pair of DateBoxes in a
meaningful way - for instance a check in and check out date.  Below is a brief bit
of code that does exactly that.

<script type="text/javascript">
	function linker(obby, nextDatebox) {
		var setDate = obby.date;
		
		setDate.adj(2,1); // Add One Day
		
		// Format the date for min/max attribute
		minDate = this.callFormat('%Y-%m-%d', setDate);
		
		// Set min date on "next" datebox
		$('#'+nextDatebox).attr('min', minDate);
		
		// Call datebox method to read new min date
		$('#'+nextDatebox).datebox('applyMinMax');
		
		// Open "next" datebox
		$('#'+nextDatebox).datebox('open');
	}
</script>

<div class="form-group">
	<label for="in_date">Check In Date</label>
	<input id="in_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"afterToday":true,"closeCallback":"linker","closeCallbackArgs":["out_date"]}' type="text">
</div>
<div class="form-group">
	<label for="out_date">Check Out Date</label>
	<input id="out_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true}' type="text">
</div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">HTML Source Code</h3></div>

<div class="panel-body">
{% highlight html %}
<div class="form-group">
  <label for="in_date">Check In Date</label>
  <input id="in_date" data-role="datebox" type="text" data-options='{
    "mode":"calbox",
    "afterToday":true,
    "closeCallback":"linker",
    "closeCallbackArgs":["out_date"]
  }'>
</div>
<div class="form-group">
  <label for="out_date">Check Out Date</label>
  <input id="out_date" data-role="datebox" data-options='{"mode":"calbox"}' type="text">
</div>
{% endhighlight %}
</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">jQuery Source Code</h3></div>

<div class="panel-body">
{% highlight js %}
function linker(obby, nextDatebox) {
  // Access the returned date
  var setDate = obby.date;
  
  // Add one day to set date
  setDate.adj(2,1);

  // Format the date for min/max attribute
  minDate = this.callFormat('%Y-%m-%d', setDate);

  // Set min date on "next" datebox
  $('#'+nextDatebox).attr('min', minDate);

  // Call datebox method to read new min date
  $('#'+nextDatebox).datebox('applyMinMax');

  // Open "next" datebox
  $('#'+nextDatebox).datebox('open');
}
{% endhighlight %}
</div></div>

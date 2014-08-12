---
title: Linking Dateboxes
pagenum: 17
layout: doc
---

# Linking Dateboxes
The most requested bit of coding for DateBox is to link a pair of dateboxes in a
meaningful way - for instance a checkin and checkout date.  Below is a breif bit
of code that does exactally that.

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

<div class="ui-field-contain">
	<label for="in_date">Check In Date</label>
	<input id="in_date" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"afterToday":true,"closeCallback":"linker","closeCallbackArgs":["out_date"]}' type="text">
</div>
<div class="ui-field-contain">
	<label for="out_date">Check Out Date</label>
	<input id="out_date" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true}' type="text">
</div>

<a href="#hsource" data-rel="popup" data-role="button" data-inline="true" data-mini="true" data-transition="pop">HTML Source Code</a>

<div data-role="popup" id="hsource" class="ui-content">
{% highlight html %}
<div class="ui-field-contain">
  <label for="in_date">Check In Date</label>
  <input id="in_date" data-role="datebox" type="text" data-options='{
    "mode":"calbox",
    "afterToday":true,
    "closeCallback":"linker",
    "closeCallbackArgs":["out_date"]
  }'>
</div>
<div class="ui-field-contain">
  <label for="out_date">Check Out Date</label>
  <input id="out_date" data-role="datebox" data-options='{"mode":"calbox"}' type="text">
</div>
{% endhighlight %}
</div>

<a href="#jsource" data-rel="popup" data-role="button" data-inline="true" data-mini="true" data-transition="pop">jQuery Source Code</a>

<div data-role="popup" id="jsource" class="ui-content">
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
</div>

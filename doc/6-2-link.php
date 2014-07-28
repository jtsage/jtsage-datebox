<?php
require_once('inc/func.php');
echo do_header("Linking Dateboxes", array('6-1-callback.php',"Callbacks / Listeners"), array('6-3-func.php',"Common Functions"), 'calbox');
?>

<h1>Linking Dateboxes</h1>
<p>The most requested bit of coding for DateBox is to link a pair of dateboxes in a meaningful way - for instance a checkin and checkout date.  Below is a breif bit of code that does exactally that.</p>

<script type="text/javascript">
	function linker(setDate, nextDatebox) {
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
<pre class="prettyprint">
&lt;div class="ui-field-contain">
  &lt;label for="in_date">Check In Date&lt;/label>
  &lt;input id="in_date" data-role="datebox" type="text" data-options='{
    "mode":"calbox",
    "afterToday":true,
    "closeCallback":"linker",
    "closeCallbackArgs":["out_date"]
  }'>
&lt;/div>
&lt;div class="ui-field-contain">
  &lt;label for="out_date">Check Out Date&lt;/label>
  &lt;input id="out_date" data-role="datebox" data-options='{"mode":"calbox"}' type="text">
&lt;/div>
</pre>
</div>

<a href="#jsource" data-rel="popup" data-role="button" data-inline="true" data-mini="true" data-transition="pop">jQuery Source Code</a>
<div data-role="popup" id="jsource" class="ui-content">
<pre class="prettyprint">
function linker(setDate, nextDatebox) {
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
</pre>
</div>

<?php
echo do_footer();
?>

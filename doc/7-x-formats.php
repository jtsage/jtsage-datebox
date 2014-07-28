<?php
require_once('inc/func.php');
echo do_header("Multiple Format Submission", NULL, NULL, 'calbox');
?>

<h1>Multiple Date Formats</h1>
<p>This technique is particularly useful if you wish to show a locale oriented display to the user, but your backend has specific date format requirements.  The output of the demo here is show in "text" inputs, but it could just as easily be "hidden" inputs.</p>

<div class="ui-field-contain">
	<label for="date">User Date</label>
	<input type="text" id="date" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"closeCallback":"formatter"}'>
</div>

<script type="text/javascript">
	function formatter(date) {
		$('#out1').val(this.callFormat('%Y-%m-%d', date));
		$('#out2').val(this.callFormat('%-d', date));
		$('#out3').val(this.callFormat('%-m', date));
		$('#out4').val(this.callFormat('%Y', date));
	}
</script>

<h3>Extra output</h3>
<div class="ui-field-contain">
	<label for="out1">ISO Format</label><input type="text" id="out1" readonly="readonly">
</div>
<div class="ui-field-contain">
	<label for="out2">Date</label><input type="text" id="out2" readonly="readonly">
</div>
<div class="ui-field-contain">
	<label for="out3">Month</label><input type="text" id="out3" readonly="readonly">
</div>
<div class="ui-field-contain">
	<label for="out4">Year</label><input type="text" id="out4" readonly="readonly">
</div>

<h3>HTML Source</h3>
<pre class="prettyprint">
&lt;div class="ui-field-contain">
  &lt;label for="date">User Date&lt;/label>
  &lt;input type="text" id="date" data-role="datebox" data-options='{
    "mode":"calbox",
    "closeCallback":"formatter"
  }'>
&lt;/div>
</pre>

<h3>jQuery Source</h3>
<pre class="prettyprint">
function formatter(date) {
  $('#out1').val(this.callFormat('%Y-%m-%d', date));
  $('#out2').val(this.callFormat('%-d', date));
  $('#out3').val(this.callFormat('%-m', date));
  $('#out4').val(this.callFormat('%Y', date));
}
</pre>
	


<?php
echo do_footer();
?>

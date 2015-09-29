---
title: Multiple Formats
pagenum: 22
layout: doc
---

# Multiple Date Formats

This technique is particularly useful if you wish to show a locale oriented 
display to the user, but your backend has specific, **multiple**, date format requirements. (CakePHP for instance).

If you simply need a single extra format in something like a hidden input
element, please read the api pages for {% api_doc linkedField %} and {% api_doc linkedFieldFormat %}

The output of the demo here is show in "text" inputs, but it could just as 
easily be "hidden" inputs.

<div class="form-group">
	<label for="date">User Date</label>
	<input type="text" class="form-control" id="date" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"closeCallback":"formatter"}'>
</div>

<script type="text/javascript">
	function formatter(obby) {
		var date = obby.date;
		$('#out1').val(this.callFormat('%Y-%m-%d', date));
		$('#out2').val(this.callFormat('%-d', date));
		$('#out3').val(this.callFormat('%-m', date));
		$('#out4').val(this.callFormat('%Y', date));
	}
</script>

### Extra output

<div class="row">
	<div class="col-sm-2"><label for="out1">ISO Format</label></div>
	<div class="col-sm-4"><input class="form-control" type="text" id="out1" readonly="readonly"></div>

	<div class="col-sm-2"><label for="out2">Date</label></div>
	<div class="col-sm-4"><input type="text" class="form-control" id="out2" readonly="readonly"></div>
</div>

<div class="row">
	<div class="col-sm-2"><label for="out3">Month</label></div>
	<div class="col-sm-4"><input type="text" class="form-control" id="out3" readonly="readonly"></div>


	<div class="col-sm-2"><label for="out4">Year</label></div>
	<div class="col-sm-4"><input type="text" class="form-control" id="out4" readonly="readonly"></div>
</div>

### Source Code
<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">HTML</h3></div>
<div class="panel-body">
{% highlight html %}
<div class="form-group">
  <label for="date">User Date</label>
  <input type="text" id="date" data-role="datebox" data-options='{
    "mode":"calbox",
    "closeCallback":"formatter"
  }'>
</div>
{% endhighlight %}
</div></div>

<div class="panel panel-default">
<div class="panel-heading"><h3 class="panel-title">jQuery</h3></div>
<div class="panel-body">
{%highlight js %}
function formatter(obby) {
  var date = obby.date;
  $('#out1').val(this.callFormat('%Y-%m-%d', date));
  $('#out2').val(this.callFormat('%-d', date));
  $('#out3').val(this.callFormat('%-m', date));
  $('#out4').val(this.callFormat('%Y', date));
}
{% endhighlight %}
</div></div>


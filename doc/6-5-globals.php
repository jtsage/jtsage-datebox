<?php
require_once('inc/func.php');
echo do_header("Global Data", array('6-4-trigger.php',"6.4. Triggers"), array('7-demos.php',"7. Advanced Demos"), false);
?>

<h1>Mis-Named</h1>
<p>This section is really sort of misnnamed.  It refers to the data avalable to use inside a callback function.</p>

<h1>Callback arguments</h1>
<p>Callbacks are called with "this" being set to the datebox widget object.  Additionally, the close callback is called with an argument[0] of the just set javascript date <strong>object</strong>.  Finally, <?php api('callback',"closeCallbackArgs"); ?> is appended.  For the open callback, only <?php api('callback',"openCallbackArgs"); ?> is used.</p>

<h1>Useful widget (this) methods and variables</h1>
<h2>Variables</h2>
<ul>
	<li><strong>lastDuration</strong>: last set duration</li>
	<li><strong>theDate</strong>: current set date</li>
	<li><strong>d.intHTML</strong>: current widget HTML</li>
	<li><strong>options</strong>: the current set options of datebox</li>
</ul>
<h2>Methods</h2>
<p>Of course, all the public functions listed in the <a href="http://dev.jtsage.com/jQM-DateBox/api/">API</a> can be called directly.</p>
<p>Some "private" methods that might be useful (and possibly destructive) are:
<ul>
	<li><strong>_ord(<em>int</em>)</strong>: Get a number's ordinal</li>
	<li><strong>__(<em>string</em>)</strong>: Get an i18n value for string key</li>
	<li><strong>_zPad(<em>int</em>)</strong>: Zero pad an interger to 2 digits</li>
	<li><strong>_dRep(<em>string</em>,<em>int</em>)</strong>: Convert "string" to (int>0) indic numbers, or (int<0) from indic numbers</li>
	<li><strong>_applyCoords()</em></strong>: Re-compute position of the datebox popup</li>
	<li><strong>_grabLabel()</em></strong>: Grab the most reasonable label for the control. Returns string</li>
</ul></p>



<?php
echo do_footer();
?>

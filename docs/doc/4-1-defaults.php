<?php
require_once('inc/func.php');
echo do_header("Default / Start Dates", array('4-limits.php',"Data Limiting"), array('4-2-limit.php',"Excluding Dates"));
?>

<h1>Setting Default Date / Time</h1>
<p>Setting the default is simple - you <em>can</em> simply set the input element - however, this is risky, as it must be in the same format that datebox will output.  Better is to use the option <?php api('common','defaultValue'); ?>.</p>
<p>Additionally, when setting a default, you may also want to take advantage of <?php api('common','showInitialValue'); ?>.</p>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "defaultValue":[2001,0,1], "showInitialValue":true}'></div>

<div><input type="text" data-role="datebox" data-options='{"mode":"timeflipbox", "defaultValue":"18:35", "showInitialValue":true}'></div>

<h2>Other options</h2>
<p>If for some reason you need to translate based off of the default value - perhaps your default is a flight departure date, and you wish to guess that the user will return a week after that, you can use:
<ul>
	<li><strong><?php api('common','startOffsetYears'); ?></strong>: Offset defaultValue by # years</li>
	<li><strong><?php api('common','startOffsetMonths'); ?></strong>: Offset defaultValue by # months</li>
	<li><strong><?php api('common','startOffsetDays'); ?></strong>: Offset defaultValue by # days</li>
</ul>
Note these will be applied to "today" if the input element is empty as well.  (for instance, if you want the control to start one year from today, just set 'startOffsetYears' to 1</p>




<?php
echo do_footer();
?>

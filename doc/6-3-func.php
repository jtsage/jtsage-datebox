<?php
require_once('inc/func.php');
echo do_header("Common Functions", array('6-2-link.php',"Linking Dateboxes"), array('6-4-trigger.php',"Triggers"), false);
?>

<h1>Public Datebox Functions</h1>
<p>There a a number of public datebox functions.  Refer to the API documentation for full use, but at a glance they are used something like this:
<ul>
	<li><?php api('public','open'); ?></strong> :: Open the datebox control</li>
	<li><?php api('public','close'); ?></strong> :: Close the datebox control</li>
	<li><?php api('public','disable'); ?></strong> :: Disable the datebox control</li>
	<li><?php api('public','enable'); ?></strong> :: Enable the datebox control</li>
	<li><?php api('public','refresh'); ?></strong> :: Refresh the datebox control</li>
	<li><?php api('public','getTheDate'); ?></strong> :: Return the current date object</li>
	<li><?php api('public','setTheDate'); ?></strong> :: Set the date (date object)</li>
	<li><?php api('public','getLastDur'); ?></strong> :: Get the last set duration</li>
	<li><?php api('public','{}'); ?></strong> :: Set an option</li>
	<li><?php api('public','getOption'); ?></strong> :: Retrieve an option's value</li>
	<li><?php api('public','callFormat'); ?></strong> :: Return a formatted date</li>
	<li><?php api('public','applyMinMax'); ?></strong> :: Apply new min/max attributes</li>
</ul></p>



<?php
echo do_footer();
?>

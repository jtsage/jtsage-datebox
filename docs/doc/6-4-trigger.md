<?php
require_once('inc/func.php');
echo do_header("Triggers", array('6-3-func.php',"Common Functions"), array('6-5-globals.php',"Global Data"), false);
?>

<h1>Triggers</h1>
<p>Datebox also contains quite a number of triggers and listeners, which are all passed as a 'method' of the 'datebox' listener/trigger. Usage of each is detailed in the API documentation, but they are:
<ul>
	<li><?php api('event','open'); ?></strong> :: Send: Open Datebox</li>
	<li><?php api('event','close'); ?></strong> :: Send: Close Datebox</li>
	<li><?php api('event','doset'); ?></strong> :: Send: Refresh input element</li>
	<li><?php api('event','doclear'); ?></strong> :: Send: Clear input element</li>
	<li><?php api('event','dorefresh'); ?></strong> :: Send: Refresh control</li>
	<li><?php api('event','dooffset'); ?></strong> :: Send: Change the date</li>
	<li><?php api('event','set'); ?></strong> :: Send &amp; Recieve: Set the date, or date has been set</li>
	<li><?php api('event','enable'); ?></strong> :: Recieve: Datebox has been enabled</li>
	<li><?php api('event','disable'); ?></strong> :: Recieve: Datebox has been disabled</li>
	<li><?php api('event','refresh'); ?></strong> :: Recieve: Datebox has been refreshed</li>
	<li><?php api('event','clear'); ?></strong> :: Recieve: Datebox input has been cleared</li>
	<li><?php api('event','offset'); ?></strong> :: Recieve: Date has been changed</li>
</ul>

<?php
echo do_footer();
?>

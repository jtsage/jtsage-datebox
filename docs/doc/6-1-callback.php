<?php
require_once('inc/func.php');
echo do_header("Callbacks / Listeners", array('6-prog.php',"Extending Datebox"), array('6-2-link.php',"Linking Dateboxes"), false);
?>

<h1>Callbacks</h1>
<p>DateBox provides both and open and close callback hook as an option.  See the next page for a bit on usage, and the API documents on usage enviroment.
<ul>
	<li><?php api('callback','openCallback'); ?></strong> :: Callback function to run on control open</li>
	<li><?php api('callback','openCallbackArgs'); ?></strong> :: Extra arguments to pass to open callback.</li>
	<li><?php api('callback','closeCallback'); ?></strong> :: Callback function to run on control close</li>
	<li><?php api('callback','closeCallbackArgs'); ?></strong> :: Extra arguments to pass to close callback.</li>
</ul></p>

<h1>Listeners</h1>
<p>DateBox also provides a few "global" listeners.  They are:
<ul>
	<li><?php api('event2','dateboxbeforecreate'); ?></strong> :: Triggered on every page if datebox is loaded. Somewhat useless</li>
	<li><?php api('event2','dateboxcreate'); ?></strong> :: Triggered when a datebox is enhanced - but thrown prior to initialization. Useful only to check if there *is* a datebox on the page</li>
	<li><?php api('event2','dateboxaftercreate'); ?></strong> :: Triggered when after a datebox is enhanced</li>
</ul>



<?php
echo do_footer();
?>

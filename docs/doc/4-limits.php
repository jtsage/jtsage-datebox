<?php
require_once('inc/func.php');
echo do_header("Data Limiting", array('3-6-open.php',"Open Methods"), array('4-1-defaults.php',"Default / Start Dates"));
?>

<h1>Data Limiting Overview</h1>
<p>The reason many people choose to use DateBox over the other available options is that it includes a massive amount of data limiting controls.  You are able to specify exactally what is valid data through the control - of course, you should still veriify data on your end, but for the normal user, this will prevent them from submitting bad data through ignorance.</p>
<p>Data limiting works in a number of ways - there are options to disallow individual dates, individual days (such as weekends), recurring dates, or even limit to just a set of specifcally good data.  Similar options are available for time entry. Additionally, options exist to jump to known good dates, and to highlight preferred dates or days as needed.</p>




<?php
echo do_footer();
?>

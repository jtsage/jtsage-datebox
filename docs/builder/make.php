<?php
ob_start();

header('Content-Type: application/javascript');

$versions = array(
	"1.4.4",
	"1.4.3",
	"1.4.2",
	"1.4.1",
	"1.4.0",
	"dev",
);

$filemap = array(
	"calbox",
	"datebox",
	"flipbox",
	"slidebox",
	"durationbox",
	"durationflipbox",
	"customflip",
);

$goodfiles = array();
$cleankey = "";

if ( $_SERVER['REQUEST_METHOD'] == "POST" ) {
	if ( isset($_REQUEST['ver']) && in_array($_REQUEST['ver'], $versions) ) {
		$ver = $_REQUEST['ver'];
		$baseurl = "http://cdn.jtsage.com/datebox/" . $ver . "/";
		
		array_push($goodfiles, "jqm-datebox-" . $ver . ".core.js");
		
		foreach ( $_REQUEST as $key => $value ) {
			if ( substr($key,0,5) == "comp-" && $value == "true" ) {
				$cleankey =  substr($key,5);
				if ( in_array($cleankey, $filemap) ) {
					array_push($goodfiles, "jqm-datebox-" . $ver . ".mode." . $cleankey . ".js");
				}
			}
		}
		
		ob_clean();
		if ( isset($_POST['amd']) && $_POST['amd'] == "yes" ) {
			$testfile = file_get_contents("http://cdn.jtsage.com/datebox/amdwrap/wrap.begin.txt");
			echo $testfile;
		}
			
		foreach ( $goodfiles as $thisfile ) {
			$testfile = false;
			$testfile = file_get_contents($baseurl . $thisfile);
			if ( $testfile !== false ) {
				echo $testfile;
			}
		}
		
		foreach ( $_REQUEST['langs'] as $lang ) {
			$testfile = false;
			$langfile = "http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.{$lang}.utf8.js";
			$testfile = file_get_contents($langfile);
			if ( $testfile !== false ) {
				echo $testfile;
			}
		}
		
		if ( isset($_POST['amd']) && $_POST['amd'] == "yes" ) {
			$testfile = file_get_contents("http://cdn.jtsage.com/datebox/amdwrap/wrap.end.txt");
			echo $testfile;
		}
		
		ob_end_flush();
	}
} else {
	echo "throw new Error();";
}
exit();
?>

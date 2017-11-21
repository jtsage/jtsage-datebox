<?php
header('Content-Type: text/css');

$use = array();

$defaults = array(
	// Common Options
	'mWidth' 		=> array(290, "Widget Width", 'common', 100, 700),
	
	// CalBox Options
	'cGDWidth' 		=> array(40, "Date Width", 'calbox',5 ,100),
	'cGDHeight'		=> array(30, "Date Height", 'calbox', 5, 100),
	'cGDLHeight'	=> array(30, "Date Line Height", 'calbox', 5, 50),
	'cGDFont'		=> array(12, "Date Font Size", 'calbox', 5, 50),
	'cGDWWidth'		=> array(35, "Week # Width", 'calbox', 5, 100),
	'cGDEColor'		=> array("#888888", "Non-Month Day Color", 'calbox', false),
	
	// FlipBox Options
	'fLensWidth'	=> array(260, "Lens Width", 'flipbox', 100, 700),
	'fLensHeight'	=> array(40, "Lens Height", 'flipbox', 5, 100),
	'fTotHeight'	=> array(125, "Scroll Box Height", 'flipbox', 50, 350),
	'fScrHeight'	=> array(120, "Scroller Height", 'flipbox', 50, 350),
	'fScrWidth'		=> array(77, "Scroller Width", 'flipbox', 5, 200),
	'fDScrWidth'	=> array(60, "Scroller Width (Dur)", 'flipbox', 5, 200),
	'fEScrWidth'	=> array(47, "Scroller Width (5item)", 'flipbox', 5, 200),
	'fFScrWidth'	=> array(38, "Scroller Width (6item)", 'flipbox', 5, 200),
	'fEleHeight'	=> array(30, "Date Height", 'flipbox', 5, 50),
	
	// SlideBox Options
	'sYWidth'		=> array(84, "Year Width", 'slidebox', 5, 150),
	'sMWidth'		=> array(51, "Month Width", 'slidebox', 5, 150),
	'sDWidth'		=> array(40, "Date Width", 'slidebox', 5, 150),
	'sHWidth'		=> array(60, "Hour Width", 'slidebox', 5, 150),
	'sIWidth'		=> array(40, "Minute Width", 'slidebox', 5, 150),
	
	'sYMHigh'		=> array(30, "Year/Month Height", 'slidebox', 5, 50),
	'sDHigh'		=> array(38, "Date Height", 'slidebox', 5, 50),
	'sHIHigh'		=> array(24, "Hour/Min Height", 'slidebox', 5, 50),
	
	'sYMLHigh'		=> array(30, "Year/Month Line Height", 'slidebox', 5, 50),
	'sDLHigh'		=> array(20, "Date Line Height", 'slidebox', 5, 50),
	'sHILHigh'		=> array(22, "Hour/Min Line Height", 'slidebox', 5, 50),
	
	'sYFont'		=> array(14, "Year Font Size", 'slidebox', 5, 50),
	'sMFont'		=> array(12, "Month Font Size", 'slidebox', 5, 50),
	'sDFont'		=> array(14, "Date Font Size", 'slidebox', 5, 50),
	'sHFont'		=> array(14, "Hour Font Size", 'slidebox', 5, 50),
	'sIFont'		=> array(14, "Minute Font Size", 'slidebox', 5, 50),
	'sSubFont'		=> array(10, "Subtitle Font Size", 'slidebox', 5, 50)
);

foreach ( $defaults as $key => $value ) {
	if ( isset($_REQUEST[$key]) ) {
		$use[$key] = $_REQUEST[$key];
	} else {
		$use[$key] = $value[0];
	}
}


?>
/*
 * JTSage-DateBox : the full featured Date and Time Picker
 * Date: <?php echo date(DATE_ATOM) . "\n"; ?>
 * http://dev.jtsage.com/DateBox/
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Copyright 2010, 2015 JTSage. and other contributors
 * Released under the MIT license.
 * https://github.com/jtsage/jquery-mobile-datebox/blob/master/LICENSE.txt
 *
 */
 
/* 
 * Shared Styles 
 * 
 * These styles are used for the basic control,
 * and are not specific to any one mode.
 */

.ui-datebox-container { 
	width: <?php echo $use['mWidth'] ?>px;
	-webkit-transform:translate3d(0,0,0);
}
.ui-datebox-container .modal-header {
	padding: 8px 15px;
}



.ui-datebox-collapse { 
	text-align: center;
}


div.ui-datebox-inline.ui-datebox-inline-has-input {
	float: none;
	clear: both;
	position: relative;
	top: 5px;
}
div.ui-datebox-container.ui-datebox-inline {
	width: <?php echo $use['mWidth'] ?>px;

}

/* 
 * Calendar Mode Styles
 * 
 * These are specific to CalBox
 */

.ui-datebox-gridheader { 
	text-align: center;
}

.ui-datebox-gridheader a {
	margin: 3px;
}

.ui-datebox-gridheader h4 { 
	display: inline-block;
}

.ui-datebox-grid { 
	clear: both; 
	margin-bottom: 5px; 
}
.ui-datebox-inline .ui-datebox-gridrow .ui-controlgroup-controls {
	width: 100%;
	text-align: center;
}
.ui-datebox-inline .ui-datebox-gridrow .ui-controlgroup-controls .ui-btn {
	float: none;
	clear: both;
}

.ui-datebox-gridrow { 
	margin-left: auto; 
	margin-right: auto;
	display: table;
	margin-bottom: 0px;
}
.ui-datebox-gridrow-last {
	margin-bottom: 5px;
}

.ui-datebox-controls {
	padding: 0px 3px;
	width: 100%;
}

.ui-datebox-griddate { 
	width: <?php echo $use['cGDWidth'] ?>px;
	height: <?php echo $use['cGDHeight'] ?>px;
	line-height: <?php echo $use['cGDLHeight'] ?>px;
	padding: 0;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	font-weight: bold;
	font-size: <?php echo $use['cGDFont'] ?>px;
	zoom: 1;
	*display: inline;
}

.ui-datebox-griddate-week { 
	width: <?php echo $use['cGDWWidth'] ?>px;
	height: <?php echo $use['cGDHeight'] ?>px;
	line-height: <?php echo $use['cGDLHeight'] ?>px; 
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	font-weight: bold;
	font-size: <?php echo $use['cGDFont'] ?>px;
	zoom: 1;
	*display: inline;
}
.ui-datebox-gridrow div.ui-datebox-griddate-empty { 
	border: 1px solid transparent;
	color: <?php echo $use['cGDEColor'] ?>;
}
.ui-datebox-griddate.ui-datebox-griddate-label {
	border: 1px solid transparent;
	height: 15px;
	line-height: 15px;
}

/* 
 * Android Mode Styles
 * 
 * These are specific to datebox, timebox, and durationbox
 */

.ui-datebox-datebox-groups.row {
	margin-right: 5px;
	margin-left: 5px;
	margin-bottom: 10px;
}

.ui-datebox-datebox-group.col-xs-3, .ui-datebox-datebox-group.col-xs-4 {
	padding-left: 0px;
	padding-right: 0px;
}

div.ui-datebox-datebox-button {
	width: 100%;
	margin: 0;
}

.ui-datebox-datebox-groups input {
	text-align: center;
}

.ui-datebox-datebox-groups label {
	text-align: center;
	width: 100%;
	margin-bottom: 0px;
	border: 1px solid #ccc;
}
div.ui-datebox-datebox-button.glyphicon-plus {
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	-webkit-border-bottom-right-radius: 0;
	-webkit-border-bottom-left-radius: 0;
	top: 0px;
}
div.ui-datebox-datebox-button.glyphicon-minus {
	border-top-right-radius: 0;
	border-top-left-radius: 0;
	-webkit-border-top-right-radius: 0;
	-webkit-border-top-left-radius: 0;
	top: 0px;
}
.ui-datebox-header h4 {
	text-align: center;
}

/* 
 * Flip Mode Styles
 * 
 * These are specific to flipbox, timeflipbox, durationflipbox, and 
 * customflip
 */

.ui-datebox-fliplab {
	text-align: center;
}
.ui-datebox-flipcenter {
	width: <?php echo $use['fLensWidth'] ?>px;
	height: <?php echo $use['fLensHeight'] ?>px;
	border: 1px solid #EEEEEE;
	margin-right: auto;
	margin-left: auto;
	position: relative;
	-webkit-box-shadow: 0 0 12px rgba(0,0,0,.6);
    -moz-box-shadow: 0 0 12px rgba(0,0,0,.6);
    box-shadow: 0 0 12px rgba(0,0,0,.6);
}

.ui-datebox-flipcontent {
	text-align: center;
	height: <?php echo $use['fTotHeight'] ?>px;
	margin-bottom: -40px;
}
.ui-datebox-flipcontent li {
	border: 1px solid #ccc;
}

.ui-datebox-flipcontent div {
	margin-left: 3px;
	margin-right: 3px;
	width: <?php echo $use['fScrWidth'] ?>px;
	height: <?php echo $use['fScrHeight'] ?>px;
	display: inline-block;
	text-align: center;
	zoom: 1;
	*display: inline;
	overflow: hidden;
}
.ui-datebox-flipcontentd div {
	width: <?php echo $use['fDScrWidth'] ?>px;
}
.ui-datebox-flipcontente div {
	width: <?php echo $use['fEScrWidth'] ?>px;
}
.ui-datebox-flipcontentf div {
	width: <?php echo $use['fFScrWidth'] ?>px;
}
.ui-datebox-flipcontent ul {
	list-style-type: none;
	display: inline;
	border:1px solid rgba(0,0,0,0);
}
.ui-datebox-flipcontent li {
	height: <?php echo $use['fEleHeight'] ?>px;
}
.ui-datebox-flipcontent li span {
	margin-top: 7px;
	display: block;
}

/* 
 * Slide Mode Styles
 * 
 * Used solely for SlideBox.  Damn this is a lot of extra CSS.
 */

.ui-datebox-slide { 
	width: <?php echo $use['mWidth'] ?>px;
	margin-left: auto;
	margin-right: auto;
}
.ui-datebox-sliderow-int {
	display: inline-block;
	white-space: nowrap;
}

.ui-datebox-sliderow {
	margin-bottom: 5px;
	text-align: center;
	overflow: hidden;
	width: <?php echo $use['mWidth'] ?>px;
}
.ui-datebox-slide .ui-btn {
	margin: 0;
	padding: 0px 1em;
}

.ui-datebox-slidebox {
	text-align: center;
	display: inline-block;
	zoom:1;
	*display:inline;
	vertical-align: middle;
	font-weight: bold;
	border: 1px solid #ccc;
	box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.ui-datebox-slideyear {
	width: <?php echo $use['sYWidth'] ?>px;
	line-height: <?php echo $use['sYMLHigh'] ?>px;
	font-size: <?php echo $use['sYFont'] ?>px;
}
.ui-datebox-slidemonth {
	width: <?php echo $use['sMWidth'] ?>px;
	line-height: <?php echo $use['sYMLHigh'] ?>px;
	font-size: <?php echo $use['sMFont'] ?>px;
}
.ui-datebox-slideday {
	width: <?php echo $use['sDWidth'] ?>px; 
	line-height: <?php echo $use['sDLHigh'] ?>px;
	font-size: <?php echo $use['sDFont'] ?>px;
}
.ui-datebox-slidehour {
	width: <?php echo $use['sHWidth'] ?>px;
	line-height: <?php echo $use['sHILHigh'] ?>px;
	font-size: <?php echo $use['sHFont'] ?>px;
}
.ui-datebox-slidemins {
	width: <?php echo $use['sIWidth'] ?>px; 
	line-height: <?php echo $use['sHILHigh'] ?>px;
	font-size: <?php echo $use['sIFont'] ?>px;
}
.ui-datebox-slidewday {
	font-size: <?php echo $use['sSubFont'] ?>px;
	font-weight: normal;
}

span.ui-datebox-nopad { margin: 0 }

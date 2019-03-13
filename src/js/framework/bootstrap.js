/* JTSage-DateBox 
 *
 * Bootstrap option overrides and 
 * basic input/output functions
 */

mergeOpts({
	theme_clearBtnCls : "default",
	theme_clearBtnIcn : "erase",

	theme_closeBtnCls : "default",
	theme_closeBtnIcn : "ok",

	theme_cancelBtnCls : "default",
	theme_cancelBtnIcn : "remove",

	theme_tomorrowBtnCls : "default",
	theme_tomorrowBtnIcn : "send",

	theme_todayBtnCls : "default",
	theme_todayBtnIcn : "send",

	theme_dropdownContainer : "panel panel-default",
	theme_modalContainer : "panel panel-default",
	theme_inlineContainer : "panel panel-default",

	theme_headerTheme : "navbar-default",
	theme_headerBtnCls : "default",
	theme_headerBtnIcn : "remove",

	theme_cal_Today       : "info",
	theme_cal_DayHigh     : "warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "warning",
	theme_cal_DateHighAlt : "danger",
	theme_cal_DateHighRec : "warning",
	theme_cal_Default     : "default",
	theme_cal_OutOfBounds : "link",

	theme_cal_NextBtnIcn : "plus",
	theme_cal_NextBtnCls : "default",
	theme_cal_PrevBtnIcn : "minus",
	theme_cal_PrevBtnCls : "default",

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "default",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "default",

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "light",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_backgroundMask : {
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,.4)"
	},
	theme_headStyle : false,


	buttonIconDate: "calendar",
	buttonIconTime: "time",
	disabledState: "disabled",

	btnCls: " btn btn-sm btn-",
	icnCls: " glyphicon glyphicon-",

	s: {
		cal: {
			prevMonth : "<span title='{text}' class='glyphicon glyphicon-{icon}'></span>",
			nextMonth : "<span title='{text}' class='glyphicon glyphicon-{icon}'></span>",
			botButton : "<a href='#' class='{cls}' role='button'>" +
				"<span class='{icon}'></span> {text}</a>",
		}
	},

	clickEvent: "click",
	tranDone: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});


JTSageDateBox.baseMode = "bootstrap";

JTSageDateBox.styleFunctions = {
	button                : function( themeClass, iconClass, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='btn btn-sm btn-" + themeClass + "'>";
		retty += ( iconClass !== false ) ?
			"<span class='glyphicon glyphicon-" + iconClass + "'></span> " :
			"";
		retty += contents + "</a>";
		return retty;
	},
	buttonGroup           : function ( collapse) {
		var cls = ( collapse === true ) ?
			"btn-group btn-group-justified" :
			"btn-group btn-group-vertical";

		return $(
			"<div style='width: 100%; padding: 5px;' class='" +  cls + "'>"
		);
	},
	baseInputWrap         : function ( originalInput ) { 
		/* Set up a wrap around the input for styling, and return it */
		return originalInput.wrap("<div class='input-group'>").parent();
	},
	baseInputButton       : function ( iconClass, title ) {
		return "<div class='input-group-addon' title='" + title + "'>" +
			"<span class='glyphicon glyphicon-" + iconClass + "'></span>" + 
			"</div>";
	},
	baseInputButtonFinder : function ( originalInputWrap ) {
		return originalInputWrap.find(".input-group-addon");
	},
	baseInputNoButton     : function ( originalInputWrap ) {
		originalInputWrap.css( "width", "100%" );
	},
	focusInput            : function ( ) {
		return true;
	},
	blurInput             : function ( ) {
		return true;
	},
	widgetHeader          : function ( text, themeBar, themeIcon, iconClass ) {
		return "<div class='navbar " + themeBar + "'><div class=\"navbar-header\">" + 
			"<span class=\"navbar-brand\">" + text + "</span>" + 
			"</div>" + "<ul class=\"nav navbar-nav navbar-right\">" +
			"<li><a href=\"#\" class=\"closer\"><span class='glyphicon glyphicon-" + 
			iconClass + "'></span>&nbsp;&nbsp;</a></li></ul></div>";
	},
	intHeader             : function ( text ) {
		return $(
			"<div class='text-center dbHeader'>" +
			"<h4>" + text + "</h4>" +
			"</div>"
		);
	},
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div style='padding-bottom: 5px;'>");


		$( this.button(firstBtnCls + " pull-left dbCalPrev", firstBtnIcn, "") ).appendTo( returnVal );
		$( this.button(secondBtnCls + " pull-right dbCalNext", secondBtnIcn, "") ).appendTo( returnVal );
		$("<h4 class='text-center' style='line-height: 1.5'>" + txt + "</h4>").appendTo( returnVal );

		return returnVal;
	},
	calGrid               : function () {
		return $(
			"<div style='padding:5px; clear:both'>" +
			"<table class='dbCalGrid' style='width:100%'>" +
			"</table></div>"
		);
	},
	calRow                : function () {
		return $( "<tr>" );
	},
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent btn-sm btn btn-" + 
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='text-center'" + style + ">" +
			"<a href='#' style='width:100%' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},
	calNonButton          : function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " font-weight-bold" : "";

		return $("<td class='text-center" + cls + "'" + style + ">" + text + "</td>");
	},
	calPickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div style='padding:5px;'>";

		returnVal += "<div class='col-sm-8' style='padding:0; margin:0'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-sm-4' style='padding:0; margin:0'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},
	calDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div style='padding:5px'>";
		returnVal += this._stdSel( list, "dbCalPickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},
	dboxContainer         : function () {
		return $("<table style='margin: 5px;'>");
	},
	dboxRow               : function () {
		return $("<tr>");
	},
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<td><div class='btn-group-vertical dbBox" + mainCls + "'>";

		returnVal += this.button( nextCls + " dbBoxNext" , nextIcn, "" );
		if ( label !== null ) {
			returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
				"style='height:auto'>" + label + "</div>";
		}
		returnVal += "<input type='text' ";
		returnVal += "class='form-control input-sm text-center' ";
		returnVal += "style='border-radius: 0; padding: 5px 0;'>";
		returnVal += this.button( prevCls + " dbBoxPrev" , prevIcn, "" );

		returnVal += "</div></td>";

		return $(returnVal);
	},
	fboxContainer         : function ( size ) {
		return $(
			"<div class='d-flex border-top border-bottom m-2' style='height: " + 
			size + 
			"; overflow: hidden'>"
		);
	},
	fboxDurLabels         : function ( ) {
		return $(
			"<div class='d-flex mx-2 mt-2' style='margin-bottom: -8px;'>"
		);
	},
	fboxDurLabel          : function ( text, items ) {
		return $( 
			"<div class='text-center' style='width: " + ( 100 / items ) + "%'>" + 
			text + 
			"</div>"
		);
	},
	fboxRollerContain     : function () {
		return $( "<div class='flex-fill'>" );
	},
	fboxRollerParent      : function () {
		return $( "<ul class='list-group'>" );
	},
	fboxRollerChild       : function ( text, cls ) {
		return $( 
			"<li class='list-group-item p-1 text-center list-group-item-" + cls + "'>" + 
			text + 
			"</li>"
		);
	},
	fboxLens              : function () {
		return $( "<div class='p-4 border border-dark shadow mx-1'>" );
	}
};



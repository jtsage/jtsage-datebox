/* JTSage-DateBox 
 *
 * Bootstrap option overrides and 
 * basic input/output functions
 */

mergeOpts({
	theme_clearBtnCls : "outline-secondary",
	theme_clearBtnIcn : "eraser",

	theme_closeBtnCls : "outline-secondary",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "outline-secondary",
	theme_cancelBtnIcn : "times",

	theme_tomorrowBtnCls : "outline-secondary",
	theme_tomorrowBtnIcn : "fast-forward",

	theme_todayBtnCls : "outline-secondary",
	theme_todayBtnIcn : "step-forward",

	theme_dropdownContainer : "bg-light border border-dark mt-1",
	theme_modalContainer : "bg-light border border-dark p-2 m-0",
	theme_inlineContainer : "bg-light border border-dark my-2",

	theme_headerTheme : "bg-dark",
	theme_headerBtnCls : "outline-secondary",
	theme_headerBtnIcn : "times",

	theme_cal_Today : "outline-info",
	theme_cal_DayHigh : "outline-warning",
	theme_cal_Selected : "outline-success",
	theme_cal_DateHigh : "outline-warning",
	theme_cal_DateHighAlt : "outline-danger",
	theme_cal_DateHighRec : "outline-warning",
	theme_cal_Default : "outline-primary",
	theme_cal_OutOfBounds : "outline-secondary border-0",

	theme_cal_NextBtnIcn : "plus",
	theme_cal_NextBtnCls : "outline-dark",
	theme_cal_PrevBtnIcn : "minus",
	theme_cal_PrevBtnCls : "outline-dark",

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "outline-dark",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "outline-dark",

	theme_backgroundMask : {
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,.4)"
	},
	theme_headStyle : false,

	disabledState: "disabled",
	buttonIconDate: "calendar",
	buttonIconTime: "clock-o fa-clock",

	btnCls: " btn btn-sm btn-outline-",
	icnCls: " fa fa-",

	clickEvent: "click",
	tranDone: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});

JTSageDateBox.styleFunctions = {
	button: function( themeClass, iconClass, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='btn btn-sm btn-" + themeClass + "'>";
		retty += ( iconClass !== false ) ? "<span class='fa fa-" + iconClass + "'></span> " : "";
		retty += contents + "</a>";
		return retty;
	},
	buttonGroup: function ( collapse) {
		var cls = ( collapse === true ) ? "btn-group" : "btn-group-vertical";

		return $("<div class='" + cls + " w-100 p-1'>");
	},
	baseInputWrap: function ( originalInput ) { 
		/* Set up a wrap around the input for styling, and return it */
		return originalInput.wrap("<div class='input-group'>").parent();
	},
	baseInputButton: function ( iconClass, title ) {
		return "<div class='input-group-append' title='" + title + "'>" +
			"<div class='input-group-text'>" + 
			"<span class='fa fa-" + iconClass + "'></span>" + 
			"</div></div>";
	},
	baseInputButtonFinder: function ( originalInputWrap ) {
		return originalInputWrap.find(".input-group-append");
	},
	baseInputNoButton: function ( originalInputWrap ) {
		originalInputWrap.addClass( "w-100" );
	},
	focusInput: function ( originalInput ) {
		originalInput.addClass( "ui-focus" );
	},
	blurInput: function ( originalInput ) {
		originalInput.removeClass( "ui-focus" );
	},
	widgetHeader: function ( text, themeBar, themeIcon, iconClass ) {
		return "<div class='navbar " + themeBar + "'>" + 
			"<h5 class='text-white'>" + text + "</h5>" + 
			this.button( themeIcon + " closer", iconClass, "") + "</div>";
	},
	intHeader: function ( text ) {
		return $(
			"<div class='my-2 text-center dbHeader'>" +
			"<h5>" + text + "</h5>" +
			"</div>"
		);
	},
	calHeader: function ( text, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div class='my-2 text-center d-flex justify-content-between'>");

		$( this.button(firstBtnCls + " mx-2 dbCalPrev", firstBtnIcn, "") ).appendTo( returnVal );
		$("<h5>" + text + "</h5>").appendTo( returnVal );
		$( this.button(secondBtnCls + " mx-2 dbCalNext", secondBtnIcn, "") ).appendTo( returnVal );

		return returnVal;
	},
	calGrid: function () {
		return $( "<div class='w-100 p-1'><table class='dbCalGrid w-100'></table></div>" );
	},
	calRow: function () {
		return $( "<tr>" );
	},
	calButton: function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent w-100 btn-sm btn btn-" + 
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},
	calNonButton: function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " font-weight-bold" : "";

		return $("<td class='m-0 p-0 text-center" + cls + "'" + style + ">" + text + "</td>");
	},
	calPickers: function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='row my-2 mx-1'>";

		returnVal += "<div class='col-sm-8 p-0 m-0'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-sm-4 p-0 m-0'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},
	calDateList: function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='row my-2 mx-1'>";
		returnVal += this._stdSel( list, "dbCalPickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},
	dboxContainer: function () {
		return $("<div class='d-flex p-1'>");
	},
	dboxControl: function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<div class='btn-group-vertical flex-fill dbBox" + mainCls + "'>";

		returnVal += this.button( nextCls + " dbBoxNext" , nextIcn, "" );
		if ( label !== null ) {
			returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
				"style='height:auto'>" + label + "</div>";
		}
		returnVal += "<input type='text' ";
		returnVal += "class='form-control form-control-sm text-center px-0 rounded-0'>";
		returnVal += this.button( prevCls + " dbBoxPrev" , prevIcn, "" );

		returnVal += "</div>";

		return $(returnVal);
	}

};


JTSageDateBox.baseMode = "bootstrap4";

JTSageDateBox._controlGroup = function(element) {
	var o = this.options;

	if ( o.useCollapsedBut ) {
		element.find( "a" ).css({ width: "auto" });
		element.addClass( "btn-group btn-group-justified" );
	} else {
		element.addClass( "btn-group-vertical" );
	}
	return element;
};


/* JTSage-DateBox 
 *
 * Bootstrap option overrides and 
 * basic input/output functions
 */

mergeOpts({
	theme: {
		clearBtnCls : "outline-secondary",
		clearBtnIcn : "eraser",

		closeBtnCls : "outline-secondary",
		closeBtnIcn : "check",

		cancelBtnCls : "outline-secondary",
		cancelBtnIcn : "times",

		tomorrowBtnCls : "outline-secondary",
		tomorrowBtnIcn : "fast-forward",

		todayBtnCls : "outline-secondary",
		todayBtnIcn : "step-forward",

		dropdownContainer : "bg-light border border-dark mt-1",
		modalContainer : "bg-light border border-dark m-4",
		inlineContainer : "bg-light border border-dark my-2",

		headerTheme : "bg-dark",
		headerBtnCls : "outline-secondary",
		headerBtnIcn : "times",

		cal_Today : "outline-info",
		cal_DayHigh : "outline-warning",
		cal_Selected : "outline-info",
		cal_DateHigh : "outline-warning",
		cal_DateHighAlt : "outline-danger",
		cal_DateHighRec : "outline-warning",
		cal_Default : "outline-dark",

		backgroundMask : {
			position: "fixed",
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0,0,0,.4)"
		}
	},

	themeDateToday: "info",
	themeDayHigh: "warning",
	themeDatePick: "info",
	themeDateHigh: "warning",
	themeDateHighAlt: "danger",
	themeDateHighRec: "warning",
	themeDate: "dark",
	themeButton: "secondary",
	themeInput: "default",
	transition: "fade",

	themeClearButton: "secondary",
	themeCancelButton: "secondary",

	themeCloseButton: "secondary",
	themeTomorrowButton: "secondary",
	themeTodayButton: "secondary",

	buttonIconDate: "calendar",
	buttonIconTime: "clock-o fa-clock",
	disabledState: "disabled",

	bootstrapDropdown: true,
	bootstrapDropdownRight: true,

	bootstrapModal: false,
	bootstrapResponsive: true,
	
	calNextMonthIcon: "plus",
	calPrevMonthIcon: "minus",
	useInlineAlign: "left",

	btnCls: " btn btn-sm btn-outline-",
	icnCls: " fa fa-",

	s: {
		cal: {
			prevMonth : "<span title='{text}' class='fa fa-{icon}'></span>",
			nextMonth : "<span title='{text}' class='fa fa-{icon}'></span>",
			botButton : "<a href='#' class='{cls}' role='button'>" +
				"<span class='{icon}'></span> {text}</a>",
		}
	},

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
			"<button type='button' class='btn btn-sm closer btn-" + themeIcon + "'>" + 
			"<span class='fa fa-" + iconClass + "'></span></button></div>";
	},
	calGrid: function () {
		return "<table class='w-100'>";
	},
	calRow: function ( contents ) {
		return "<tr>" + contents  + "</tr>";
	},
	calNonButton: function ( text, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			);
		return "<td class='text-center font-weight-bold'" + style + ">" + text + "</td>";
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


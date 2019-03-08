/* JTSage-DateBox 
 *
 * Bootstrap option overrides and 
 * basic input/output functions
 */

mergeOpts({
	theme: {
		clearBtnCls : "default",
		clearBtnIcn : "erase",

		closeBtnCls : "default",
		closeBtnIcn : "ok",

		cancelBtnCls : "default",
		cancelBtnIcn : "remove",

		tomorrowBtnCls : "default",
		tomorrowBtnIcn : "send",

		todayBtnCls : "default",
		todayBtnIcn : "send",

		dropdownContainer : "panel",
		modalContainer : "panel",
		inlineContainer : "panel",

		headerTheme : "navbar-default",
		headerBtnCls : "default",
		headerBtnIcn : "remove",

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
	themeDatePick: "success",
	themeDateHigh: "warning",
	themeDateHighAlt: "danger",
	themeDateHighRec: "warning",
	themeDate: "default",
	themeButton: "default",
	themeInput: "default",
	transition: "fade",

	themeClearButton: "default",
	themeCancelButton: "default",
	themeCloseButton: "default",
	themeTomorrowButton: "default",
	themeTodayButton: "default",

	buttonIconDate: "calendar",
	buttonIconTime: "time",
	disabledState: "disabled",

	bootstrapDropdown: true,
	bootstrapDropdownRight: true,

	bootstrapModal: false,
	bootstrapResponsive: true,
	
	calNextMonthIcon: "plus",
	calPrevMonthIcon: "minus",
	useInlineAlign: "left",

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
	button: function( themeClass, iconClass, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='btn btn-sm btn-" + themeClass + "'>";
		retty += ( iconClass !== false ) ?
			"<span class='glyphicon glyphicon-" + iconClass + "'></span> " :
			"";
		retty += contents + "</a>";
		return retty;
	},
	baseInputWrap: function ( originalInput ) { 
		/* Set up a wrap around the input for styling, and return it */
		return originalInput.wrap("<div class='input-group'>").parent();
	},
	baseInputButton: function ( iconClass, title ) {
		return "<div class='input-group-addon' title='" + title + "'>" +
			"<span class='glyphicon glyphicon-" + iconClass + "'></span>" + 
			"</div>";
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
			"<span class='text-white'>" + text + "</span>" + 
			"<button type='button' class='pull-right btn btn-sm closer btn-" + themeIcon + "'>" + 
			"<span class='glyphicon glyphicon-" + iconClass + "'></span></button></div>";
	}
};

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


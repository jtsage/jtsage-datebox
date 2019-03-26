 /**
     * JTSage-DateBox
     * @fileOverview Bulma Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
     *
     * This framework requires use of [id]-dbAttach ID's. (hella-nest)
     *
     * CalBox   : A+
     * DateBox  : A+
     * FlipBox  : A- (need multiline buttons.  pending in the project repo)
     * SlideBox : A (could use some borders maybe)
     * 
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

mergeOpts({
	theme_clearBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer    : "card",
	theme_modalContainer       : "card",
	theme_inlineContainer      : "card",

	theme_headerTheme          : "is-dark",
	theme_headerBtnCls         : "is-light",
	theme_headerBtnIcn         : "cancel",

	theme_cal_Today       : "is-info",
	theme_cal_DayHigh     : "is-warning",
	theme_cal_Selected    : "is-success",
	theme_cal_DateHigh    : "is-warning",
	theme_cal_DateHighAlt : "is-danger",
	theme_cal_DateHighRec : "is-warning",
	theme_cal_Default     : "is-outlined is-primary",
	theme_cal_OutOfBounds : "is-white",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "is-white",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "is-white",

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "is-outlined is-dark",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "is-outlined is-dark",
	theme_dbox_Inputs     : false, //UNUSED

	theme_fbox_Selected   : "is-success",
	theme_fbox_Default    : "is-light",
	theme_fbox_Forbidden  : "is-danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "is-info",
	theme_slide_DayHigh     : "is-warning",
	theme_slide_Selected    : "is-success",
	theme_slide_DateHigh    : "is-warning",
	theme_slide_DateHighAlt : "is-danger",
	theme_slide_DateHighRec : "is-warning",
	theme_slide_Default     : "is-primary",

	theme_slide_NextBtnIcn     : "plus",
	theme_slide_NextBtnCls     : "is-white",
	theme_slide_PrevBtnIcn     : "minus",
	theme_slide_PrevBtnCls     : "is-white",
	theme_slide_NextDateBtnIcn : "next",
	theme_slide_NextDateBtnCls : "is-white",
	theme_slide_PrevDateBtnIcn : "prev",
	theme_slide_PrevDateBtnCls : "is-white",

	theme_slide_Pickers  : false, // UNUSED
	theme_slide_DateList : false, // UNUSED

	theme_backgroundMask : {
		position          : "fixed",
		left              : 0,
		top               : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : "rgba(0,0,0,.4)"
	},
	theme_headStyle : " .db-show {padding-bottom: .3em; margin-bottom:.3em}",
	theme_spanStyle : false,

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState  : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",

	// Bulma does not seem to play nice with auto either.
	displayDropdownPosition : "top-end",
});

JTSageDateBox.baseMode = "bulma";

JTSageDateBox.styleFunctions = {
	/*
	 * Make a button
	 */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='button " + themeClass + "'>";
		retty += ( icon !== false ) ? "<span>" + this.icons.getIcon(icon) + "</span> " : "";
		retty += contents + "</a>";

		return retty;
	},

	/*
	 * Make a button group
	 * Collapse not available for this framework
	 */
	buttonGroup           : function ( ) {
		return $(
			"<div class='buttons is-fullwidth' style='padding: .3em;'>"
		);
	},

	/*
	 * Wrap the original input in a div so we can add a button to it
	 */
	baseInputWrap         : function ( originalInput ) { 
		originalInput.closest( ".field" ).addClass( "has-addons" );
		originalInput.closest( ".control" ).addClass( "is-expanded" );
		return originalInput.closest( ".field" );
	},

	/*
	 * Create the open button that is added to the input
	 */
	baseInputButton       : function ( icon, title ) {
		return "<div class=\"control\"><a title=\"" + title + "\" class=\"button is-primary\">" +
			this.icons.getIcon( icon ) + "</a></div>";
	},

	/*
	 * When not using the open button, we may need to alter the wrap class differently
	 */
	baseInputNoButton     : function (  ) {
		return true;
	},

	/*
	 * Run when the input is focused
	 */
	focusInput            : function (  ) {
		return true;
	},

	/*
	 * Run when the input is un-focused
	 */
	blurInput             : function (  ) {
		return true;
	},

	/*
	 * Make the header for every mode
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "" +
			"<div class=\"navbar " + themeBar + "\"><div class=\"navbar-brand\">" +
			"<strong class=\"navbar-item\">" + text + "</strong>" +
			"</div><div class=\"is-active navbar-menu\">" +
			"<div class=\"navbar-end\"><div class=\"navbar-item\">" +
			this.styleFunctions.button.apply( this, [ themeIcon + " dbCloser", icon, "" ] ) +
			"</div></div></div></div>";
	},


	/*
	 * Make an internal header ( datebox & flipbox )
	 */
	intHeader             : function ( text ) {
		return $(
			"<div class='is-size-5 has-text-centered dbHeader' style='padding: .3em 0'>" +
			text +
			"</div>"
		);
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 */
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div class='columns is-mobile is-vcentered' style='padding:.3em'>");

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [ 
				firstBtnCls + " is-fullwidth dbCalPrev",
				firstBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		$("<div class='column'><div class='title is-5 has-text-centered'>" + txt + "</div></div>")
			.appendTo( returnVal );

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [
				secondBtnCls + " is-fullwidth dbCalNext",
				secondBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 */
	calGrid               : function () {
		return $(
			"<div style='padding:.3em'><table class='dbCalGrid' style='width:100%'></table></div>"
		);
	},

	/*
	 * Create a calbox grid row.  Probably a tr
	 */
	calRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid item in calbox.
	 */
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent is-fullwidth button " + 
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='has-text-centered'" + style + ">" +
			"<a href='#' style='padding-left:0; padding-right:0;' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},

	/*
	 * Create a non-button calbox grid box
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " has-text-weight-bold" : "";

		return $("<td class='has-text-centered" + cls + "'" + style + ">" + text + "</td>");
	},

	/*
	 * Create the year and month picker for calbox.
	 */
	calPickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='columns is-mobile is-gapless' style='padding:.3em'>";

		returnVal += "<div class='column is-8'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "" );
		returnVal += "</div></div>";

		returnVal += "<div class='column is-4'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "" );
		returnVal += "</div></div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the calendar drop down quick pick list.
	 */
	calDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='select is-fullwidth' ";
		returnVal += "style='margin:.8em 0; padding:0 .3em;'>";
		returnVal += this._stdSel( list, "dbCalPickList", "" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the datebox mode container.
	 */
	dboxContainer         : function () {
		return $("<div>");
	},

	/*
	 * Make the datebox control row
	 */
	dboxRow               : function () {
		return $(
			"<div class='columns is-mobile is-gapless' " +
			"style='padding-left:.3em; padding-right: .3em; margin-bottom: .3em' >"
		);
	},

	/*
	 * Make a datebox +/-/input control
	 */
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<div class='column dbBox" + mainCls + "'>";

		returnVal += this.styleFunctions.button.apply( this, [
			nextCls + " dbBoxNext is-fullwidth" ,
			nextIcn,
			""
		] );

		if ( label !== null ) {
			returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
				"style='height:auto'>" + label + "</div>";
		}
		returnVal += "<input style='padding-left:0;padding-right:0' type='text' ";
		returnVal += "class='input has-text-centered'>";

		returnVal += this.styleFunctions.button.apply( this, [
			prevCls + " dbBoxPrev is-fullwidth" ,
			prevIcn,
			""
		] );

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the container for the flipbox
	 */
	fboxContainer         : function ( size ) {
		return $(
			"<div class='columns is-mobile is-gapless' style='margin: 0; padding: 0 3px; height: " +
			size + 
			"; overflow: hidden'>"
		);
	},

	/*
	 * Make a container for flipbox labels
	 */
	fboxDurLabels         : function ( ) {
		return $(
			"<div class='columns is-mobile is-gapless' style='margin-bottom: 0px;'>"
		);
	},

	/*
	 * Make a flibox label
	 */
	fboxDurLabel          : function ( text, items ) {
		return $( 
			"<div class='column has-text-centered' style='width: " + ( 100 / items ) + "%'>" + 
			text + 
			"</div>"
		);
	},

	/*
	 * Make a flipbox roller container (outermost)
	 */
	fboxRollerContain     : function () {
		return $( "<div class='column'>" );
	},

	/*
	 * Make a flipbox roller container (middle) - usually a UL
	 */	
	fboxRollerParent      : function () {
		return $( "<div>" );
	},

	/*
	 * Make a flipbox element (innermost) - usually a LI
	 */
	fboxRollerChild       : function ( text, cls ) {
		return $( 
			"<p class='field' style='margin-bottom: 0px'>" + 
			"<span style='width: 100%' class='tag is-medium " + cls + "'>" + 
			text + 
			"</span></p>"
		);
	},

	/*
	 * Make the flipbox lens
	 */
	fboxLens              : function () {
		return $( 
			"<div class='lensylens' style='height:48px; border:1px solid black; " +
			"box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); margin-left: 1px; margin-right: 1px;' >"
		);
	},

	/*
	 * Make the header for slidebox
	 */
	slideHeader           : function ( txt, prevBtnIcn, prevBtnCls, nextBtnIcn, nextBtnCls ) {
		var returnVal = $("<div class='columns is-mobile is-vcentered' style='padding:.3em'>");

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [ 
				prevBtnCls + " is-fullwidth dbSlidePrev",
				prevBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		$("<div class='column'><div class='title is-5 has-text-centered'>" + txt + "</div></div>")
			.appendTo( returnVal );

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [
				nextBtnCls + " is-fullwidth dbSlideNext",
				nextBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the year and month picker for slide.
	 */
	slidePickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='columns is-mobile is-gapless' style='padding:.3em'>";

		returnVal += "<div class='column is-8'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.month, "dbSlidePickMonth", "" );
  		returnVal += "</div></div>";

		returnVal += "<div class='column is-4'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.year, "dbSlidePickYear", "" );
  		returnVal += "</div></div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the slidebox drop down quick pick list.
	 */
	slideDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='select is-fullwidth' ";
		returnVal += "style='margin:.8em 0; padding:0 .3em;'>";
		returnVal += this._stdSel( list, "dbSlidePickList", "" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the grid container for slidebox (usually a table)
	 */
	slideGrid               : function () {
		return $( "<div><table class='dbSlideGrid' style='width:100%'></table></div>" );
	},

	/*
	 * Make the grid for for slidebox (usually a TR)
	 */
	slideRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid date in slidebox.
	 */
	slideDateButton         : function ( data ) {
		var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls     = "class='dbEventS button is-paddingless is-fullwidth " +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("" +
			"<td class='has-text-centered'" + style + ">" +
			"<span class='is-size-7'>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] + 
			"</span>" +
			"<a href='#' " + cls + " " + disable + ">" + 
			"<span class='is-size-4'>" + data.dateObj.getDate() +  
			"</span></a>" + "</td>");
	},

	/*
	 * Create next/prev week buttons for slidebox
	 */
	slideMoveButton         : function ( eventCls, icon, theme ) {
		var style = " style='vertical-align: middle; width: " + ( ( 100 / 8 ) / 2 ) + "%'",
			cls   = "class='button is-small is-paddingless is-fullwidth " +
				theme + " " + eventCls + "'";

		return $(
			"<td class='has-text-centered'" + style + ">" +
			"<a href='#' " + cls + ">" + 
			this.icons.getIcon( icon )  + "</a></td>"
		);
	},
	
	flipPosition            : function () {
		var fullRoller, firstItem, height_Roller, intended_Top,
			w                 = this,
			o                 = this.options,
			height_Container  = w.d.intHTML.find( ".dbRollerC" ).height(),
			height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight( true ),
			theLens           = w.d.intHTML.find( ".dbLens" ).first(),
			height_Lens       = theLens.outerHeight();


		// Trap for run too early.
		if ( height_Container < 1 ) { return true; }

		// Lens top:
		// Negative Half the parent height is center.
		// Add Negative half the lens height.
		intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
		theLens.css( { 
			top          : intended_Top,
			marginBottom : -1 * height_Lens
		} );
		
		w.d.intHTML.find( ".dbRoller" ).each( function() {
			fullRoller    = $(this);
			firstItem     = fullRoller.children().first();

			// No RE-DO's, if it has a style, it's probably right.
			if ( firstItem.css( "marginTop" ) === "0px" ) {
					
				height_Roller = fullRoller.outerHeight(false);

				// Negative Half the height of the roller ( gets center to top border of view)
				// Add half of the view container height.
				intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

				if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

				firstItem.css("margin-top", intended_Top);
			}
		});
	},

	/*
	 * Find the attacment point for the control
	 */
	findAttachPoint : function( isInline ) {
		var w               = this, last, exitLoop = 0,
			possibleAttach  = w.d.wrap,
			hardAttachPoint = $( "body" ).find( "#" + w.baseID + "-dbAttach" );
			

		// If [id]-dbAttach exists, that's the attachment point, always.
		if ( hardAttachPoint.length === 1 ) { return hardAttachPoint; }

		// Not inline, either modal or popup
		if ( !isInline ) {
			return $( "body" );
		}

		// Inline or blind
		last = possibleAttach;
		while ( true ) {
			exitLoop++;
			possibleAttach = possibleAttach.parent();
			if ( possibleAttach.is( "form" ) ) { return last; }
			if ( exitLoop > 20 ) { return $( "body" ); }
			last = possibleAttach;
		}

	},

	/*
	 * Hide the input element completely.
	 */
	hideInput : function() {
		var w          = this,
			last       = w.d.wrap,
			exitLoop   = 0,
			hideMe     = w.d.wrap;

		while ( true ) {
			exitLoop++;
			hideMe = hideMe.parent();
			if ( hideMe.is( "form" ) ) { last.hide(); return true; }
			if ( exitLoop > 20 ) { w.d.wrap.hide(); return true; }
			last = hideMe;
		}
	}
};

/**
 * JTSage-DateBox
 * @fileOverview Responsible for positioning the widget
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */


/**
 * Make sure a position number isn't less than zero
 * 
 * @param {number} test Number to test
 * @return {number} Resulting number
 */
JTSageDateBox._posZero = function ( test ) {
	return ( test < 0 ) ? 0 : test;
};

/** 
 * Find position for modal
 * 
 * @return {object} CSS for the datebox in modal mode
 */
JTSageDateBox.getModalPosition = function ( ) {
	var w      = this,
		fixed  = this.options.displayForcePosition,
		widget = w.d.mainWrap[ 0 ].getBoundingClientRect();

	if ( fixed !== false ) {
		return {
			position : "absolute",
			top      : fixed[0],
			left     : fixed[1]
		};
	}
	return {
		position        : "fixed",
		top             : "50%",
		left            : "50%",
		"margin-left"   : -1 * ( widget.width / 2 ),
		"margin-top"    : -1 * ( widget.height / 2 )
	};
};

/** 
 * Find position for dropdown
 * 
 * We do all of the possible calculations every time. Simple math is cheap.
 * 
 * @return {object} CSS for the widget in dropdown mode.
 */
JTSageDateBox.getDropPosition = function ( placement ) {
	var w         = this, compd,
		o         = this.options,
		fixed     = this.options.displayForcePosition,
		rect      = w.d.wrap[0].getBoundingClientRect(),
		widget    = w.d.mainWrap[0].getBoundingClientRect(),
		tOff      = window.pageYOffset,
		lOff      = window.pageXOffset,
		smallScr  = (
			Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
			o.breakpointWidth.replace("px", "")
		);

	compd = {
		centerLeft : {
			top  : w._posZero( tOff + rect.top + ( rect.height / 2 ) - ( widget.height / 2 ) ),
			left : w._posZero( lOff + rect.left )
		},
		centerRight : {
			top  : w._posZero( tOff + rect.top + ( rect.height / 2 ) - ( widget.height / 2 ) ),
			left : w._posZero( lOff + rect.left + rect.width - ( widget.width ) )
		},
		centerMiddle : {
			top  : w._posZero( tOff + rect.top + ( rect.height / 2 ) - ( widget.height / 2 ) ),
			left : w._posZero( lOff + rect.left + ( rect.width / 2 ) - ( widget.width / 2 ) )
		},
		topLeft : {
			top  : w._posZero( tOff + rect.top - widget.height - 1 ),
			left : w._posZero( lOff + rect.left )
		},
		topRight : {
			top  : w._posZero( tOff + rect.top - widget.height - 1 ),
			left : w._posZero( lOff + rect.left + rect.width - ( widget.width ) )
		},
		topMiddle : {
			top  : w._posZero( tOff + rect.top - widget.height - 1 ),
			left : w._posZero( lOff + rect.left + ( rect.width / 2 ) - ( widget.width / 2 ) )
		},
		bottomLeft : {
			top  : w._posZero( tOff + rect.top + rect.height ),
			left : w._posZero( lOff + rect.left )
		},
		bottomRight : {
			top  : w._posZero( tOff + rect.top + rect.height ),
			left : w._posZero( lOff + rect.left + rect.width - widget.width )
		},
		bottomMiddle : {
			top  : w._posZero( tOff + rect.top + rect.height ),
			left : w._posZero( lOff + rect.left + ( rect.width / 2) - ( widget.width / 2 ) )
		}
	};

	if ( typeof compd[placement] === "undefined" ) {
		placement = "bottomRight";
	}
	
	if ( fixed !== false ) {
		return {
			position : "absolute",
			top      : fixed[0],
			left     : fixed[1]
		};
	}

	return {
		position : "absolute",
		top      : compd[placement].top,
		left     : ( smallScr ) ? 0 : compd[placement].left
	};
	
};
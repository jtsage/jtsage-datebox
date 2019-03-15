 /**
     * JTSage-DateBox
     * @fileOverview Widget binder.  Used only in the test enviroment.
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

/**
 * Enhance the date object for easier use.
 *
 * These are direct extensions to the JavaScript date object
 *
 * All methods are also chainable, which is not true of some implementations
 * in a browser.
 *
 * @memberOf JTSageDateBox
 * @namespace JTSageDateBox._enhanceDate
 */

JTSageDateBox._enhanceDate = function() {
	$.extend(this._date.prototype, {

		/**
		 * Return a copy of the date, not altering the original
		 *
		 * You may specify partial arrays only as deep as the most
		 * precise element you want to adjust or override.  Zeros will
		 * not alter that element. Overrides takes precedence over adjustments
		 * 
		 * @param  {array} adjust [y,m,d,h,i,s,ms] Adjust part of the date
		 * @param  {array} override [y,m,d,h,i,s,ms] Override part of the date
		 * @return {object} JavaScript date object
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		copy: function( adjust, override ) {
			
			adjust = $.extend( [0,0,0,0,0,0,0], adjust );
			override = $.extend( [0,0,0,0,0,0,0], override );
			return new Date(
				( ( override[ 0 ] > 0 ) ? override[ 0 ] : this.get( 0 ) + adjust[ 0 ] ),
				( ( override[ 1 ] > 0 ) ? override[ 1 ] : this.get( 1 ) + adjust[ 1 ] ),
				( ( override[ 2 ] > 0 ) ? override[ 2 ] : this.get( 2 ) + adjust[ 2 ] ),
				( ( override[ 3 ] > 0 ) ? override[ 3 ] : this.get( 3 ) + adjust[ 3 ] ),
				( ( override[ 4 ] > 0 ) ? override[ 4 ] : this.get( 4 ) + adjust[ 4 ] ),
				( ( override[ 5 ] > 0 ) ? override[ 5 ] : this.get( 5 ) + adjust[ 5 ] ),
				( ( override[ 6 ] > 0 ) ? override[ 5 ] : this.get( 6 ) + adjust[ 6 ] ));
		},

		/**
		 * Adjust the date by a relative amount.
		 * @param  {number} type Element to shift, 0 = year, 5 = seconds
		 * @param  {number} amount Offset amount, positive or negative
		 * @return {object} JavaScript date object
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		adj: function (type, amount) {
			// Adjust the date.  Yes, this is chainable 
			if ( typeof amount !== "number" || typeof type !== "number" ) {
				throw new Error( "Invalid Arguments" );
			}
			switch ( type ) {
				case 0 : this.setD( 0, this.get( 0 ) + amount ); break;
				case 1 : this.setD( 1, this.get( 1 ) + amount ); break;
				case 2 : this.setD( 2, this.get( 2 ) + amount ); break;
				case 3 : amount *= 60;
					/* falls through */
				case 4 : amount *= 60;
					/* falls through */
				case 5 : amount *= 1000;
					/* falls through */
				case 6 : this.setTime( this.getTime() + amount ); break;
			}
			return this;
		},

		/**
		 * Set part of the date, chainable
		 * 
		 * @param {number} type Element to set, 0 = year, 5 = seconds
		 * @param {number} amount Value to set
		 * @return {object} JavaScript date object
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		setD: function(type, amount) {
			// A chainable version of setWhatever() 
			switch ( type ) {
				case 0 : this.setFullYear( amount );     break;
				case 1 : this.setMonth( amount );        break;
				case 2 : this.setDate( amount );         break;
				case 3 : this.setHours( amount );        break;
				case 4 : this.setMinutes( amount );      break;
				case 5 : this.setSeconds( amount );      break;
				case 6 : this.setMilliseconds( amount ); break;
			}
			return this;
		},

		/**
		 * Get part of the date
		 * 
		 * @param  {number} type Element to set, 0 = year, 5 = seconds
		 * @return {number} Date part
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		get: function(type) {
			// Chainable version of get. Also shorter.
			switch ( type ) {
				case 0 : return this.getFullYear();
				case 1 : return this.getMonth();
				case 2 : return this.getDate();
				case 3 : return this.getHours();
				case 4 : return this.getMinutes();
				case 5 : return this.getSeconds();
				case 6 : return this.getMilliseconds();
			}
			return false;
		},
		/**
		 * Get the hour in 12 hour format - midnight = 12, 13:00 = 1
		 * @return {number} Hour
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		get12hr: function() {
			if ( this.get( 3 ) === 0 ) { return 12; }
			if ( this.get( 3 ) < 13 )  { return this.get( 3 ); }
			return this.get( 3 ) - 12;
		},

		/**
		 * Get an ISO-8601 version of the date : YYYY-MM-DD
		 * 
		 * @return {string} ISO-8601 String
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		iso: function() {
			var arr = [0,0,0], i = 0;
			for ( i=0; i < 3; i++ ) {
				arr[ i ] = this.get( i );
				if ( i === 1 ) { arr[ i ]++; }
				if ( arr[i] < 10 ) { arr[ i ] = "0" + String( arr[ i ] ); }
			}
			return arr.join( "-" );
		},

		/**
		 * Retrieve a numericly comparable representation of the date : YYYYMMDD
		 * 
		 * @return {number} Date as an integer
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		comp: function () {
			return parseInt( this.iso().replace( /-/g, "" ), 10 );
		},

		/**
		 * Get the number of seconds since epoch
		 * 
		 * @return {number} Seconds
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		getEpoch: function() {
			return Math.floor( this.getTime() / 1000 );
		},

		/**
		 * Get the number of days since epoch
		 * 
		 * @return {number} Days
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		getEpochDays: function() {
			return Math.floor( this.getTime() / ( 1000*60*60*24 ) );
		},

		/**
		 * Get the date as an array
		 * 
		 * @return {array} [y,m,d,h,i,s]
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		getArray: function() {
			var arr = [ 0, 0, 0, 0, 0, 0 ], i = 0;
			for ( i = 0; i < 6; i++ ) {
				arr[i] = this.get( i );
			}
			return arr;
		},

		/**
		 * Set date to the first valid day of the current month. 
		 * 
		 * @param {number} day Day of week.  Zero based
		 * @return {object} JavaScript date object
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		setFirstDay: function (day) {
			// Grabs first valid (day) of current month
			this.setD( 2, 1 ).adj( 2, ( day - this.getDay() ) );
			if ( this.get( 2 ) > 10 ) { this.adj( 2, 7 ); }
			return this;
		},

		/**
		 * Set the week number.
		 *
		 * Types : 
		 *  - 0 : Sunday Based
		 *  - 1 : Monday Based
		 *  - 4 : Thursday Based (ISO-8601 standard)
		 *  
		 * @param {number} type Type of week calculation. Day of week probably
		 * @param {number} number Week number
		 * @return {object} JavaScript date object
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		setDWeek: function (type,num) {
			if ( type === 4 ) {
				return this.setD(1,0).setD(2,1).setFirstDay(4).adj(2,-3).adj(2,(num-1)*7);
			}
			return this.setD(1,0).setD(2,1).setFirstDay(type).adj(2,(num-1)*7);
		},

		/**
		 * Get the week number.
		 *
		 * Types : 
		 *  - 0 : Sunday Based
		 *  - 1 : Monday Based
		 *  - 4 : Thursday Based (ISO-8601 standard)
		 *  
		 * @param  {number} type Type of calculation
		 * @return {number} Week number
		 * @memberOf JTSageDateBox._enhanceDate
		 */
		getDWeek: function (type) {
			var t1, t2;

			switch ( type ) {
				case 0:
					t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(0);
					return Math.floor(
						( this.getTime() - ( t1.getTime() + (
							( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
						))) / 6048e5 ) + 1;
				case 1:
					t1 = this.copy([0,-1*this.getMonth()]).setFirstDay(1);
					return Math.floor(
						( this.getTime() - ( t1.getTime() + (
							( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
						))) / 6048e5 ) + 1;
				case 4:
					// this line is some bullshit.  but it does work.
					// (trap for dec 29, 30, or 31st being in the new year's week - these
					// are the only 3 that can possibly fall like this)
					if ( this.getMonth() === 11 && this.getDate() > 28 ) { return 1; }

					t1 = this.copy([0,-1*this.getMonth()],true).setFirstDay(4).adj(2,-3);
					t2 = Math.floor(
						( this.getTime() - ( t1.getTime() + (
							( this.getTimezoneOffset() - t1.getTimezoneOffset() ) * 60000
						))) / 6048e5 ) + 1;

					if ( t2 < 1 ) {
						t1 = this.copy([-1,-1*this.getMonth()]).setFirstDay(4).adj(2,-3);
						return Math.floor((this.getTime() - t1.getTime()) / 6048e5) + 1;
					}
					return t2;
				default:
					return 0;
			}
		}
	});
};


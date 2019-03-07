/* JTSage-DateBox 
 *
 * Date() prototype enhancment
 *
 * Contains enhancments to the Date() prototype.
 */

JTSageDateBox._enhanceDate = function() {
	$.extend(this._date.prototype, {
		copy: function( adjust, override ) {
			// Get a modified copy of the date.
			// First array - Offset the new date by #  
			//    (position determines date part)
			// Second array - If non-zero, force the new date by # 
			//    (position determines date part)
			
			adjust = $.extend( [0,0,0,0,0,0,0], adjust );
			override = $.extend( [0,0,0,0,0,0,0], override );
			return new Date(
				((override[0] > 0 ) ? override[0] : this.get(0) + adjust[0]),
				((override[1] > 0 ) ? override[1] : this.get(1) + adjust[1]),
				((override[2] > 0 ) ? override[2] : this.get(2) + adjust[2]),
				((override[3] > 0 ) ? override[3] : this.get(3) + adjust[3]),
				((override[4] > 0 ) ? override[4] : this.get(4) + adjust[4]),
				((override[5] > 0 ) ? override[5] : this.get(5) + adjust[5]),
				((override[6] > 0 ) ? override[5] : this.get(6) + adjust[6]));
		},
		adj: function (type, amount) {
			// Adjust the date.  Yes, this is chainable 
			if ( typeof amount !== "number" || typeof type !== "number" ) {
				throw new Error( "Invalid Arguments" );
			}
			switch ( type ) {
				case 0: this.setD( 0, this.get(0) + amount ); break;
				case 1: this.setD( 1, this.get(1) + amount ); break;
				case 2: this.setD( 2, this.get(2) + amount ); break;
				case 3: amount *= 60;
					/* falls through */
				case 4: amount *= 60;
					/* falls through */
				case 5: amount *= 1000;
					/* falls through */
				case 6: this.setTime( this.getTime() + amount ); break;
			}
			return this;
		},
		setD: function(type, amount) {
			// A chainable version of setWhatever() 
			switch ( type ) {
				case 0: this.setFullYear(amount); break;
				case 1: this.setMonth(amount); break;
				case 2: this.setDate(amount); break;
				case 3: this.setHours(amount); break;
				case 4: this.setMinutes(amount); break;
				case 5: this.setSeconds(amount); break;
				case 6: this.setMilliseconds(amount); break;
			}
			return this;
		},
		get: function(type) {
			// Chainable version of get. Also shorter.
			switch ( type ) {
				case 0: return this.getFullYear();
				case 1: return this.getMonth();
				case 2: return this.getDate();
				case 3: return this.getHours();
				case 4: return this.getMinutes();
				case 5: return this.getSeconds();
				case 6: return this.getMilliseconds();
			}
			return false;
		},
		get12hr: function() {
			if ( this.get(3) === 0 ) { return 12; }
			if ( this.get(3) < 13 ) { return this.get(3); }
			return this.get(3) - 12;
		},
		iso: function() {
			var arr = [0,0,0], i = 0;
			for ( i=0; i < 3; i++ ) {
				arr[ i ] = this.get( i );
				if ( i === 1 ) { arr[ i ]++; }
				if ( arr[i] < 10 ) { arr[ i ] = "0" + String( arr[ i ] ); }
			}
			return arr.join( "-" );
		},
		comp: function () {
			return parseInt( this.iso().replace( /-/g, "" ), 10 );
		},
		getEpoch: function() {
			return Math.floor( this.getTime() / 1000);
		},
		getEpochDays: function() {
			return Math.floor( this.getTime() / (1000*60*60*24));
		},
		getArray: function() {
			var arr = [0,0,0,0,0,0], i = 0;
			for ( i = 0; i < 6; i++ ) {
				arr[i] = this.get(i);
			}
			return arr;
		},
		setFirstDay: function (day) {
			// Grabs first valid (day) of current month
			this.setD( 2, 1 ).adj( 2, ( day - this.getDay() ) );
			if ( this.get( 2 ) > 10 ) { this.adj( 2, 7 ); }
			return this;
		},
		setDWeek: function (type,num) {
			if ( type === 4 ) {
				return this.setD(1,0).setD(2,1).setFirstDay(4).adj(2,-3).adj(2,(num-1)*7);
			}
			return this.setD(1,0).setD(2,1).setFirstDay(type).adj(2,(num-1)*7);
		},
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


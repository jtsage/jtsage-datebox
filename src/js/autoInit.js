/**
 * JTSage-DateBox
 * @fileOverview Widget binding and auto-init (used only in test enviroment)
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

(function( $ ) {
	$(document).ready( function() {
		$( "[data-role='datebox']" ).each( function() {
			$( this ).datebox();
		});
	});
})( jQuery );

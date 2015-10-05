/* JTSage-DateBox 
 *
 * Widget Binder
 *
 * Contains the logic to auto-init the widget.
 * Used only in test enviroment
 *
 */

(function( $ ) {
	$(document).ready( function() {
		$( "[data-role='datebox']" ).each( function() {
			$( this ).datebox();
		});
	});
})( jQuery );

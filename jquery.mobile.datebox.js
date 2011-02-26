/*
* jQuery Mobile Framework : temporary extension to port jQuery UI's datepicker for mobile
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	
	//bind to pagecreate to automatically enhance date inputs
	$( ".ui-page" ).live( "pagecreate", function(){
		$( "input[type='boxdate'], input[data-type='boxdate']", this ).each(function(){
			var name = $(this).attr('id');
			var current = $(this).val();
			var cDate = new Date();
			
			if ( current != '' ) {
				cDate = new Date(current);
			} 
			
			var theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			
			var boxPage = $("<div id='datebox_" + name + "' data-role='dialog' data-theme='a'>" +
							"<div data-role='header'>" +
								"<div class='ui-title'>" + cDate.toLocaleDateString() + "</div>"+
							"</div>"+
							"<div data-role='content'></div>"+
						"</div>").appendTo( $.mobile.pageContainer ).page();
						
			var boxPageContent = boxPage.find('.ui-content');
			
			boxPageContent.html("<div class='ui-datebox-row'>" + 
								"<div class='ui-datebox-plus datebox-plus-m'>+</div>" +
								"<div class='ui-datebox-plus datebox-plus-d'>+</div>" +
								"<div class='ui-datebox-plus datebox-plus-y'>+</div>" +
								"</div><div class='ui-datebox-row'>" +
								"<div class='ui-datebox-input'><input type='text' id = '" + name + "_m' name='" + name + "_m' value='" + theseMonths[cDate.getMonth()] + "'></div>" +
								"<div class='ui-datebox-input'><input type='text' id = '" + name + "_d' name='" + name + "_d' value='" + cDate.getDate()               + "'></div>" +
								"<div class='ui-datebox-input'><input type='text' id = '" + name + "_y' name='" + name + "_y' value='" + cDate.getFullYear()           + "'></div>" +
								"</div><div class='ui-datebox-row'>" +
								"<div class='ui-datebox-minus datebox-minus-m'>-</div>" +
								"<div class='ui-datebox-minus datebox-minus-d'>-</div>" +
								"<div class='ui-datebox-minus datebox-minus-y'>-</div>" +
								"</div><div class='ui-datebox-row'>" +
								"<div class='ui-datebox-button datebox-set'>Set</div>" +
								"<div class='ui-datebox-button datebox-cancel'>Cancel</div>" +
								"</div>");

			$(this).click(function() {
				$.mobile.changePage($('#datebox_'+name), "pop", true, true);
			});

			$( '#datebox_'+name ).find('.datebox-set').click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				$('#'+name).val(thisDate.getFullYear() + '-' + (thisDate.getMonth()+1) + '-' + thisDate.getDate());
				window.history.back();
			});
			
			$( '#datebox_'+name ).find('.datebox-cancel').click( function() {
				window.history.back();
			});

			$( '#datebox_'+name ).find('.datebox-plus-m').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setMonth(thisDate.getMonth() + 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#datebox_'+name ).find('.datebox-plus-d').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setDate(thisDate.getDate() + 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#datebox_'+name ).find('.datebox-plus-y').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setYear(thisDate.getFullYear() + 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#datebox_'+name ).find('.datebox-minus-m').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setMonth(thisDate.getMonth() - 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#datebox_'+name ).find('.datebox-minus-d').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setDate(thisDate.getDate() - 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#datebox_'+name ).find('.datebox-minus-y').first().click( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setYear(thisDate.getFullYear() - 1);
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#'+name+'_m' ).change( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setMonth(parseInt($(this).val()));
				$('#datebox_'+name).find('.ui-title').text(thisDate.toLocaleDateString());
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#'+name+'_d' ).change( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setDate(parseInt($(this).val()));
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			
			$( '#'+name+'_y' ).change( function() {
				thisDate = new Date($('#datebox_'+name).find('.ui-title').text());
				thisDate.setYear(parseInt($(this).val()));
				theseMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				$('#datebox_'+name).find('[name='+name+'_m]').val(theseMonths[thisDate.getMonth()]);
				$('#datebox_'+name).find('[name='+name+'_d]').val(thisDate.getDate());
				$('#datebox_'+name).find('[name='+name+'_y]').val(thisDate.getFullYear());
			});
			      
			      /*
			      
			      var shortMon_todo_add_form_date = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var datepop_todo_add_form_date_cd = new Date();
		function update_todo_add_form_date() {
		   $('#datepop_todo_add_form_date_dStr').html(datepop_todo_add_form_date_cd.toLocaleDateString());
			$('#datepop_todo_add_form_date_Imon').val(shortMon_todo_add_form_date[datepop_todo_add_form_date_cd.getMonth()]);
			$('#datepop_todo_add_form_date_Iday').val(datepop_todo_add_form_date_cd.getDate());
			$('#datepop_todo_add_form_date_Iyar').val(datepop_todo_add_form_date_cd.getFullYear());
		};
		$(document).ready(function () {
			update_todo_add_form_date(datepop_todo_add_form_date_cd);
			$('#datepop_todo_add_form_date_pyar').click(function () {
				datepop_todo_add_form_date_cd.setYear(datepop_todo_add_form_date_cd.getFullYear() + 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_pmon').click(function () {
				datepop_todo_add_form_date_cd.setMonth(datepop_todo_add_form_date_cd.getMonth() + 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_pday').click(function () {
				datepop_todo_add_form_date_cd.setDate(datepop_todo_add_form_date_cd.getDate() + 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_myar').click(function () {
				datepop_todo_add_form_date_cd.setYear(datepop_todo_add_form_date_cd.getFullYear() - 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_mmon').click(function () {
				datepop_todo_add_form_date_cd.setMonth(datepop_todo_add_form_date_cd.getMonth() - 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_mday').click(function () {
				datepop_todo_add_form_date_cd.setDate(datepop_todo_add_form_date_cd.getDate() - 1);
				update_todo_add_form_date(datepop_todo_add_form_date_cd);
			});
			$('#datepop_todo_add_form_date_Iyar').change(function() {
				datepop_todo_add_form_date_cd.setYear($(this).val());
				$('#datepop_todo_add_form_date_dStr').html(dateFormat(datepop_todo_add_form_date_cd, "fullDate")); });
			$('#datepop_todo_add_form_date_Imon').change(function() {
				datepop_todo_add_form_date_cd.setMonth($(this).val());
				$('#datepop_todo_add_form_date_dStr').html(dateFormat(datepop_todo_add_form_date_cd, "fullDate")); });
			$('#datepop_todo_add_form_date_Iday').change(function() {
				datepop_todo_add_form_date_cd.setDate($(this).val());
				$('#datepop_todo_add_form_date_dStr').html(dateFormat(datepop_todo_add_form_date_cd, "fullDate")); });
			$('#datepop_todo_add_form_date_Cnl').click(function() {
				$('#datepop_todo_add_form_date').slideUp('slow'); });
			$('#datepop_todo_add_form_date_Set').click(function() {
				$('#todo_add_form_date').val( datepop_todo_add_form_date_cd.getFullYear() + '-' + datepop_todo_add_form_date_cd.getMonth() + '-' + datepop_todo_add_form_date_cd.getDate() );
				$('#datepop_todo_add_form_date').slideUp('slow'); });
			$('#todo_add_form_date').live('focus', function() { 
				$('#datepop_todo_add_form_date').slideDown('slow'); });
		});
			      
			      
			
			$(this).after( $( "<div />" ).datepicker({ altField: "#" + $(this).attr( "id" ), showOtherMonths: true }) );*/
		});
	});
})( jQuery );

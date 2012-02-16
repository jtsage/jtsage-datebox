//do nothing for now.
$(":jqmData(role)=page").live('pageinit', function(e) {
	var currentPage = $(e.target),
		headerButton = $('<a href="#" data-icon="grid" class="opt-pop ui-btn-right ui-btn ui-btn-icon-left ui-btn-corner-all ui-shadow ui-btn-up-a" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Options</span><span class="ui-icon ui-icon-grid ui-icon-shadow"></span></span></a>'),
		footerAll = $('<div data-role="footer">' +
			'<div data-role="controlgroup" data-type="horizontal">' +
				'<a data-role="button" data-theme="a" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a>' +
				'<a data-role="button" data-theme="a" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a>' +
				'<a data-role="button" data-theme="a" rel="external" href="http://dev.jtsage.com/blog/">Blog</a>' +
				'<a data-role="button" data-theme="a" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a>' +
				'<a data-role="button" data-theme="a" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a>' +
				'<a data-role="button" data-theme="a" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a>' +
			'</div></div>'),
		sidebarsource = {
			'mode': $('<li data-role="list-divider">Mode Demos</li>' +
				'<li><a href="calbox.html">Calendar Mode</a></li>' +
				'<li><a href="datebox.html">Android Mode</a></li>' +
				'<li><a href="slidebox.html">Slide Mode</a></li>' +
				'<li><a href="flipbox.html">Flip Mode</a></li>' +
				'<li><a href="timebox.html">Time Mode</a></li>' +
				'<li><a href="durationbox.html">Duration Mode</a></li>'),
			'opt': $('<li data-role="list-divider">Option Demos</li>' +
				'<li><a href="simplelimit.html">Simple Data Limits</a></li>' +
				'<li><a href="advlimit.html">Advanced Data Limits</a></li>' +
				'<li><a href="dialog.html">Display (window) Modes</a></li>' +
				'<li><a href="open.html">Open Methods</a></li>'),
			'script': $('<li data-role="list-divider">Interaction Demos</li>' +
				'<li><a href="link.html">Linked Input Elements</a></li>' +
				'<li><a href="linkdur.html">Linked Dates w/ a Duration</a></li>' +
				'<li><a href="linksel.html">Linking w/ a Custom Select</a></li>' +
				'<li><a href="start.html">Dynamic Start Date</a></li>' +
				'<li><a href="maxdays.html">Dynamic Ending Date</a></li>' +
				'<li><a href="convert.html">Using DateBox as a Conversion Library</a></li>' ),
		},
	sidebarstart = $('<ul data-corners="false" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="f"></ul>');
	
		
		
	if ( currentPage.jqmData('role') === 'page' ) {
		var header = currentPage.find('[data-role=header]'),
			footer = currentPage.find('[data-role=footer]'),
			sidebar = currentPage.find('div.sidebar');
		
		headerButton.appendTo(header);
		footer.html(footerAll.trigger('create'));
		currentPage.trigger('create');
		if ( sidebar.length > 0 ) {
			var doit = ''
			if ( sidebar.hasClass('modedemos') ) {
				doit = sidebarsource['mode'];
			} else if ( sidebar.hasClass('optdemos') ) {
				doit = sidebarsource['opt'];
			} else if ( sidebar.hasClass('scriptdemos') ) {
				doit = sidebarsource['script'];
			}
			
			if ( doit.length > 0 ) {
				var thisone = sidebarstart.clone();
				thisone.append(doit);
				sidebar.append(thisone);
				sidebar.find('ul').listview();
			}
		}
	}
	
});

$('.opt-pop').live('vclick', function() {
	var first = $('.ui-page-active').children('.ui-content:first');
	console.log(first);
});

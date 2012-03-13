//do nothing for now.
$(":jqmData(role)=page").live('pageinit', function(e) {
	var currentPage = $(e.target),
		headerButton = $('<a href="#" data-icon="grid" class="opt-pop ui-btn-right ui-btn ui-btn-icon-left ui-btn-corner-all ui-shadow ui-btn-up-a" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Options</span><span class="ui-icon ui-icon-grid ui-icon-shadow"></span></span></a>'),
		footerAll = $('<div data-role="footer">' +
			'<div data-role="controlgroup" data-mini="true" data-type="horizontal">' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="https://github.com/jtsage/jquery-mobile-datebox">GitHub Source</a>' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="http://dev.jtsage.com/forums/">Support Forums</a>' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="http://dev.jtsage.com/blog/">Blog</a>' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="http://crowdin.net/project/jquery-mobile-datebox">i18n Project</a>' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="mailto:jtsage+datebox@gmail.com">Contact</a>' +
				'<a data-role="button" data-mini="true" data-theme="a" rel="external" href="http://jquerymobile.com/">jQueryMobile Homepage</a>' +
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
				'<li><a href="open.html">Open Methods</a></li>'+
				'<li><a href="clear.html">Clearing the Date</a></li>'),
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
goodLang = {
	"en": "English US",
	"af": "Afrikaans",
	"ar": "Arabic",
	"ca": "Catalan",
	"cs": "Czech",
	"da": "Danish",
	"de": "German",
	"el": "Greek, Modern",
	"es-ES": "Spanish",
	"fi": "Finnish",
	"fr": "French",
	"hr": "Croatian",
	"hu": "Hungarian",
	"it": "Italian",
	"ja": "Japanese",
	"ko": "Korean",
	"lt": "Lituanian",
	"nl": "Dutch",
	"no": "Norwegian",
	"pl": "Polish",
	"pt-BR": "Portuguese",
	"pt-PT": "Portuguese",
	"ro": "Romainian",
	"ru": "Russian",
	"sr": "Serbian",
	"sv-SE": "Swedish",
	"tr": "Turkish",
	"uk": "Ukrainian",
	"vi": "Vietnamese",
	"zh-CN": "Chinese - Simplified"
}

intHTML = "<p>Choose your Language: </p><select class='opt-pop-lang'>";
for (x in goodLang) {
	intHTML += "<option value='"+x+"'>["+x+"] "+goodLang[x]+"</option>";
}
intHTML += "</select><a data-role='button' href='#' rel='close'>Close</a>";

$('.opt-pop-lang').live('change', function() {
	// This is so much bullshit it's not funny...
	newLang = $(this).val();
	$.ajax({
		url: "http://dev.jtsage.com/cdn/datebox/i18n/jquery.mobile.datebox.i18n."+newLang+".utf8.js",
		success: function(data) {
			eval(data);
			var x = $.mobile.datebox.prototype.options.lang[newLang];
			$(document).find('[data-role=datebox]').each(function () {
				$(this).data('datebox').options.lang[newLang] = x;
				$(this).data('datebox').options.useLang = newLang;
			});
		}
	});
});

$('.opt-pop').live('vclick', function() {
	var first = $('.ui-page-active').children('.ui-content:first');
		
	first.simpledialog({
		'mode': 'blank',
		'prompt': false,
		'forceInput': false,
		'useModal': true,
		'clickEvent': 'vclick',
		'fullScreen': true,
		'fullHTML': intHTML
	});
});


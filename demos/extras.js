//set up the theme switcher on the homepage
$('div').live('pagecreate', function(event) {
    if (!$(this).is('.ui-dialog')) {
        var appendEl = $(this).find('.ui-footer:last');

        if (!appendEl.length) {
            appendEl = $(this).find('.ui-content');
        }

        if (appendEl.is("[data-position]")) {
            return;
        }

        $('<a href="#themeswitcher" data-' + $.mobile.ns + 'rel="dialog" data-' + $.mobile.ns + 'transition="pop">Switch theme</a>').buttonMarkup({
            'icon': 'gear',
            'inline': true,
            'shadow': false,
            'theme': 'd'
        }).appendTo(appendEl.find('.ui-controlgroup')).wrap('<div class="jqm-themeswitcher">').bind("vclick", function() {
            $.themeswitcher();
        });
    }

});

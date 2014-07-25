$(document).on('change', '.demopick', function(e){
	thisSel = $(e.currentTarget);
	thisBox = '#'+thisSel.data('link');
	thisObj = {}; thisObj[thisSel.data('opt')] = thisSel.val();
	$(thisBox).datebox(thisObj);
	$(thisBox).datebox('refresh');
})

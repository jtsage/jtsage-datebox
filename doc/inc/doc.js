$(document).on('change', '.demopick', function(e){
	thisSel = $(e.currentTarget);
	thisBox = '#'+thisSel.data('link');
	thisVal = thisSel.val();
	if ( thisVal === "true" ) { thisVal = true; }
	if ( thisVal === "false" ) { thisVal = false; }
	if ( thisVal == parseInt(thisVal,10) ) { thisVal = parseInt(thisVal,10); }
	thisObj = {}; thisObj[thisSel.data('opt')] = thisVal;
	$(thisBox).datebox(thisObj);
	$(thisBox).datebox('refresh');
})

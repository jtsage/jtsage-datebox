$(document).on("change", ".demopick", function(e){
	var	thisObj, 
		thisSel = $(e.currentTarget),
		thisBox = "#"+thisSel.data("link"),
		thisVal = thisSel.val(),
		thisJSON = makeJSON(thisVal);
		
	if ( thisVal === "true" ) { thisVal = true; }
	if ( thisVal === "false" ) { thisVal = false; }
	if ( thisVal === parseInt(thisVal,10) ) { thisVal = parseInt(thisVal,10); }
	if ( thisJSON !==false ) { thisVal = thisJSON; }
	thisObj = {}; thisObj[thisSel.data("opt")] = thisVal;
	$(thisBox).datebox(thisObj);
	$(thisBox).datebox("refresh");
});

function makeJSON(str) {
	try {
		return jQuery.parseJSON(str);
	} catch (e) {
		return false;
	}
}
var langs = [{"data":[
	"en: English US", "af: Afrikaans", "ar: العربية", "bg: български език", "ca: Català",
	"cs: Čeština", "da: Dansk", "de: Deutsch", "el: ελληνικά", "es-ES: Español", "fi: Suomi",
	"fr: Français", "he: עברית", "hr: Hrvatski Jezik", "hu: Magyar", "id: Bahasa Indonesia",
	"it: Italiano", "ja: 日本語", "ko: 한국어", "lt: Lietuvių Kalba", "nl: Nederlands",
	"nl-BE: Nederlands, Belgium", "no: Norsk", "pl: Język Polski", "pt-BR: Português",
	"pt-PT: Português", "ro: Limba Română", "ru: русский язык", "sl: Slovenski Jezik",
	"sr: српски језик", "sv-SE: Svenska", "th: ไทย", "tr: Türkçe", "uk: українська мова",
	"vi: Tiếng Việt", "zh-CN: 中文 (Simplified)", "zh-TW: 中文 (Traditional)"]}];
		
window.changeLang = function(a) {
	var thisLangRaw = langs[0].data[a.custom[0]],
		colonPos = thisLangRaw.search(/:/),
		thisLang = thisLangRaw.substr(0,colonPos);
		
	$( "[data-role='datebox']" ).each(function() {
		if ( typeof $(this).data("mobile-datebox") !== "undefined" ) {
			$(this).datebox({"useLang": thisLang});
		} else {
			$(this).attr("datebox-use-lang", thisLang);
		}
	});
};

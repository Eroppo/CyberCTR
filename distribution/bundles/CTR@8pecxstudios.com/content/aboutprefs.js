"use strict";

(function(global) {
var Cu = Components.utils;

var {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

if (typeof ctrAboutPrefs  == "undefined") {
    var ctrAboutPrefs  = {};
};
if (!ctrAboutPrefs ) {
    ctrAboutPrefs  = {};
};
 
ctrAboutPrefs = {
  init: function(){
	
	if(Services.prefs.getBranch('extensions.classicthemerestorer.').getBoolPref('optionsrem')) {
	
	  setTimeout(function(){
		  
		var prefslocation = 'paneGeneral';
	  
		switch (Services.prefs.getBranch('extensions.classicthemerestorer.').getCharPref('aboutprefs')) {

		  case "category-general": prefslocation = 'paneGeneral'; break;
		  case "category-search": prefslocation = 'paneSearch'; break;
		  case "category-content": prefslocation = 'paneContent'; break;
		  case "category-application": prefslocation = 'paneApplications'; break;
		  case "category-privacy": prefslocation = 'panePrivacy'; break;
		  case "category-security": prefslocation = 'paneSecurity'; break;
		  case "category-sync": prefslocation = 'paneSync'; break;
		  case "category-advanced": prefslocation = 'paneAdvanced'; break;

		}
	  
		var windowsService = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
		var currentWindow = windowsService.getMostRecentWindow('navigator:browser');
		var browser = currentWindow.getBrowser();
		
		if(browser.contentDocument.location.href=='about:preferences') {
		  gotoPref(prefslocation);
		}
		
	  },80);
  
	  try{
	    document.getElementById("advancedPrefs").selectedIndex = Services.prefs.getBranch('extensions.classicthemerestorer.').getIntPref('aboutprefsInd');
	  } catch(e) {}
		
	  var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {

		   try{ 
		     Services.prefs.getBranch('extensions.classicthemerestorer.').setCharPref('aboutprefs',document.getElementById("categories").getAttribute("last-selected"));
		   } catch(e) {}
			
		});    
	  });

	  observer.observe(document.querySelector('#categories'), { attributes: true, attributeFilter: ['last-selected'] });
	  
	  var observer2 = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {

		   try{ 
		     Services.prefs.getBranch('extensions.classicthemerestorer.').setIntPref('aboutprefsInd',document.getElementById("advancedPrefs").getAttribute("selectedIndex"));
		   } catch(e) {}
			
		});    
	  });

	  observer2.observe(document.querySelector('#advancedPrefs'), { attributes: true, attributeFilter: ['selectedIndex'] });
	  
	  try{
		  var thirdpartytheme = Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin");
		  document.querySelector('#categories').setAttribute('currenttheme',thirdpartytheme);
	  } catch(e){}
	  
	}
	
	/* restore favicon wheel for all categories */
	setTimeout(function(){
		var windowsService = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
		var currentWindow = windowsService.getMostRecentWindow('navigator:browser');
		var browser = currentWindow.getBrowser();
	
		if(browser.contentDocument.location.href.indexOf('about:preferences')!=-1) {
		
			var ss =  Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
			\
			#TabsToolbar .tabbrowser-tab[label="'+browser.selectedTab.label+'"] .tab-icon-image:not([src]),\
			#main-window[fx44plus="true"] #TabsToolbar .tabbrowser-tab[label="'+browser.selectedTab.label+'"] .tab-icon-image:not([src]),\
			#TabsToolbar .tabbrowser-tab[label="'+browser.selectedTab.label+'"]:not([pinned]) .tab-icon-image:not([src]),\
			#main-window[fx44plus="true"] #TabsToolbar .tabbrowser-tab[label="'+browser.selectedTab.label+'"]:not([pinned]) .tab-icon-image:not([src]) {\
			  list-style-image: url("chrome://browser/skin/preferences/in-content/favicon.ico") !important;\
			  display:block !important;\
			}\
			\
			'), null, null);

			ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);
		}
	},400);
	
  }
}
  // Make ctrAboutPrefs a global variable
  try{
	global.ctrAboutPrefs = ctrAboutPrefs.init();
  } catch(e){}
}(this));
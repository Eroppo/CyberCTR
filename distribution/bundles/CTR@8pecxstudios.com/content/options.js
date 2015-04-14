"use strict";
if (typeof classicthemerestorerjso == "undefined") {var classicthemerestorerjso = {};};
if (!classicthemerestorerjso.ctr) {classicthemerestorerjso.ctr = {};};

Components.utils.import("resource://gre/modules/AddonManager.jsm");
Components.utils.import("resource:///modules/CustomizableUI.jsm");

//Import services use one service for preferences.
Components.utils.import("resource://gre/modules/Services.jsm");
//Query nsIPrefBranch see: Bug 1125570 | Bug 1083561
Services.prefs.QueryInterface(Components.interfaces.nsIPrefBranch);
var  contexts = Services.prefs.getBranch("browser.context.");

classicthemerestorerjso.ctr = {

  prefs:			Services.prefs.getBranch("extensions.classicthemerestorer."),
  fxdefaulttheme:	Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin") == 'classic/1.0',
  appversion:		parseInt(Services.prefs.getBranch("extensions.").getCharPref("lastAppVersion")),
  oswindows:		Services.appinfo.OS=="WINNT",
  needsRestart: 	false,
  tmp_tu_active:	false,

  initprefwindow: function() {
  
	// adds a new global attribute 'defaultfxtheme' -> better parting css for default and non-default themes
	try{
		if (this.fxdefaulttheme) document.getElementById("ClassicTRoptionsPane").setAttribute('defaultfxtheme',true);
		  else {
			var thirdpartytheme = Services.prefs.getBranch("general.skins.").getCharPref("selectedSkin");
			if(thirdpartytheme=="Tangerinefox" || thirdpartytheme=="Tangofox") {
			  this.fxdefaulttheme=true;
			  document.getElementById("ClassicTRoptionsPane").setAttribute('defaultfxtheme',true);
			}
		  
		  }
	} catch(e){}
	
	// restore last selected categories/tabs
	document.getElementById("CtrRadioGroup").selectedIndex = this.prefs.getIntPref('pref_actindx');
	document.getElementById("ctraddon_tabcolor_tabs").selectedIndex = this.prefs.getIntPref('pref_actindx2');
	
		// Append CyberCTR Version To Window Title extensions.classicthemerestorer.version
		var newTitle = document.title + " " + this.prefs.getCharPref('version');
		document.title = newTitle;
	
	// disable and hide items not usable on third party themes
	if (!this.fxdefaulttheme) {
		document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		document.getElementById('ctraddon_abhigher').disabled = true;
		document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
		document.getElementById('ctraddon_pw_iconsbig').disabled = true;
		document.getElementById('ctraddon_pw_bfurlbarfix').disabled = true;
		document.getElementById('ctraddon_pw_altmenubar').disabled = true;
		document.getElementById('ctraddon_pw_menubarnofog').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor2').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor3').disabled = true;
		document.getElementById('ctraddon_pw_tabmokcolor4').disabled = true;
		document.getElementById('ctraddon_pw_panelmenucolor').disabled = true;
		document.getElementById('ctraddon_pw_nobookbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavbarbg').disabled = true;
		document.getElementById('ctraddon_pw_nonavborder').disabled = true;
		document.getElementById('ctraddon_pw_nonavtbborder').disabled = true;
		document.getElementById('ctraddon_pw_alttabstb').disabled = true;
		document.getElementById('ctraddon_pw_alttabstb2').disabled = true;
		document.getElementById('ctraddon_pw_verifiedcolors').disabled = true;
		document.getElementById('ctraddon_pw_colors_ntab_t').disabled = true;
		document.getElementById('ctraddon_pw_notabfog').disabled = true;
		document.getElementById('ctraddon_pw_notabbg').disabled = true;
		document.getElementById('ctraddon_pw_noaddonbarbg').disabled = true;
		
		if (contexts.getBoolPref("classic")){}else{
			document.getElementById('ctraddon_pw_noconicons').disabled = true;
		}
		
		document.getElementById('ctraddon_pw_closeonleft').disabled = true;
		document.getElementById('ctraddon_pw_closealt').disabled = true;
		document.getElementById('ctraddon_pw_nbcompact').disabled = true;
		document.getElementById('ctraddon_pw_tabc_act_tb').disabled = true;
		document.getElementById('ctraddon_pw_aerocolors').disabled = true;
		document.getElementById('ctraddon_pw_tbsep_winc').disabled = true;

		document.getElementById('ctraddon_abhigher').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_smallnavbut').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_iconsbig').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_ccol_act_pref').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_cp2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b1').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_ccol_act_b2').style.visibility = 'collapse';

		document.getElementById('ctraddon_pw_bfurlbarfix').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_altmenubar').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_menubarnofog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor3').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabmokcolor4').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_panelmenucolor').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_mockupoptions').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_invertedicons').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_alttabstb2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_verifiedcolors').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabfog').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_notabbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nonavtbborder').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nobookbarbg').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_noaddonbarbg').style.visibility = 'collapse';
		
		if (contexts.getBoolPref("classic")){}else{
			document.getElementById('ctraddon_pw_noconicons').style.visibility = 'collapse';
		}
		
		document.getElementById('ctraddon_pw_closeonleft').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_closealt').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_nbcompact').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabc_act_tb').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_aerocolors').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tbsep_winc').style.visibility = 'collapse';
	} else {
		document.getElementById('ctraddon_pw_special_info2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_special_font').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
		document.getElementById('ctraddon_coltabsinfo').style.visibility = 'collapse';
	};

	//Custom Button Color Text Color
	Application.prefs.get("extensions.classicthemerestorer.appbutton").events.addListener("change", function(aEvent){
		var isButton = Services.prefs.getCharPref("extensions.classicthemerestorer.appbutton");
		if (isButton ==="appbutton_off" || 
			isButton ==="appbutton_v1" ||
			isButton ==="appbutton_v1wt" ||
			isButton ==="appbutton_v2h" || 
			isButton ==="appbutton_pm"){
				document.getElementById('ctraddon_pw_cappbutctcl').disabled = true;
				document.getElementById('ctraddon_pw_cappbutctct').disabled = true;
				document.getElementById('ctraddon_pw_cappbutctcc').disabled = true;
				document.getElementById('ctraddon_cappbutnotxtsh').disabled = true;		
	}});
	Application.prefs.get("extensions.classicthemerestorer.appbuttonc").events.addListener("change", function(aEvent){
		
	if (Services.prefs.getCharPref("extensions.classicthemerestorer.appbuttonc") === "appbuttonc_custom" || 
		Services.prefs.getCharPref("extensions.classicthemerestorer.appbuttonc") === "appbuttonc_custom1"){
		document.getElementById('ctraddon_pw_cappbutctcl').disabled = false;
		document.getElementById('ctraddon_pw_cappbutctct').disabled = false;
		document.getElementById('ctraddon_pw_cappbutctcc').disabled = false;
		document.getElementById('ctraddon_cappbutnotxtsh').disabled = false;		
	}else{
		document.getElementById('ctraddon_pw_cappbutctcl').disabled = true;
		document.getElementById('ctraddon_pw_cappbutctct').disabled = true;
		document.getElementById('ctraddon_pw_cappbutctcc').disabled = true;
		document.getElementById('ctraddon_cappbutnotxtsh').disabled = true;
	}});	
	document.getElementById('ctraddon_pw_cappbutctcl').disabled = true;
	document.getElementById('ctraddon_pw_cappbutctct').disabled = true;
	document.getElementById('ctraddon_pw_cappbutctcc').disabled = true;
	document.getElementById('ctraddon_cappbutnotxtsh').disabled = true;
	
	//pref e10s tabs
	document.getElementById('ctraddon_pw_e10stab_notd').disabled = true;
	document.getElementById('ctraddon_pw_e10stab_notd').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_e10stabs').disabled = true;
	document.getElementById('ctraddon_pw_e10stabs').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_e10stabsdescr').style.visibility = 'collapse';

	// radio restart label
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'collapse';
	
	// tab height/width
	document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	
	// HCTP add-on extra labels
	document.getElementById('ctraddon_hctpinfotab').style.visibility = 'collapse';
	document.getElementById('ctraddon_hctpinfoab').style.visibility = 'collapse';
			
	
	//Custom search bar width
	if (this.prefs.getBoolPref("customsearchbarwidth")){
		document.getElementById('ctraddon_searchbarwidth').disabled = false;
		document.getElementById('ctraddon_searchbarwidthl').disabled = false;
	}else{
		document.getElementById('ctraddon_searchbarwidth').disabled = true;
		document.getElementById('ctraddon_searchbarwidthl').disabled = true;
	}
		
	Application.prefs.get("extensions.classicthemerestorer.customsearchbarwidth").events.addListener("change", function(aEvent){	
	if (Services.prefs.getBoolPref("extensions.classicthemerestorer.customsearchbarwidth")){
		document.getElementById('ctraddon_searchbarwidth').disabled = false;
		document.getElementById('ctraddon_searchbarwidthl').disabled = false;
	}else{
		document.getElementById('ctraddon_searchbarwidth').disabled = true;
		document.getElementById('ctraddon_searchbarwidthl').disabled = true;
	}});
	
	// extra checks to not enable tab width settings while 'TabMixPlus' or 'TabUtilities' is enabled
	AddonManager.getAddonByID('{dc572301-7619-498c-a57d-39143191b318}', function(addon) {
	  if(addon && addon.isActive) {
		  
		classicthemerestorerjso.ctr.tmp_tu_active = true;
		
	  	document.getElementById('ctraddon_pw_tabMinWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	  }
	});
	
	AddonManager.getAddonByID('tabutils@ithinc.cn', function(addon) {
	  if(addon && addon.isActive) {

		classicthemerestorerjso.ctr.tmp_tu_active = true;

		document.getElementById('ctraddon_pw_tabMinWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMinWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L1').disabled = true;
		document.getElementById('ctraddon_pw_tabMaxWidth_L2').disabled = true;
		document.getElementById('ctraddon_pw_tabwidthinfo').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_tabwidthinfo2').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
	  }
	});
	
	//Colorful Tabs add-on extra info
	AddonManager.getAddonByID('{0545b830-f0aa-4d7e-8820-50a4629a56fe}', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_coltabsinfo').style.visibility = 'visible';
	  }
	});
	
	// Status4Evar, The Puzzle Piece, Puzzle Toolbars and The Addon Bar Restored
	// override CTRs mov. status bar panel, so CTRs option gets disabled 
	document.getElementById('ctraddon_pw_statusbar_s4e_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_tpp_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_pzt_info').style.visibility = 'collapse';
	document.getElementById('ctraddon_pw_statusbar_abr_info').style.visibility = 'collapse';
	
	AddonManager.getAddonByID('status4evar@caligonstudios.com', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		document.getElementById('ctraddon_pw_statusbar_s4e_info').style.visibility = 'visible';
	  }
	});
	
	AddonManager.getAddonByID('thePuzzlePiece@quicksaver', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		if(addon && addon.isActive && parseInt(addon.version) < 2) {
		  document.getElementById('ctraddon_pw_statusbar_tpp_info').style.visibility = 'visible';
	    } else{
		  document.getElementById('ctraddon_pw_statusbar_pzt_info').style.visibility = 'visible';
	    }
	  }
	});
	
	AddonManager.getAddonByID('thefoxonlybetter@quicksaver', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'visible';
	  } else{
		document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'collapse';
	  }
	});
	var TFOBListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'thefoxonlybetter@quicksaver') { document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'visible'; }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'thefoxonlybetter@quicksaver') { document.getElementById('ctraddon_pw_nonavbarbg2').style.visibility = 'collapse'; }
	   }
	};
	AddonManager.addAddonListener(TFOBListener);
	
	AddonManager.getAddonByID('the-addon-bar@GeekInTraining-GiT', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_pw_statusbar').disabled = true;
		document.getElementById('ctraddon_pw_statusbar_abr_info').style.visibility = 'visible';
	  }
	});
	
	//HCTP add-on extra info
	AddonManager.getAddonByID('hidecaptionplus-dp@dummy.addons.mozilla.org', function(addon) {
	  if(addon && addon.isActive) {
		document.getElementById('ctraddon_hctpinfotab').style.visibility = 'visible';
		document.getElementById('ctraddon_hctpinfoab').style.visibility = 'visible';
	  }
	});
	var HCTPListener = {
	   onEnabled: function(addon) {
		  if(addon.id == 'hidecaptionplus-dp@dummy.addons.mozilla.org') {
			document.getElementById('ctraddon_hctpinfotab').style.visibility = 'visible';
			document.getElementById('ctraddon_hctpinfoab').style.visibility = 'visible';
		  }
	   },
	   onDisabled: function(addon) {
		  if(addon.id == 'hidecaptionplus-dp@dummy.addons.mozilla.org') {
			document.getElementById('ctraddon_hctpinfotab').style.visibility = 'collapse';
			document.getElementById('ctraddon_hctpinfoab').style.visibility = 'collapse';
		  }
	   }
	};
	AddonManager.addAddonListener(HCTPListener);

	// disable bookmark animation checkbox, if 'star button in urlbar' is used
	if (this.prefs.getBoolPref('starinurl')) document.getElementById('ctraddon_pw_bmanimation').disabled = true;
	
	// hide settings, if unsupported by Cyberfox versions
	if (this.appversion < 31) {
	  document.getElementById('ctraddon_pw_pananimation').style.visibility = 'collapse';
	  
	  document.getElementById('ctraddon_closetab_pw_act').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_non').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_sta').style.visibility = 'collapse';
	  document.getElementById('ctraddon_closetab_pw_end').style.visibility = 'collapse';
	}
	if (this.appversion < 32) {
	  document.getElementById('ctraddon_pw_noconicons').style.visibility = 'collapse';
	}
	if (this.appversion < 33) {
	  document.getElementById('ctraddon_experttweakstab').style.visibility = 'collapse';
	}
	if (this.appversion < 34) {
	  document.getElementById('ctraddon_pw_oldsearchgb').style.visibility = 'collapse';
	  document.getElementById('ctraddon_pw_loopcallgb').style.visibility = 'collapse';
	}
	if (this.appversion < 35 || this.appversion > 39.9) {
	  document.getElementById('ctraddon_pw_devthemegb').style.visibility = 'collapse';
	}
	if (this.appversion < 36) {
	  document.getElementById('ctraddon_pw_oldprefsgb').style.visibility = 'collapse';
	}
	if (this.appversion < 38) {
	  document.getElementById('ctraddon_pw_readermodegb').style.visibility = 'collapse';
	}
	if (this.appversion > 37) {
	  document.getElementById('ctraddon_pw_bmarkoinpw').style.visibility = 'collapse';
	}

	function PrefListener(branch_name, callback) {
	  // Keeping a reference to the observed preference branch or it will get
	  // garbage collected.
	  this._branch = Services.prefs.getBranch(branch_name);
	  this._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
	  this._callback = callback;
	}

	PrefListener.prototype.observe = function(subject, topic, data) {
	  if (topic == 'nsPref:changed')
		this._callback(this._branch, data);
	};

	PrefListener.prototype.register = function(trigger) {
	  this._branch.addObserver('', this, false);
	  if (trigger) {
		let that = this;
		this._branch.getChildList('', {}).
		  forEach(function (pref_leaf_name)
			{ that._callback(that._branch, pref_leaf_name); });
	  }
	};

	PrefListener.prototype.unregister = function() {
	  if (this._branch)
		this._branch.removeObserver('', this);
	};
	
	var ctrSettingsListenerW_forCTB = new PrefListener(
	  "extensions.cstbb-extension.",
	  function(branch, name) {
		switch (name) {

		  case "navbarbuttons":
		  
		    var ctbbuttons = false;
			
			try {
			  ctbbuttons = branch.getCharPref("navbarbuttons")!="nabbuttons_off";
			} catch(e){}
		  
			if (ctbbuttons) {
			  document.getElementById('ctraddon_pw_smallnavbut').disabled = true;
			}
			else {
			  document.getElementById('ctraddon_pw_smallnavbut').disabled = false;
			}
			
		  break;

		}
	  }
	);
	
	ctrSettingsListenerW_forCTB.register(true);
	
	var ctrSettingsListenerW_forCTR = new PrefListener(
	  "extensions.classicthemerestorer.",
	  function(branch, name) {
		switch (name) {

		  case "ctabmwidth": case "ctabwidth":
		  
		    if(branch.getIntPref("ctabmwidth")<48 || branch.getIntPref("ctabwidth")<48 )
			  document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'visible';
			else
			  document.getElementById('ctraddon_pw_tabwidthinfo3').style.visibility = 'collapse';
		  
		  break;
		  
		  case "ctabheightcb":
		  
		    if(branch.getBoolPref("ctabheightcb"))
			  document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'visible';
			else
			  document.getElementById('ctraddon_pw_tabheightinfo').style.visibility = 'collapse';
		  
		  break;

		}
	  }
	);
	
	ctrSettingsListenerW_forCTR.register(true);
	
	// update sub settings
	this.ctrpwAppbuttonextra(this.prefs.getCharPref("appbutton"),false);
	this.ctrpwAppbuttonColorExtra(this.prefs.getCharPref("appbuttonc"));
	this.ctrpwTabEmptyFavicon(this.prefs.getBoolPref("emptyfavicon2"));
	this.ctrpwFaviconextra(this.prefs.getBoolPref("faviconurl"));
	this.ctrpwBFextra(this.prefs.getBoolPref("backforward"));
	this.ctrpwSNextra(!this.prefs.getBoolPref('smallnavbut'));
	this.ctrpwHidetbwotExtra(this.prefs.getBoolPref("hidetbwot"));
	this.altTabsToolbarBgExtra(this.prefs.getBoolPref("alttabstb"));
	this.ctrpwModeextra(this.prefs.getCharPref("nav_txt_ico"));
	this.ctrpwDisableDevThemePrefsExtra(this.prefs.getBoolPref("nodevtheme"));
	this.ctrShowE10sPrefForWindowPrefs();

	
	var closetab_value = this.prefs.getCharPref("closetab");
  
    if(closetab_value=="closetab_default"
		|| closetab_value=="closetab_forced"
		|| closetab_value=="closetab_active") {
      this.ctrpwTabcloseextra(false);
	} else this.ctrpwTabcloseextra(true);
	
	switch (this.prefs.getCharPref("closetab")) {
	  case "closetab_default": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_forced": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_active": this.ctrpwTabcloseextra(false); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_none": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(true); break;
	  case "closetab_tb_start": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(false); break;
	  case "closetab_tb_end": this.ctrpwTabcloseextra(true); this.ctrpwTabcloseextra2(false); break;
	}

	this.onCtrPanelSelect();
	
	// if e10s is used show CTRs option to disable tab underlining
	try{
	  if (Services.prefs.getBranch("browser.tabs.remote.").getBoolPref("autostart") || 
			Services.prefs.getBranch("browser.tabs.remote.autostart.").getBoolPref("1")) {
		document.getElementById('ctraddon_pw_e10stab_notd').disabled = false;
		document.getElementById('ctraddon_pw_e10stab_notd').style.visibility = 'visible';
	  }
	} catch(e) {}

		
		if (contexts.getBoolPref("classic")){
			document.getElementById('ctraddon_pw_noconicons').disabled = true;
		}else{
			document.getElementById('ctraddon_pw_noconicons').disabled = false;
		}
		if (!this.oswindows){
			document.getElementById('ctraddon_titleintitlebar').disabled = true;
		} else {
			document.getElementById('ctraddon_titleintitlebar').disabled = false;
		}

		//Hide no links start page check-box in firefox.	
		if (Services.appinfo.name.toLowerCase() === "Firefox".toLowerCase()) {
			document.getElementById('nolinks').hidden = true;
		}	

		//Hide no snippets start page check-box in Cyberfox as there are removed by default.	
		if (Services.appinfo.name.toLowerCase() === "Cyberfox".toLowerCase()) {
			document.getElementById('nosnippets').hidden = true;	
		}
		
		//Disable no links & custom highlight color option on simplicity theme(s)
		if (this.prefs.getCharPref("abouthome") === "simplicityred" || 
			this.prefs.getCharPref("abouthome") === "simplicityblue"|| 
			this.prefs.getCharPref("abouthome") === "simplicitygreen" || 
			this.prefs.getCharPref("abouthome") === "simplicityyellow"){
			document.getElementById('noicons').disabled = true;
			document.getElementById('ctraddon_ctabouthomecusthltck').disabled = true;
			document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = true;
			document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = true;
			document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = true;
			this.prefs.setBoolPref("abouthomehighlight", false);	
		}else{
			document.getElementById('noicons').disabled = false;
			document.getElementById('ctraddon_ctabouthomecusthltck').disabled = false;
			document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = false;
			document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = false;
			document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = false;
		}
		
		if (this.prefs.getCharPref("abouthome") === "simplicitycustom"){
			document.getElementById('noicons').disabled = true;
		}	

		Application.prefs.get("extensions.classicthemerestorer.abouthome").events.addListener("change", function(aEvent){
			if (Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "simplicityred" || 
				Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "simplicityblue"|| 
				Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "simplicitygreen"|| 
				Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "simplicityyellow"){
				document.getElementById('noicons').disabled = true;
				//Disable custom highlight color on pre-sets.
				document.getElementById('ctraddon_ctabouthomecusthltck').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = true;
				Services.prefs.setBoolPref("extensions.classicthemerestorer.abouthomehighlight", false);
			}else{
				document.getElementById('noicons').disabled = false;
				document.getElementById('ctraddon_ctabouthomecusthltck').disabled = false;
				document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = false;
				document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = false;
				document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = false;
			}
			if (Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "simplicitycustom"){
				document.getElementById('noicons').disabled = true;
			}
		});
		
		// Replace whiteSpace and backslash in custom background urls	
		Application.prefs.get("extensions.classicthemerestorer.abouthomecustomurl").events.addListener("change", function(aEvent){				
		try{
			Services.prefs.setCharPref("extensions.classicthemerestorer.abouthomecustomurl", document.getElementById('ctraddon_ctabouthome_bg_urlbox').value.trim().replace(/ /g, "%20").replace(/\\/g,"/"));
		} catch (e){ }
		});
		
		//Disable custom background image on Light|dark theme styles.
		if (this.prefs.getCharPref("abouthome") === "dark" || 
			this.prefs.getCharPref("abouthome") === "light"){
			document.getElementById('ctraddon_ctabouthome_custbg').disabled = true;
			document.getElementById('ctraddon_ctabouthome_custbgl').disabled = true;
			document.getElementById('ctraddon_ctabouthome_bg_urlbox').disabled = true;		
			this.prefs.setBoolPref("abouthomecustombg", false);
			
		}else{
			document.getElementById('ctraddon_ctabouthome_custbg').disabled = false;
			document.getElementById('ctraddon_ctabouthome_custbgl').disabled = false;
			document.getElementById('ctraddon_ctabouthome_bg_urlbox').disabled = false;
		}

		Application.prefs.get("extensions.classicthemerestorer.abouthome").events.addListener("change", function(aEvent){
				if (Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "dark" || 
					Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "light"){
				document.getElementById('ctraddon_ctabouthome_custbg').disabled = true;
				document.getElementById('ctraddon_ctabouthome_custbgl').disabled = true;
				document.getElementById('ctraddon_ctabouthome_bg_urlbox').disabled = true;
				Services.prefs.setBoolPref("extensions.classicthemerestorer.abouthomecustombg", false);
			}else{
				document.getElementById('ctraddon_ctabouthome_custbg').disabled = false;
				document.getElementById('ctraddon_ctabouthome_custbgl').disabled = false;
				document.getElementById('ctraddon_ctabouthome_bg_urlbox').disabled = false;
			}
			//Disable custom highlight colors on default theme in firefox.	
			if (Services.appinfo.name.toLowerCase() === "Firefox".toLowerCase() && 
				Services.prefs.getCharPref("extensions.classicthemerestorer.abouthome") === "default") {
					document.getElementById('ctraddon_ctabouthomecusthltck').disabled = true;
					document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = true;
					document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = true;
					document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = true;
					this.prefs.setBoolPref("abouthomehighlight", false);
			}
		});
		//Disable custom highlight colors on default theme in firefox.	
		if (Services.appinfo.name.toLowerCase() === "Firefox".toLowerCase() && this.prefs.getCharPref("abouthome") === "default") {
				document.getElementById('ctraddon_ctabouthomecusthltck').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthltlb').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthlttb').disabled = true;
				document.getElementById('ctraddon_ctabouthomecusthltcp').disabled = true;
				this.prefs.setBoolPref("abouthomehighlight", false);
		}
		
			this.hideThemeInfoForTabs();
  },
  
  /* If an option, which requires a restart, was altered, a prompt to restart Fx will appear
     when preference window gets closed */
  unloadprefwindow: function() {

	var cancelQuit   = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
	var observerSvc  = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
	var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");
						
	var brandName	 = '';

	try {
	  brandName = Services.strings.createBundle("chrome://branding/locale/brand.properties").GetStringFromName("brandShortName");
	} catch(e) {}

	if (this.needsRestart &&
		Services.prompt.confirm(null,
			stringBundle.formatStringFromName("popup.title", [brandName], 1),
			stringBundle.formatStringFromName("popup.msg.restart", [brandName], 1)
		)) {
		observerSvc.notifyObservers(cancelQuit, "quit-application-requested", "restart");
		if(cancelQuit.data) { // The quit request has been cancelled.
			return false;
		};
		Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
	}
	
	// save last selected categories/tabs
	this.prefs.setIntPref('pref_actindx',document.getElementById("CtrRadioGroup").selectedIndex);
	this.prefs.setIntPref('pref_actindx2',document.getElementById("ctraddon_tabcolor_tabs").selectedIndex);

	return true;
  },
  
  needsBrowserRestart: function(){
	this.needsRestart = true;
	document.getElementById('ctraddon_pw_radiorestart').style.visibility = 'visible';
  },
  
  resetPrefsForDevTheme: function(){
	
	// reset Tab appearance, but keep last knows preference
	setTimeout(function(){
	  classicthemerestorerjso.ctr.prefs.setCharPref('tabs','tabs_default');
	},50);
	setTimeout(function(){
	  classicthemerestorerjso.ctr.prefs.setCharPref('tabs','tabs_squared');
	},100);
	
	// disable Aero (blue) toolbars preference
	if(this.prefs.getBoolPref('aerocolors'))
	  this.prefs.setBoolPref('aerocolors',false);
 
	this.hideThemeInfoForTabs();
	this.unsetTabColorsAndMore();

  },
  
  //only reset prefs for dev theme, if it is enabled
  resetPrefsForDevTheme2: function(){
	try {
	  if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
		classicthemerestorerjso.ctr.resetPrefsForDevTheme();
	  }
	} catch(e) {}
  },
  
  ctrShowE10sPrefForWindowPrefs: function() {
	try{
	setTimeout(function(){
	  if(Services.prefs.getBranch("app.update.").getCharPref("channel")=='nightly'
			&& Services.prefs.getBranch("browser.preferences.").getBoolPref("inContent")==false) {
		document.getElementById('ctraddon_pw_e10stabs').disabled = false;
		document.getElementById('ctraddon_pw_e10stabs').style.visibility = 'visible';
		document.getElementById('ctraddon_pw_e10stabsdescr').style.visibility = 'visible';
	  } else {
		document.getElementById('ctraddon_pw_e10stabs').disabled = true;
		document.getElementById('ctraddon_pw_e10stabs').style.visibility = 'collapse';
		document.getElementById('ctraddon_pw_e10stabsdescr').style.visibility = 'collapse';
	  }
	},100);
	} catch(e) {}
  },
  
  hideThemeInfoForTabs: function(){
	setTimeout(function(){
		try {
		  if(Services.prefs.getBranch("browser.devedition.theme.").getBoolPref('enabled')!=false){
			document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'visible';
			document.getElementById('ctraddon_pw_tabmenulist').disabled = true;
		  } else if(classicthemerestorerjso.ctr.fxdefaulttheme) {
			  document.getElementById('ctraddon_pw_tabforminfo').style.visibility = 'collapse';
			  document.getElementById('ctraddon_pw_tabmenulist').disabled = false;
		  }
		} catch(e) {}
	},100);
  },
  
  unsetTabColorsAndMore: function() {
	this.prefs.setBoolPref('tabcolor_def',false);
	this.prefs.setBoolPref('tabcolor_act',false);
	this.prefs.setBoolPref('tabcolor_pen',false);
	this.prefs.setBoolPref('tabcolor_unr',false);
	this.prefs.setBoolPref('tabcolor_hov',false);
	this.prefs.setBoolPref('ntabcolor_def',false);
	this.prefs.setBoolPref('ntabcolor_hov',false);
	
	if(this.prefs.getBoolPref('closeonleft')) {
	  this.prefs.setBoolPref('closeonleft',false);
	  setTimeout(function(){
		classicthemerestorerjso.ctr.prefs.setBoolPref('closeonleft',true);
	  },20);
	}
  },
  
  ctrpwFaviconextra: function(which) {
    if(which==true) which=false; else which=true;
	document.getElementById('ctraddon_padlock_extra').disabled = which;
  },
  
  ctrpwTabEmptyFavicon: function(which) {
	document.getElementById('ctraddon_pw_tab_emptyfavicon').disabled = which;
  },
  
  ctrpwBFextra: function(which) {
	var itemvis = 'collapse';
	
    if(which==true) {
	  which=false;
	  itemvis = 'visible';
	} else {
	  which=true;
	  itemvis = 'collapse';
	}
	
    document.getElementById('ctraddon_pw_hide_bf_popup').disabled = which;
	document.getElementById('ctraddon_pw_bf_space').disabled = which;
	document.getElementById('ctraddon_pw_hide_bf_popup').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_bf_space').style.visibility = itemvis;
	if(classicthemerestorerjso.ctr.prefs.getBoolPref('smallnavbut')==false){
	  document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	  document.getElementById('ctraddon_pw_nbcompact').style.visibility = itemvis;
	}
  },
  
   ctrpwSNextra: function(which) {
    if(classicthemerestorerjso.ctr.prefs.getBoolPref('backforward')){
	  var itemvis = 'collapse';
	
      if(which==true) {
		which=false; itemvis = 'visible';
	  } else {
		which=true; itemvis = 'collapse';
	  }
	  document.getElementById('ctraddon_pw_nbcompact').disabled = which;
	  document.getElementById('ctraddon_pw_nbcompact').style.visibility = itemvis;
	}
  },
  
  ctrpwHidetbwotExtra: function(which) {
	var itemvis = 'collapse';
	
    if(which==true) {
	  which=false; itemvis = 'visible';
	} else {
	  which=true; itemvis = 'collapse';
	}
	
    document.getElementById('ctraddon_pw_hidetbwote').disabled = which;
	document.getElementById('ctraddon_pw_hidetbwote2').disabled = which;
	document.getElementById('ctraddon_pw_hidetbwote').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_hidetbwote_winc').style.visibility = itemvis;
	document.getElementById('ctraddon_pw_hidetbwote2').style.visibility = itemvis;
  },
  
  ctrpwDisableDevThemePrefsExtra: function(which) {
	if (this.appversion >= 35) {
	  document.getElementById('ctraddon_pw_devtheme').disabled = which;
	  document.getElementById('ctraddon_pw_devthemeb').disabled = which;
	}
  },
  
  altTabsToolbarBgExtra: function(which) {
	if (this.fxdefaulttheme) {
	
	  var itemvis = 'collapse';
      if(which==true) {
		which=false; itemvis = 'visible';
	  } else {
		which=true; itemvis = 'collapse';
	  }
      document.getElementById('ctraddon_pw_alttabstb2').disabled = which;
	  document.getElementById('ctraddon_pw_alttabstb2').style.visibility = itemvis;
	}
  },
  
  ctrpwTabcloseextra: function(which) {
	document.getElementById('ctraddon_pw_closetabhfl').disabled = which;
	document.getElementById('ctraddon_pw_closeonleft').disabled = which;
  },
  
  ctrpwTabcloseextra2: function(which) {
	document.getElementById('ctraddon_pw_closealt').disabled = which;
  },
  
  ctrMovStatusextra: function() {
  
	setTimeout(function(){
	  try{
		if(CustomizableUI.getPlacementOfWidget("ctraddon_statusbar")==null)
		  CustomizableUI.addWidgetToArea("ctraddon_statusbar", "ctraddon_addon-bar");

		} catch(e){}
	},1300);
  },
  
  ctrpwModeextra: function(which) {
  
    if (which=="iconstxt" || which=="iconstxt2" || which=="txtonly") {
	  document.getElementById('ctraddon_pw_iat_notf_vt').disabled = false;
	} else document.getElementById('ctraddon_pw_iat_notf_vt').disabled = true;
  
  },
 
  ctrpwAppbuttonextra: function(which,fromprefwindow) {
  
  var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
  
	if (which=="appbutton_v1" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1wt" && this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = false;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_v1wt" && !this.fxdefaulttheme){
	  document.getElementById('ctraddon_altabico_list').disabled = false;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	} else if (which=="appbutton_off" || which=="appbutton_pm" || which=="appbutton_v2h"){
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = true;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = true;
	  document.getElementById('ctraddon_dblclclosefx').disabled = true;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = true;
	} else if (which=="appbutton_v2io" || which=="appbutton_v2io2") {
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = true;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = true;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  
	  if (tabsintitlebar==false && fromprefwindow==true) {
		Services.prefs.getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }
	} else {
	  document.getElementById('ctraddon_altabico_list').disabled = true;
	  document.getElementById('ctraddon_abhigher').disabled = true;
	  document.getElementById('ctraddon_appbutbdl').disabled = false;
	  document.getElementById('ctraddon_appbutcolor_list').disabled = false;
	  document.getElementById('ctraddon_dblclclosefx').disabled = false;
	  document.getElementById('ctraddon_pw_appbutonclab').disabled = false;
	  document.getElementById('ctraddon_pw_appbuttontxt').disabled = false;
	  document.getElementById('ctraddon_appbclmmenus').disabled = false;
	  
	  if (tabsintitlebar==false && fromprefwindow==true) {
		Services.prefs.getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	  }
	}
  },
  
  ctrpwAppbuttonColorExtra: function(which){
  
    if(which=="appbuttonc_custom") {
	  document.getElementById('ctraddon_pw_cappbutc1').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutc1cp').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutcm').hidden = true;
	  document.getElementById('ctraddon_pw_cappbutcmcp').hidden = true;	  
	  document.getElementById('ctraddon_pw_cappbutc2').disabled = false;
	  document.getElementById('ctraddon_pw_cappbutc2cp').disabled = false;  
	}
	if(which=="appbuttonc_custom1") {
			document.getElementById('ctraddon_pw_cappbutc1').disabled = false;
			document.getElementById('ctraddon_pw_cappbutc1cp').disabled = false;		
			document.getElementById('ctraddon_pw_cappbutcm').hidden = false;
			document.getElementById('ctraddon_pw_cappbutcmcp').hidden = false;
			document.getElementById('ctraddon_pw_cappbutc2').disabled = false;
			document.getElementById('ctraddon_pw_cappbutc2cp').disabled = false;	  			
	}
		
		if (which=="appbuttonc_custom" || which=="appbuttonc_custom1"){
			document.getElementById('ctraddon_cappbutcPercentnp').disabled = false;	

			switch(this.prefs.getCharPref("appbutton")){
			
				case "appbutton_v1wt": 
					document.getElementById('ctraddon_pw_cappbutctcl').disabled = false;
					document.getElementById('ctraddon_pw_cappbutctct').disabled = false; 
					document.getElementById('ctraddon_pw_cappbutctcc').disabled = false;
					document.getElementById('ctraddon_cappbutnotxtsh').disabled = false;					
				break;
				case "appbutton_v2": 
					document.getElementById('ctraddon_pw_cappbutctcl').disabled = false;
					document.getElementById('ctraddon_pw_cappbutctct').disabled = false; 
					document.getElementById('ctraddon_pw_cappbutctcc').disabled = false; 
					document.getElementById('ctraddon_cappbutnotxtsh').disabled = false;		
				break;
				case "appbutton_v2wt2": 
					document.getElementById('ctraddon_pw_cappbutctcl').disabled = false;
					document.getElementById('ctraddon_pw_cappbutctct').disabled = false; 
					document.getElementById('ctraddon_cappbutnotxtsh').disabled = false;		
				break;

			}			
			
		}else{
			document.getElementById('ctraddon_cappbutcPercentnp').disabled = true;	
			document.getElementById('ctraddon_pw_cappbutc1').disabled = true;
			document.getElementById('ctraddon_pw_cappbutc1cp').disabled = true; 		
			document.getElementById('ctraddon_pw_cappbutcm').hidden = true;
			document.getElementById('ctraddon_pw_cappbutcmcp').hidden = true;
			document.getElementById('ctraddon_pw_cappbutc2').disabled = true;			
			document.getElementById('ctraddon_pw_cappbutc2cp').disabled = true;			
		}
  
  },
  
  ctrpwStarFeedDelay: function(){
	document.getElementById('ctraddon_pw_starinurl').disabled = true;
	document.getElementById('ctraddon_pw_feedinurl').disabled = true;
	document.getElementById("ctraddon_pw_starinurl").style.listStyleImage="url('chrome://classic_theme_restorer/content/images/throbber_loading.png')";
	document.getElementById("ctraddon_pw_feedinurl").style.listStyleImage="url('chrome://classic_theme_restorer/content/images/throbber_loading.png')";
	
	setTimeout(function(){
		document.getElementById('ctraddon_pw_starinurl').disabled = false;
		document.getElementById('ctraddon_pw_feedinurl').disabled = false;
		document.getElementById("ctraddon_pw_starinurl").style.listStyleImage="unset";
		document.getElementById("ctraddon_pw_feedinurl").style.listStyleImage="unset";
		
		if (classicthemerestorerjso.ctr.prefs.getBoolPref('starinurl'))
		  document.getElementById('ctraddon_pw_bmanimation').disabled = true;
		else document.getElementById('ctraddon_pw_bmanimation').disabled = false;
	},1350);
  },
  
  resetCTRpreferences: function() {
    var preferences = document.getElementsByTagName("preference");
    for (let preference of preferences) {
      preference.value = preference.defaultValue == null ? undefined : preference.defaultValue;
    }

	var tabsintitlebar = Services.prefs.getBranch("browser.tabs.").getBoolPref("drawInTitlebar");
										
	if (this.oswindows && tabsintitlebar) {
	  this.prefs.setCharPref("appbutton",'appbutton_v2');
	}
	
	this.initprefwindow();

  this.ctrpwStarFeedDelay();

	CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",5);	
	CustomizableUI.removeWidgetFromArea("feed-button", CustomizableUI.TYPE_TOOLBAR);
	this.needsBrowserRestart();
  },

  // 'classic' preset
  classicCTRpreferences: function() {
	this.resetCTRpreferences();
	
	if(classicthemerestorerjso.ctr.tmp_tu_active==false) classicthemerestorerjso.ctr.prefs.setIntPref("ctabwidth",250);
	this.prefs.setBoolPref("panelmenucol",true);
	this.prefs.setBoolPref("verifiedcolors",true);
	this.prefs.setCharPref("findbar",'findbar_bottoma');
	this.prefs.setBoolPref("hideprivmask",true);
	this.prefs.setBoolPref("cpanelmenus",true);
	this.prefs.setBoolPref("emptyfavicon",true);
	this.prefs.setBoolPref("hidezoomres",true);
	this.prefs.setBoolPref("faviconurl",true);
	this.prefs.setBoolPref("bmanimation",true);
	this.prefs.setBoolPref("pananimation",true);
	this.prefs.setBoolPref("alt_newtabp",true);

	if (contexts.getBoolPref("classic")){}else{
		this.prefs.setBoolPref("noconicons",true);
	}

	setTimeout(function(){
		classicthemerestorerjso.ctr.prefs.setBoolPref("starinurl",true);
		classicthemerestorerjso.ctr.prefs.setBoolPref("feedinurl",true);
	},1350);
	
	if (this.oswindows && classicthemerestorerjso.ctr.tmp_tu_active==false)
		classicthemerestorerjso.ctr.prefs.setBoolPref("dblclnewtab",true);
	
	this.needsBrowserRestart();

  },

  // 'Australis' preset
  AustralisCTRpreferences: function() {
	this.resetCTRpreferences();
	CustomizableUI.moveWidgetWithinArea("bookmarks-menu-button",5);
	this.prefs.setCharPref("appbutton",'appbutton_off');	
	this.prefs.setCharPref("tabs",'tabs_default');
  this.prefs.setBoolPref("statusbar",false);
	this.prefs.setBoolPref("activndicat",false);
  this.prefs.setBoolPref("toolsitem",false);
  this.prefs.setBoolPref("cuibuttons",false);
	if (this.oswindows) this.prefs.setBoolPref("dblclnewtab",true);
  Services.prefs.getBranch("browser.tabs.").setBoolPref("drawInTitlebar", true);
	this.needsBrowserRestart();

  },

  /* export CTR settings Text */
  exportCTRpreferences: function() {
	  
	  
	var preflist = Services.prefs.getChildList("extensions.classicthemerestorer.");

	let preferenceArray = [];
		 
	// Add filter header
	preferenceArray.push("CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers");	

		// Exclude all preferences we don't want to export/import.
		let blacklist = [
		"extensions.classicthemerestorer.pref_actindx",
		"extensions.classicthemerestorer.pref_actindx2",
		"extensions.classicthemerestorer.ctrreset",
		"extensions.classicthemerestorer.compatibility.treestyle",
		"extensions.classicthemerestorer.compatibility.treestyle.disable",
		"extensions.classicthemerestorer.compatibility.tabmix",
		"extensions.classicthemerestorer.ctrpref.firstrun",
		"extensions.classicthemerestorer.ctrpref.lastmod",
		"extensions.classicthemerestorer.ctrpref.lastmodapply",
		"extensions.classicthemerestorer.ctrpref.updatekey",
		"extensions.classicthemerestorer.version",
		"extensions.classicthemerestorer.features.firstrun",
		"extensions.classicthemerestorer.ctrpref.lastmod.backup"
		];

	// Filter preference type and return its value.
	function prefValue(pref){

	  switch (Services.prefs.getPrefType(pref)){
		case 32:	return Services.prefs.getCharPref(pref);	break;
		case 64:	return Services.prefs.getIntPref(pref);		break;
		case 128:	return Services.prefs.getBoolPref(pref);	break;	
	  }

	}	
	
	//Filter preference type and return its filter value.	
	function prefType(pref){

	  switch (Services.prefs.getPrefType(pref)){
		case 32:	return ":";	break;
		case 64:	return "~";	break;
		case 128:	return "=";	break;	
	  }

	}

	for (var i=0; i < preflist.length; i++) {

	  try {
		// Run Blacklist filter. Exclude all preferences we don't want to export/import.
		var index = preflist.indexOf(blacklist[i]);

		if (index > -1) {
		  preflist.splice(index, 1);
		}

		// Filter extensions.classicthemerestorer.*
		var sliceNdice = preflist[i].replace("extensions.classicthemerestorer.", "");
		
		// Populate array	
		preferenceArray.push(
		  sliceNdice+prefType(preflist[i])+prefValue(preflist[i]) 
		);

	  } catch(e) {
		// Report errors to console
		Components.utils.reportError(e);
	  }

	}	  
	  
	// Use new less bulky export for text.
	saveToFile(preferenceArray);
	  
	function saveToFile(patterns) {

	  const nsIFilePicker = Components.interfaces.nsIFilePicker;
	  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	  var stream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

	  fp.init(window, null, nsIFilePicker.modeSave);
	  fp.defaultExtension = "txt";
	  fp.defaultString = "CTRpreferences.txt";
	  fp.appendFilters(nsIFilePicker.filterText);

	  if (fp.show() != nsIFilePicker.returnCancel) {
		let file = fp.file;
		if (!/\.txt$/.test(file.leafName.toLowerCase()))
		  file.leafName += ".txt";
		if (file.exists())
		  file.remove(true);
		file.create(file.NORMAL_FILE_TYPE, parseInt("0666", 8));
		stream.init(file, 0x02, 0x200, null);

		for (var i = 0; i < patterns.length ; i++) {
		  patterns[i]=patterns[i]+"\n";
		  stream.write(patterns[i], patterns[i].length);
		}
		stream.close();
	  }
	}
	  
	return true;
  },
  
  /* import CTR settings */
  importCTRpreferences: function() {
 
	var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");
  
	var pattern = loadFromFile();

	if (!pattern) return false;
	   
	if(pattern[0]!="CTR_Preferences__DO_NOT_EDIT__'='->booleans__':'->strings__'~'->integers") {
	  alert(stringBundle.GetStringFromName("import.error"));
	  return false;
	}

	var i, prefName, prefValue;
	   
	for (i=1; i<pattern.length; i++){
	  var index1 = pattern[i].indexOf("="); // for finding booleans
	  var index2 = pattern[i].indexOf(":"); // for finding strings
	  var index3 = pattern[i].indexOf("~"); // for finding integers

	  if (index2 > 0){ // find string
		 prefName  = pattern[i].substring(0,index2);
		 prefValue = pattern[i].substring(index2+1,pattern[i].length);
		 
		 this.prefs.setCharPref(''+prefName+'',''+prefValue+'');
	  }
	  else if (index1 > 0){ // find boolean
		 prefName  = pattern[i].substring(0,index1);
		 prefValue = pattern[i].substring(index1+1,pattern[i].length);
		 
		 // if prefValue string is "true" -> true, else -> false
		 this.prefs.setBoolPref(''+prefName+'',(prefValue === 'true'));
	  }
	  else if (index3 > 0){ // find integer
		 prefName  = pattern[i].substring(0,index3);
		 prefValue = pattern[i].substring(index3+1,pattern[i].length);
		 
		 this.prefs.setIntPref(''+prefName+'',prefValue);
	  }
	}
	   
	function loadFromFile() {

	   const nsIFilePicker = Components.interfaces.nsIFilePicker;
	   var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	   var stream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	   var streamIO = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

	   fp.defaultExtension = "txt";
	   fp.defaultString = "CTRpreferences.txt";
	   fp.init(window, null, nsIFilePicker.modeOpen);
	   fp.appendFilters(nsIFilePicker.filterText);

	   if (fp.show() != nsIFilePicker.returnCancel) {
		  stream.init(fp.file, 0x01, parseInt("0444", 8), null);
		  streamIO.init(stream);
		  var input = streamIO.read(stream.available());
		  streamIO.close();
		  stream.close();

		  var linebreak = input.match(/(((\n+)|(\r+))+)/m)[1];
		  return input.split(linebreak);
	   }
	   return null;
	}
	
	this.needsBrowserRestart();
	
	return true;
  },
  
  /* import CTR settings JSON*/
  importCTRpreferencesJSON: function() {
 
	var stringBundle = Services.strings.createBundle("chrome://classic_theme_restorer/locale/messages.file");

	var parjson = loadFromFile();

	if (!parjson) return false;
	
	function setPrefValue(pref, val){

	  switch (Services.prefs.getPrefType(pref)){
		case 32:	return Services.prefs.setCharPref(pref, val);	break;
		case 64:	return Services.prefs.setIntPref(pref, val);	break;
		case 128:	return Services.prefs.setBoolPref(pref, val);	break;	
	  }

	}
			
	for (var i=0; i<parjson.length; i++) {					  
	  try {

		if(parjson[i].preference.match(/extensions.classicthemerestorer./g)){
			setPrefValue(parjson[i].preference, parjson[i].value);
		}

	  } catch(e) {
		// Report errors to console
		Components.utils.reportError(e);
	  }
	}	

	// Need to check if json is valid. If json not valid. don't continue and show error.
	function IsJsonValid(text) {

	  try { JSON.parse(text); }
	  catch (e) { return false; }
	  return true;

	}				
	 
	function loadFromFile() {

	   const nsIFilePicker = Components.interfaces.nsIFilePicker;
	   var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	   var stream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
	   var streamIO = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

	   fp.defaultExtension = "json";
	   fp.defaultString = "CTRpreferences.json";
	   fp.init(window, null, nsIFilePicker.modeOpen);
	   fp.appendFilters(nsIFilePicker.filterAll);

	   if (fp.show() != nsIFilePicker.returnCancel) {
		  stream.init(fp.file, 0x01, parseInt("0444", 8), null);
		  streamIO.init(stream);
		  var input = streamIO.read(stream.available());
		  streamIO.close();
		  stream.close();

		 var text = input;

		  if(!IsJsonValid(text)){
			  alert(stringBundle.GetStringFromName("import.errorJSON"));
			  return false;
		  } else{
			return JSON.parse(input);
		  }
	   }
	   return null;
	}
	
	this.needsBrowserRestart();
	
	return true;
  },
  
  /* export CTR settings JSON */
  exportCTRpreferencesJSON: function() {

	var preflist = Services.prefs.getChildList("extensions.classicthemerestorer.");

	let preferenceArray = {
	  preference: [],
	  value: []
	};

		// Exclude all preferences we don't want to export/import.
		let blacklist = [
		"extensions.classicthemerestorer.pref_actindx",
		"extensions.classicthemerestorer.pref_actindx2",
		"extensions.classicthemerestorer.ctrreset",
		"extensions.classicthemerestorer.compatibility.treestyle",
		"extensions.classicthemerestorer.compatibility.treestyle.disable",
		"extensions.classicthemerestorer.compatibility.tabmix",
		"extensions.classicthemerestorer.ctrpref.firstrun",
		"extensions.classicthemerestorer.ctrpref.lastmod",
		"extensions.classicthemerestorer.ctrpref.lastmodapply",
		"extensions.classicthemerestorer.ctrpref.updatekey",
		"extensions.classicthemerestorer.version",
		"extensions.classicthemerestorer.features.firstrun",
		"extensions.classicthemerestorer.ctrpref.lastmod.backup"
		];

	function prefValue(pref){

	  switch (Services.prefs.getPrefType(pref)){
		case 32:	return Services.prefs.getCharPref(pref);	break;
		case 64:	return Services.prefs.getIntPref(pref);		break;
		case 128:	return Services.prefs.getBoolPref(pref);	break;	
	  }

	}

	for (var i=0; i < preflist.length; i++) {

	  try {
		// 'Blacklist' filter. Exclude all preferences we don't want to export/import.
		var index = preflist.indexOf(blacklist[i]);

		if (index > -1) {
		  preflist.splice(index, 1);
		}

		preferenceArray.preference.push({
		  "preference" : preflist[i],
		  "value" : prefValue(preflist[i])
		});

	  } catch(e) {
		// Report errors to console
		Components.utils.reportError(e);
	  }

	}

	saveToFile(preferenceArray);
	  
	function saveToFile(patterns) {

	  const nsIFilePicker = Components.interfaces.nsIFilePicker;
	  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	  var stream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

	  fp.init(window, null, nsIFilePicker.modeSave);
	  fp.defaultExtension = "json";
	  fp.defaultString = "CTRpreferences.json";
	  fp.appendFilters(nsIFilePicker.filterAll);

	  if (fp.show() != nsIFilePicker.returnCancel) {
		let file = fp.file;
		if (!/\.json$/.test(file.leafName.toLowerCase()))
		  file.leafName += ".json";
		if (file.exists())
		  file.remove(true);
		file.create(file.NORMAL_FILE_TYPE, parseInt("0666", 8));
		stream.init(file, 0x02, 0x200, null);

		var patternItems = JSON.stringify(patterns.preference);

		stream.write(patternItems, patternItems.length)

		stream.close();
	  }
	}

	return true;

  }, 
 
  onCtrPanelSelect: function() {
    let ctrAddonPrefBoxTab = document.getElementById("CtrRadioGroup");
    let selectedPanel = document.getElementById(ctrAddonPrefBoxTab.value);
    selectedPanel.parentNode.selectedPanel = selectedPanel;

    for (let i=0; i < ctrAddonPrefBoxTab.itemCount; i++) {
      let radioItem = ctrAddonPrefBoxTab.getItemAtIndex(i);
      let pane = document.getElementById(radioItem.value);
      pane.setAttribute("selected", (radioItem.selected)? "true" : "false");
    }
  },
  
 	ReuseFeaturesTab: function (attrName, url) {
	
	try{
			  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
								 .getService(Components.interfaces.nsIWindowMediator);
			  for (var found = false, index = 0, tabbrowser = wm.getEnumerator('navigator:browser').getNext().gBrowser;
				   index < tabbrowser.tabContainer.childNodes.length && !found;
				   index++) {

				// Get the next tab
				var currentTab = tabbrowser.tabContainer.childNodes[index];
			  
				// Does this tab contain our custom attribute?
				if (currentTab.hasAttribute(attrName)) {

				  // Yes--select and focus it.
				  tabbrowser.selectedTab = currentTab;

				  // Focus *this* browser window in case another one is currently focused
				  tabbrowser.ownerDocument.defaultView.focus();
				  found = true;
				}
			  }

			  if (!found) {
				// Our tab isn't open. Open it now.
				var browserEnumerator = wm.getEnumerator("navigator:browser");
				var tabbrowser = browserEnumerator.getNext().gBrowser;
			  
				// Create tab
				var newTab = tabbrowser.addTab(url);
				newTab.setAttribute(attrName, "cyberctrfeatures");
			  
				// Focus tab
				tabbrowser.selectedTab = newTab;
				
				// Focus *this* browser window in case another one is currently focused
				tabbrowser.ownerDocument.defaultView.focus();
			  }
			  
		}catch (e){
			//Catch any nasty errors and output to dialogue
			alert("We are sorry but something has gone wrong! " + e);	
		}
			  
	},
	
	showFeaturesTab	: function(){
	try{	
			this.ReuseFeaturesTab("cyberctrfeatruestab", "chrome://classic_theme_restorer/content/compatibility/features.html");
		}catch (e){
			//Catch any nasty errors and output to dialogue
			alert("We are sorry but something has gone wrong! " + e);	
		}		
	}
  
};
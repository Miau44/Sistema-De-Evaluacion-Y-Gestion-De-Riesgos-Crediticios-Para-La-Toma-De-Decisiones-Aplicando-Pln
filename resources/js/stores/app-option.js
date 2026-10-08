import { defineStore } from "pinia";

export const useAppOptionStore = defineStore({
  id: "appOption",
  state: () => {
    return {
    	appThemeClass: '',
    	appDarkMode: '',
			appHeaderHide: false,
			appHeaderFixed: true,
			appHeaderInverse: false,
			appHeaderSearchToggled: false,
			appHeaderLanguageBar: false,
			appHeaderMegaMenu: false,
			
			appSidebarTwo: false,
			appSidebarHide: false,
			appSidebarEnd: false,
			appSidebarWide: false,
			appSidebarLight: false,
			appSidebarFixed: true,
			appSidebarCollapsed: false,
			appSidebarMobileToggled: false,
			appSidebarMobileClosed: false,
			appSidebarMinified: false,
			appSidebarHover: false,
			appSidebarSearch: false,
			appSidebarEndToggled: false,
			appSidebarEndMobileToggled: false,
			appSidebarTransparent: false,
			
			appTopMenu: false,
			
			appContentFullHeight: false,
			appContentClass: '',
			
			appFooter: false,
			appFooterFixed: false,
			
			appThemePanelToggled: false
		}
  }
});

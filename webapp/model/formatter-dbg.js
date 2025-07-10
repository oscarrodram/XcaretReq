sap.ui.define([], () => {
	"use strict";

	return {
		getSumiText: function (status) {
			switch (status) {
				case 1: return "Grupo Xcaret";
				case 2: return "Quintana";
				case 3: return "Xdifica";
			}
		}
	};
});
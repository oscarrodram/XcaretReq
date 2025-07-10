sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
], function(ResourceModel) {
    "use strict";

    let oResourceBundle;

    return {
        init: function(oComponent) {
            const oModel = oComponent.getModel("i18n") || new ResourceModel({
                bundleName: "contractv2.i18n.i18n"
            });
            oResourceBundle = oModel.getResourceBundle();
        },

        getText: function(sKey, aParams) {
            if (!oResourceBundle) {
                console.warn("I18nUtil no ha sido inicializado correctamente.");
                return sKey;
            }
            return oResourceBundle.getText(sKey, aParams);
        },

        getDescription: function (modelPath, descField, keyField, keyValue) {
            let items = this.getOwnerComponent().getModel("serviceModel").getProperty(modelPath);
            let match = items.find(item => item[keyField] === keyValue);
            return match ? match[descField] : null;
        },

        getSumin: function(sumin) {
            let lSumin = "";

            switch (sumin){
                case 1:
                    return 'Grupo Xcaret';
                case 2:
                    return 'Quintana';
                case 3:
                    return  'Xdifica';
            }

        }
    };
});
sap.ui.define([
    "sap/ui/core/UIComponent",
    "reprequeriments/model/models",
    "reprequeriments/model/SettingsModel",
    "sap/ui/model/json/JSONModel",
], (UIComponent, models, SettingsModel, JSONModel) => {
    "use strict";

    return UIComponent.extend("reprequeriments.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(SettingsModel.createSettingsModel(), "settingsModel");

            // enable routing
            this.getRouter().initialize();
        }
    });
});
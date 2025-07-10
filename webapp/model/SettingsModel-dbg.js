sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
    "use strict";

    return {
        createSettingsModel: function () {
            let oModel = new JSONModel({
                LOEKZ: true,
                PSPNR: true,
                PROJECT_NAME: true,
                ERDAT: true,
                BANFN: true,
                BNFPO: true,
                STATUS: true,
                MATNR: true,
                MATERIAL_NAME: false,
                MATERIAL_DESC: true,
                MENGE: true,
                MEINS: true,
                CATEGORY_DESC: false,
                FAMILY_DESC: false,
                BRAND_DESC: false,
                MODEL_DESC: false,
                MAT_DIMENSIONS: false,
                FGMDI: false,
                MAT_FIXED_ASSET: false,
                MAT_STANDARD: false,
                MAT_PATRIMONIO: false,
                MAT_SPECIAL: false,
                DIVISION_DESC: false,
                AREA_DESC: false,
                UBICA: false,
                SUBIC: false,
                SUMIN: false,
                VISTA: false,
                EBELN: false,
                EBELP: false,
                TEXTO: false,
                CREATION_NAME: false,
                MODIFY_NAME: false
            });
            return oModel;
        },
        createSettingsModelStatus: function () {
            let oModel = new JSONModel([
                {
                    ID: "1",
                    Icon: "sap-icon://accept",
                    State: "None"
                },
                {
                    ID: "2",
                    Icon: "sap-icon://error",
                    State: "Warning"
                },
                {
                    ID: "3",
                    Icon: "sap-icon://sys-minus",
                    State: "Information"
                },
                {
                    ID: "4",
                    Icon: "sap-icon://complete",
                    State: "Success"
                },
                {
                    ID: "5",
                    Icon: "sap-icon://delete",
                    State: "Error"
                }
            ]);
            return oModel;
        }
    };
});
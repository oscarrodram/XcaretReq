sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "reprequeriments/utils/getData",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    'sap/m/Token',
    "sap/m/MessageToast",
    'sap/ui/comp/smartvariants/PersonalizableInfo',
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "reprequeriments/utils/constants",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    "reprequeriments/model/formatter"
], (Controller, getData, Filter, FilterOperator, Fragment, Token, MessageToast, PersonalizableInfo, JSONModel, UIComponent, constants, Spreadsheet, exportLibrary, formatter) => {
    "use strict";

    const FragmentMap = [
        { DialogRout: "reprequeriments.view.fragments.mProyecto", DialogID: "V1", InputField: "pspnr", Filter1: "PSPNR" },
        { DialogRout: "reprequeriments.view.fragments.mReq", DialogID: "V2", InputField: "Req", Filter1: "BANFN" },
        { DialogRout: "reprequeriments.view.fragments.mMat", DialogID: "V3", InputField: "Matnr", Filter1: "MATNR" },
        { DialogRout: "reprequeriments.view.fragments.mCat", DialogID: "V4", InputField: "CATEGORY_ID", Filter1: "CATEGORY_ID" },
        { DialogRout: "reprequeriments.view.fragments.mFam", DialogID: "V5", InputField: "Family", Filter1: "FAMILY_ID" },
        { DialogRout: "reprequeriments.view.fragments.mFFE", DialogID: "V6", InputField: "FGMDI", Filter1: "FGMDI" },
        { DialogRout: "reprequeriments.view.fragments.mDiv", DialogID: "V7", InputField: "DIVSN", Filter1: "DIVSN" },
        { DialogRout: "reprequeriments.view.fragments.mArea", DialogID: "V8", InputField: "AREA", Filter1: "AREA" },
        { DialogRout: "reprequeriments.view.fragments.mUbi", DialogID: "V9", InputField: "UBI", Filter1: "UBICA" },
        { DialogRout: "reprequeriments.view.fragments.mSubi", DialogID: "V10", InputField: "SUBI", Filter1: "SUBIC" },
        { DialogRout: "reprequeriments.view.fragments.mUser", DialogID: "V11", InputField: "CNAME", Filter1: "ERNAM" }
    ];

    const EdmType = exportLibrary.EdmType;
    let oResourceBundlei18n;

    let f1 = [], f2 = [], f3 = [], f4 = [], f5 = [], f6 = [], f7 = [], f8 = [], f9 = [], f10 = [], f11 = [];

    return Controller.extend("reprequeriments.controller.Main", {
        formatter: formatter,
        onInit: async function () {
            oResourceBundlei18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this._setCurrentMonthRange();
            this._getData();

        },
        _getData: async function () {
            const url = this.createUrl();
            const oRequerimientos = await getData.getRequeriments(url);

            const oSubTotals = this._addSubtotalsAndTotalFlat(oRequerimientos);

            const { uPro, uReq, uMat, uCat, uFam, uFfg, uDiv, uArea, uUbi, uSub, uCrea } = oRequerimientos.reduce((acc, item) => {
                if (!acc.tPro[item.PSPNR]) {
                    acc.tPro[item.PSPNR] = true;
                    acc.uPro.push(item);
                }

                if (!acc.tReq[item.BANFN]) {
                    acc.tReq[item.BANFN] = true;
                    acc.uReq.push(item);
                }

                if (!acc.tMat[item.MATNR]) {
                    acc.tMat[item.MATNR] = true;
                    acc.uMat.push(item);
                }

                if (!acc.tCat[item.CATEGORY_ID]) {
                    acc.tCat[item.CATEGORY_ID] = true;
                    acc.uCat.push(item);
                }

                if (!acc.tFam[item.FAMILY_ID]) {
                    acc.tFam[item.FAMILY_ID] = true;
                    acc.uFam.push(item);
                }

                if (!acc.tFfg[item.FGMDI]) {
                    acc.tFfg[item.FGMDI] = true;
                    acc.uFfg.push(item);
                }

                if (!acc.tDiv[item.DIVSN]) {
                    acc.tDiv[item.DIVSN] = true;
                    acc.uDiv.push(item);
                }

                if (!acc.tArea[item.AREA]) {
                    acc.tArea[item.AREA] = true;
                    acc.uArea.push(item);
                }

                if (!acc.tUbi[item.UBICA]) {
                    acc.tUbi[item.UBICA] = true;
                    acc.uUbi.push(item);
                }

                if (!acc.tSub[item.SUBIC]) {
                    acc.tSub[item.SUBIC] = true;
                    acc.uSub.push(item);
                }

                if (!acc.tCrea[item.CREATION_NAME]) {
                    acc.tCrea[item.CREATION_NAME] = true;
                    acc.uCrea.push(item);
                }

                return acc;
            }, {
                uPro: [],
                uReq: [],
                uMat: [],
                uCat: [],
                uFam: [],
                uFfg: [],
                uDiv: [],
                uArea: [],
                uUbi: [],
                uSub: [],
                uCrea: [],
                tPro: {},
                tReq: {},
                tMat: {},
                tCat: {},
                tFam: {},
                tFfg: {},
                tDiv: {},
                tArea: {},
                tUbi: {},
                tSub: {},
                tCrea: {}
            });

            // Actualizar modelo
            const fArea = uArea.reduce((acc, item) => {
                if (item.AREA_DESC !== null) {
                    acc.push({
                        ...item,
                        AREA: String(item.AREA)
                    });
                }
                return acc;
            }, []);
            const oModel = this.getOwnerComponent().getModel("serviceModel");
            oModel.setProperty("/fPro", uPro);
            oModel.setProperty("/fReq", uReq);
            oModel.setProperty("/fMat", uMat);
            oModel.setProperty("/fCat", uCat);
            oModel.setProperty("/fFam", uFam);
            oModel.setProperty("/ffg", uFfg);
            oModel.setProperty("/fDiv", uDiv);
            oModel.setProperty("/fArea", fArea);
            oModel.setProperty("/fUbi", uUbi);
            oModel.setProperty("/fSub", uSub);
            oModel.setProperty("/fCrea", uCrea);

            this.getOwnerComponent().getModel("serviceModel").setProperty("/repRequerimientos", oSubTotals);

        },
        createUrl: function () {
            const sBaseUrl2 = `${getData.getURL()}${constants.API.REQUERIMENTS_ENDPOINT}`;

            // Obtener fechas del DateRangeSelection
            let date = this.getView().byId("dateRangeFilter").getDateValue();
            let date2 = this.getView().byId("dateRangeFilter").getSecondDateValue();

            // Formatear fechas (asegúrate de que formatDate devuelva 'YYYY-MM-DD')
            let sStartDate = this.formatDate(date);
            let sEndDate = this.formatDate(date2);

            // Crear filtro de fechas
            const dateFilter = sStartDate && sEndDate
                ? `(EBAN.ERDAT BETWEEN DATE '${sStartDate}' AND DATE '${sEndDate}')`
                : "";

            // Campos para filtros adicionales
            const fields = [
                { "id": "pspnr", "param": "PSPNR" },
                { "id": "Req", "param": "BANFN" },
                { "id": "Matnr", "param": "EBAN.MATNR" },
                { "id": "CATEGORY_ID", "param": "MARA.CATEGORY" },
                { "id": "Family", "param": "MARA.FAMILY" },
                { "id": "FGMDI", "param": "EBAN.FGMDI" },
                { "id": "DIVSN", "param": "EBAN.DIVSN" },
                { "id": "AREA", "param": "EBAN.AREA" },
                { "id": "UBI", "param": "EBAN.UBICA" },
                { "id": "SUBI", "param": "EBAN.SUBIC" },
                { "id": "CNAME", "param": "EBAN.ERNAM" }
            ];

            // Generar filtros para los demás campos
            let queryParts = fields
                .map(field => {
                    const tokens = this.byId(field.id).getTokens().map(item => item.getKey());
                    if (tokens.length === 0) return null;

                    const orConditions = tokens.map(token => `${field.param} EQ '${token}'`).join(" OR ");
                    return `(${orConditions})`;
                })
                .filter(Boolean);

            // Combinar todos los filtros
            let allFilters = [];
            if (dateFilter) allFilters.push(dateFilter);
            if (queryParts.length > 0) allFilters.push(queryParts.join(" AND "));

            // Construir query final
            const query = allFilters.length > 0
                ? `$filter=${allFilters.join(" AND ")}`
                : "";

            return query ? `${sBaseUrl2}?${query}` : sBaseUrl2;

        }
        , formatDate: function (oDate) {
            if (!oDate) return "";
            let year = oDate.getFullYear();
            let month = String(oDate.getMonth() + 1).padStart(2, "0");
            let day = String(oDate.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        _setCurrentMonthRange: function () {
            var oDateRange = this.byId("dateRangeFilter");
            var oFirstDay = new Date();
            oFirstDay.setDate(1); // Primer día del mes

            var oLastDay = new Date(oFirstDay);
            oLastDay.setMonth(oLastDay.getMonth() + 1);
            oLastDay.setDate(0); // Último día del mes

            // Formatear a YYYY-MM-DD
            var sStartDate = this._formatDate(oFirstDay);
            var sEndDate = this._formatDate(oLastDay);

            oDateRange.setDateValue(new Date(sStartDate));
            oDateRange.setSecondDateValue(new Date(sEndDate));
        },

        _formatDate: function (oDate) {
            var year = oDate.getFullYear();
            var month = (oDate.getMonth() + 1).toString().padStart(2, '0');
            var day = oDate.getDate().toString().padStart(2, '0');
            return year + '-' + month + '-' + day;
        },

        onDateRangeChange: function (oEvent) {
            var oDateRange = oEvent.getSource();
            var aDates = oDateRange.getDates();

            if (aDates.length === 2) {
                var oStartDate = aDates[0];
                var oEndDate = aDates[1];

            }
        },
        findHandleFragment: async function (oEvent) {
            const source = oEvent.getSource();
            const dialogID = source.data("fragmentPath");
            const fragmentConfig = FragmentMap.find((fragment) => fragment.DialogID === dialogID);

            if (fragmentConfig) {
                this.openValueHelpDialog(fragmentConfig.DialogRout, fragmentConfig.Filter1, fragmentConfig.DialogID);
            }
        },

        openValueHelpDialog: function (fragmentName, filterKey, dialogId) {
            if (!this._dialogs) this._dialogs = {};

            if (!this._dialogs[fragmentName]) {
                this._dialogs[fragmentName] = Fragment.load({
                    id: dialogId,
                    name: fragmentName,
                    controller: this
                }).then((dialog) => {
                    this.getView().addDependent(dialog);
                    return dialog;
                });
            }

            this._dialogs[fragmentName].then((dialog) => {
                dialog.getBinding("items").filter([new Filter(filterKey, FilterOperator.Contains, "")]);
                dialog.open();
            });
        },

        _handleDialogClose: function (oEvent) {
            const selectedItems = oEvent.getParameter("selectedItems") || [];
            const inputID = oEvent.getSource().data("fragmentPath");
            const inputField = this.byId(inputID);
            let oMultiInput = this.byId(inputID);

            inputField.removeAllTokens();

            var row = FragmentMap.find(function (fragment) {
                return fragment.InputField === inputID;
            });

            if (selectedItems && selectedItems.length > 0) {

                selectedItems.forEach(function (oItem) {

                    switch (row.InputField) {
                        case "pspnr":
                            f1 = [];
                            f1.push(oItem.getTitle());
                            break;
                        case "Req":
                            f2 = [];
                            f2.push(oItem.getTitle());
                            break;
                        case "Matnr":
                            f3 = [];
                            f3.push(oItem.getTitle());
                            break;
                        case "CATEGORY_ID":
                            f4 = [];
                            f4.push(oItem.getTitle());
                            break;
                        case "Family":
                            f5 = [];
                            f5.push(oItem.getTitle());
                            break;
                        case "FGMDI":
                            f6 = [];
                            f6.push(oItem.getTitle());
                            break;
                        case "DIVSN":
                            f7 = [];
                            f7.push(oItem.getTitle());
                            break;
                        case "AREA":
                            f8 = [];
                            f8.push(oItem.getTitle());
                            break;
                        case "UBI":
                            f9 = [];
                            f9.push(oItem.getTitle());
                            break;
                        case "SUBI":
                            f10 = [];
                            f10.push(oItem.getTitle());
                            break;
                        case "CNAME":
                            f11 = [];
                            f11.push(oItem.getTitle());
                            break;
                        default:
                            // Code to execute if no cases match
                            break;
                    }

                    inputField.addToken(new Token({
                        text: oItem.getDescription(),
                        key: oItem.getTitle()
                    }));
                });
            }
        },
        onOpenColumnSettings: function () {
            this.byId("columnSettingsDialog").open();
        },
        onCloseColumnSettings: function () {
            this.byId("columnSettingsDialog").close();
        },
        onToggleColumnVisibility: function (oEvent) {
            let sColumn = oEvent.getSource().getTitle();
            let oModel = this.getView().getModel("settingsModel");
            let bCurrentValue = oModel.getProperty("/" + sColumn);
            oModel.setProperty("/" + sColumn, !bCurrentValue);
        },
        onExport: function () {
            if (!this._oTable) {
                this._oTable = this.byId("tReqs");
            }

            const oTable = this._oTable;
            const oRowBinding = oTable.getBinding("rows");
            let aData = oRowBinding.getCurrentContexts().map(function (oContext) {
                return oContext.getObject();
            });
            const aCols = this.createColumnConfig();
            const oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: "Level"
                },
                dataSource: oRowBinding,
                fileName: "Requerimientos Export.xlsx",
                worker: false // We need to disable worker because we are using a MockServer as OData Service
            };

            const oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },

        createColumnConfig: function () {
            const aCols = [];

            aCols.push({
                property: "LOEKZ",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("LOEKZ")
            });
            aCols.push({
                property: "PSPNR",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("PSPNR")
            });
            aCols.push({
                property: "PROJECT_NAME",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("PROJECT_NAME")
            });
            aCols.push({
                property: "ERDAT",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("ERDAT")
            });
            aCols.push({
                property: "BANFN",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("BANFN")
            });
            aCols.push({
                property: "BNFPO",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("BNFPO")
            });
            aCols.push({
                property: "STATUS",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("STATUS")
            });
            aCols.push({
                property: "MATNR",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MATNR")
            });
            aCols.push({
                property: "MATERIAL_NAME",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MATERIAL_NAME")
            });
            aCols.push({
                property: "MATERIAL_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MATERIAL_DESC")
            });
            aCols.push({
                property: "MENGE",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MENGE")
            });
            aCols.push({
                property: "MEINS",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MEINS")
            });
            aCols.push({
                property: "CATEGORY_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("CATEGORY_DESC")
            });
            aCols.push({
                property: "FAMILY_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("FAMILY_DESC")
            });
            aCols.push({
                property: "BRAND_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("BRAND_DESC")
            });
            aCols.push({
                property: "MODEL_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MODEL_DESC")
            });
            aCols.push({
                property: "MAT_DIMENSIONS",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MAT_DIMENSIONS")
            });
            aCols.push({
                property: "MAT_FIXED_ASSET",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MAT_FIXED_ASSET")
            });
            aCols.push({
                property: "MAT_STANDARD",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MAT_STANDARD")
            });
            aCols.push({
                property: "MAT_PATRIMONIO",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MAT_PATRIMONIO")
            });
            aCols.push({
                property: "MAT_SPECIAL",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MAT_SPECIAL")
            });
            aCols.push({
                property: "DIVISION_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("DIVISION_DESC")
            });
            aCols.push({
                property: "AREA_DESC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("AREA_DESC")
            });
            aCols.push({
                property: "UBICA",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("UBICA")
            });
            aCols.push({
                property: "SUBIC",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("SUBIC")
            });
            aCols.push({
                property: "SUMIN",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("SUMIN")
            });
            aCols.push({
                property: "VISTA",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("VISTA")
            });
            aCols.push({
                property: "EBELN",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("EBELN")
            });
            aCols.push({
                property: "EBELP",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("EBELP")
            });
            aCols.push({
                property: "TEXTO",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("TEXTO")
            });
            aCols.push({
                property: "CREATION_NAME",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("CREATION_NAME")
            });
            aCols.push({
                property: "MODIFY_NAME",
                type: EdmType.String,
                label: oResourceBundlei18n.getText("MODIFY_NAME")
            });

            return aCols;
        },
        _addSubtotalsAndTotalFlat: function (aData) {

            const result = [];
            let currentCategory = null;
            let subtotalQty = 0;
            let subtotalRev = 0;
            let totalQty = 0;

            for (let i = 0; i < aData.length; i++) {
                const item = aData[i];

                if (currentCategory && item.BANFN !== currentCategory) {
                    result.push({
                        isSubtotal: true,
                        MATERIAL_DESC: oResourceBundlei18n.getText("sub"),
                        MENGE: subtotalQty
                    });
                    subtotalQty = 0;
                    subtotalRev = 0;
                }

                result.push(item);

                subtotalQty += parseFloat(item.MENGE);
                totalQty += parseFloat(item.MENGE);
                currentCategory = item.BANFN;
            }

            result.push({
                isSubtotal: true,
                MATERIAL_DESC: oResourceBundlei18n.getText("sub"),
                MENGE: subtotalQty,
            });

            result.push({
                isTotal: true,
                MATERIAL_DESC: oResourceBundlei18n.getText("tot"),
                MENGE: totalQty
                //Revenue: totalRev
            });

            return result;
        },
        _handleSearch: function (evt, path) {
            var sValue = evt.getParameter("value");
            var oFilter = "";

            if (sValue) {
                oFilter = new Filter([
                    new Filter(path, FilterOperator.Contains, sValue)
                ]);
            }

            evt.getSource().getBinding("items").filter([oFilter]);
        },
        _handleProyecto: function (evt) {
            this._handleSearch(evt, "PROJECT_NAME");
        },
        _handleReq: function (evt){
            this._handleSearch(evt, "BANFN");
        },
        _handleMat: function (evt){
            this._handleSearch(evt, "MATERIAL_NAME");
        },
        _handleCat: function (evt){
            this._handleSearch(evt, "CATEGORY_DESC");
        },
        _handleFam: function (evt){
            this._handleSearch(evt, "FAMILY_DESC");
        },
        _handleFFE: function (evt){
            this._handleSearch(evt, "FGMDI");
        },
        _handleDiv: function (evt){
            this._handleSearch(evt, "DIVISION_DESC");
        },
        _handleArea: function (evt){
            this._handleSearch(evt, "AREA_DESC");
        },
        _handleUbi: function (evt){
            this._handleSearch(evt, "UBICA");
        },
        _handleSubi: function (evt){
            this._handleSearch(evt, "SUBIC");
        },
        _handleUser: function (evt){
            this._handleSearch(evt, "CREATION_NAME");
        }
    });
});
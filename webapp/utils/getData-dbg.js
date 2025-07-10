sap.ui.define(["sap/ui/core/BusyIndicator",
    "sap/ui/core/Fragment",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/m/MessageBox",
    "reprequeriments/utils/constants",
    "reprequeriments/utils/BaseController"
], function (BusyIndicator, Fragment, Filter, FilterOperator, MessageBox, constants, BaseController) {
    "use strict";

    let sCurrentLanguage = BaseController.getText("idioma");
    let sUserName = "UsuarioDesconocido", sFName, sLName, sEmail, oURLRol, sUserId = "UsuarioDesconocido";
    const fetchData = async function (sUrl, sMethod = "GET", oPayload = null, oHeaders = {}) {
        try {
            const response = await fetch(sUrl, {
                method: sMethod,
                headers: {
                    "Content-Type": constants.API.RTYPE,
                    ...oHeaders
                },
                body: oPayload ? JSON.stringify(oPayload) : null
            });

            if (response.status === 204) {
                // No content, return null or empty object based on your use case
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP error!: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf(constants.API.RTYPE) !== -1) {
                return await response.json();
            } else {
                return await response.text();
            }

        } catch (error) {
            console.error("Error", error);
            throw error;
            //return error;
        }
    };

    return {

        getURL: function (host = window.location.href) {
            const oSyst = [
                { id: "dev", url: constants.API.BASE_DEVURL },
                { id: "qas", url: constants.API.BASE_QASVURL },
                { id: "workspaces", url: constants.API.BASE_DEVURL }
            ];

            const hostNameEnv = new URL(host).hostname.match(/(dev|qas|workspaces)/);
            const hostName = oSyst.filter(syst => syst.id === hostNameEnv[1]);
            return hostName[0].url;

        },

        getContracts: async function (url) {
            //const url = `${this.getURL()}${constants.API.CONTRACT_ENDPOINT}`;
            const oContractData = await fetchData(url, "GET");
            return await fetchData(url, "GET");
        },

        getRequeriments: async function (url) {
            //const url = `${this.getURL()}${constants.API.REQUERIMENTS_ENDPOINT}`;
            const oReq = await fetchData(url, "GET");
            
            return oReq.result
        }

    };
});
import {Util} from "./_helpers/utility";
import {environment} from "./environment";
//import {securityUtil} from "./_helpers/securityUtil";
export const customConfig = {
    apiEndpointmain: Util.getDomain(environment.mainURL),
    apiEndpointbase: Util.getDomain(environment.baseURL),
    baseUrl:Util.getDomain(environment.stage),
    contentType: "application/json",
    accept: "application/json",
    app_id: "talentbase.web.angular",
   // token: (JSON.parse(securityUtil.retrieveFromStorage('currentUser'))) ? JSON.parse(securityUtil.retrieveFromStorage('currentUser')).user.token : '',
    dateFormat: "DD MMM YYYY",
    dateFormatAuditTrail: "DD MMM YYYY HH:mm:ss a",
    dateFormatServer: "DD-MM-YY",
    dateFormatServer2: "DD-MM-YYYY",
};

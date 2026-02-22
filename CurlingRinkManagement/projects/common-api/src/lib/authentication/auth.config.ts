import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:9000/application/o/planner/',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'UejGDbSuG9Qkr76qOFfX3UIcvBV0X4XhdfgcVD6w',
    responseType: 'code',
    scope: 'openid profile email offline_access api',
    showDebugInformation: true,
    timeoutFactor: 0.01,
    checkOrigin: false,
    requireHttps: false,
    strictDiscoveryDocumentValidation:false
};
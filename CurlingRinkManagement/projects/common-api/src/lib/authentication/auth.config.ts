import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:9000/application/o/planner/',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'YHVlctpgoCMaqFi54dZC1PKsn6UDvl7TYZz9PkwW',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    timeoutFactor: 0.75,
    checkOrigin: false,
    requireHttps: false,
    strictDiscoveryDocumentValidation:false
};
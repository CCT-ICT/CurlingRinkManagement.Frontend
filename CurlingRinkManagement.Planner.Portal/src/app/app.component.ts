import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { authCodeFlowConfig } from './auth.config';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    constructor(private oauthService: OAuthService) {
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.loadDiscoveryDocumentAndLogin();
    
        //this.oauthService.setupAutomaticSilentRefresh();
    
        // Automatically load user profile
        this.oauthService.events
          .pipe(filter((e) => e.type === 'token_received'))
          .subscribe((_) => {this.oauthService.loadUserProfile(); console.log(this.oauthService.authorizationHeader())});
      }

      get userName(): string | undefined {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) return undefined;
        return claims['given_name'];
      }  

      logout(){
        this.oauthService.logOut();
      }
    
      refresh() {
        this.oauthService.refreshToken();
      }
}

import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ClubSelectComponent } from "../../../../../common-api/src/public-api";
import { authCodeFlowConfig } from '../../../../../common-api/src/lib/authentication/auth.config';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ClubSelectComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userName?: string | undefined;
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    this.oauthService.setupAutomaticSilentRefresh();
    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        this.oauthService.loadUserProfile();
        this.userName = this.getUserName();
        location.reload();
      });
  }
  ngOnInit(): void {
    this.userName = this.getUserName();

  }

  getUserName(): string | undefined {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return undefined;
    return claims['given_name'];
  }

  logout() {
    this.oauthService.logOut();
  }

  refresh() {
    this.oauthService.refreshToken();
  }
}

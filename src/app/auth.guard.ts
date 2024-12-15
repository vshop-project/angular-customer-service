import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService,private keycloakService: KeycloakService,) {
    super(router, keycloak);
  }
  async login(): Promise<boolean> {
    try {
      await this.keycloakService.login({
        redirectUri: window.location.origin + '/displayShops'
      });
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  }
  async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  async getToken(): Promise<string> {
    return await this.keycloakService.getToken();
  }

  async refreshToken(): Promise<void> {
    try {
      await this.keycloakService.updateToken(30); // Refresh if the token will expire in 30 seconds
    } catch (error) {
      console.error('Failed to refresh token', error);
      await this.keycloakService.login();
    }
  }


  override async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloak.login({
          redirectUri: window.location.origin + state.url
        });
        return;
      }

      const requiredRoles = route.data['roles'];
      if (!requiredRoles || requiredRoles.length === 0) {
        resolve(true);
        return;
      }

      const hasRequiredRole = requiredRoles.every((role: string) => this.roles.includes(role));
      resolve(hasRequiredRole);
    });
  }
}

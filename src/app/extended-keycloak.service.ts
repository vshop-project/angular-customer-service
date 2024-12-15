import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class ExtendedKeycloakService {

  constructor(private keycloakService: KeycloakService) {} 


  createRegisterUrl(): string {
    const keycloakInstance = this.getKeycloakInstance();
    if (!keycloakInstance) {
      throw new Error('Keycloak instance is not initialized');
    }
    const registrationUrl = `${keycloakInstance.authServerUrl}/realms/${keycloakInstance.realm}/protocol/openid-connect/registrations`;
    return registrationUrl;
  }

  private getKeycloakInstance(): Keycloak.KeycloakInstance {
    try {
      const keycloakInstance = this.keycloakService.getKeycloakInstance();
      return keycloakInstance;
    } catch (error) {
      throw new Error('Keycloak instance is not available');
    }
  }

}

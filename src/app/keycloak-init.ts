import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

// export function initializeKeycloak(keycloak: KeycloakService,router: Router): () => Promise<boolean> {
export function initializeKeycloak(keycloak: KeycloakService,router: Router) {
  return (): Promise<boolean> =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',  //https://13.201.130.157:8443 Keycloak server URL
        realm: 'Angular',                    // Your realm name 
        clientId: 'AngKey'        // Your client ID for the Angular app
      },
      initOptions: {
        // onLoad: 'login-required',  
         onLoad: 'check-sso',           // Forces the user to log in if not logged in
        checkLoginIframe: false             // Disable login status check via iframe
      },
     // loadUserProfileAtStartUp: true
    // }).then(authenticated => {
    //   if (authenticated) {
    //     console.log('Authenticated',authenticated)
    //     router.navigate(['/displayShops']); // Redirect to the desired route
    //   } else {
    //     router.navigate(['/displayShops']); // Or redirect to a login route if not authenticated
    //   }
    //   return authenticated;
    // });
    })
    
}
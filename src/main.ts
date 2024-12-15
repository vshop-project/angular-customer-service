import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './app/keycloak-init';
import { Router } from '@angular/router';

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

platformBrowserDynamic().bootstrapModule(AppModule).then(moduleRef => {
  const injector = moduleRef.injector;
  const keycloak = injector.get(KeycloakService);
  const router = injector.get(Router);

  initializeKeycloak(keycloak, router)().then(() => {
    bootstrap();
  }).catch(err => {
    console.error('Keycloak initialization failed', err);
  });
});
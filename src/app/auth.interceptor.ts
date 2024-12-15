import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.keycloak.getToken()).pipe(
      switchMap(token => {
        const headers = request.headers.set('Authorization', 'Bearer ' + token);
        const reqClone = request.clone({ headers });
        return next.handle(reqClone);
      })
    );
  }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return from(this.handleAccess(req, next));
//   }

//   private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
//     const token = await this.keycloak.getToken();
//     if (token) {
//       req = req.clone({
//         setHeaders: {
//           Authorization:` Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(req).toPromise();
//   }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DisplayDataComponent } from './display-data/display-data.component';
// HttpClient module for RESTful API
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {MatPaginatorModule} from '@angular/material/paginator';
 import {MatTableModule} from '@angular/material/table';
 import {MatIconModule} from '@angular/material/icon';
 import {MatSortModule} from '@angular/material/sort';
 
 import {ScrollingModule} from '@angular/cdk/scrolling';

import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppService, ImageService } from './service/http-client.service';
import { HomeComponent } from './home/home.component';
import { ItemsgalleryComponent } from './itemsgallery/itemsgallery.component';
import { ItemsdetailComponent } from './itemsdetail/itemsdetail.component';
import { FilterimagesPipe } from './filterimages.pipe';
import { FilterlocationPipe } from './filterlocation.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PopupWindowComponent } from './popup-window/popup-window.component';
import { MatTreeModule } from '@angular/material/tree';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserDeliveryTimeUpdateComponent } from './user-delivery-time-update/user-delivery-time-update.component';
import { DatePipe } from '@angular/common';



import {MatRadioModule} from '@angular/material/radio';
import {  MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { WebSocketComponentComponent } from './web-socket-component/web-socket-component.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak-init';
import { AuthInterceptor } from './auth.interceptor';
import { ExtendedKeycloakService } from './extended-keycloak.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryStatusNotificationComponent } from './delivery-status-notification/delivery-status-notification.component';
const routes: Routes = [];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        DisplayDataComponent,
        HomeComponent,
        ItemsgalleryComponent,
        ItemsdetailComponent,
        CheckoutComponent,
        FilterimagesPipe,
        FilterlocationPipe,
        DeliveryStatusNotificationComponent,
        PopupWindowComponent,
        UserDeliveryTimeUpdateComponent,
        WebSocketComponentComponent,
    ],
    imports: [
        // RouterModule.forRoot(routes),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatBadgeModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatAutocompleteModule,
        ScrollingModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatTreeModule,
        MatListModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        MatRippleModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        KeycloakAngularModule
        // Ng2SearchPipeModule
    ],
    providers: [AppService, ImageService, FilterimagesPipe, DatePipe,

          {
            provide: APP_INITIALIZER,
            useFactory:  (keycloak: KeycloakService, router: Router) => initializeKeycloak(keycloak, router),
            multi: true,
            deps: [KeycloakService]
          }
    ],
    bootstrap: [AppComponent, HomeComponent]
})
export class AppModule { }

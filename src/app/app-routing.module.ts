import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayDataComponent } from './display-data/display-data.component'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemsgalleryComponent } from './itemsgallery/itemsgallery.component';
import { UserDeliveryTimeUpdateComponent } from './user-delivery-time-update/user-delivery-time-update.component';
import { WebSocketComponentComponent } from './web-socket-component/web-socket-component.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryStatusNotificationComponent } from './delivery-status-notification/delivery-status-notification.component';
// import { AuthGuard } from './auth.guard';


const routes: Routes = [{path:'',component:DisplayDataComponent },
 { path: 'home', component: HomeComponent}, 
{ path: 'itemslist/:locationid/:id/:name', component: ItemsgalleryComponent},
{ path: 'displayShops', component: DisplayDataComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'deliveryNotifi', component: DeliveryStatusNotificationComponent},
{path:'deliveryTimeUpd/:DeliveryId',component:UserDeliveryTimeUpdateComponent}  ,
{path:'web',component:WebSocketComponentComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

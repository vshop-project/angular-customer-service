import { Component,OnInit, HostListener } from '@angular/core';
import { AppService, SelectedLocation } from './service/http-client.service';
import { Router } from '@angular/router';
import { WebSocketService } from './web-socket.service';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  [x: string]: any;
  
  roleId:any;
  isButtonVisible:any;
  userNam:any;
  locBar:any;
  bussinessMenu:any;
  DeliveryUnitMenu:any;
  AdminMenu:any;
  notification="";
  Immediatenotifi="";
  Schedulednotifi="";
  DeliveryUnitNoti=""
  HomeNoti=true;
  enteredSearchVale:string="";
  enteredPrdVale:string="";
  RoleId:any;
  shopRegId:any;
  FleetId:any;

@HostListener('window:beforeunload')
  unloadHandler(event) {
    localStorage.setItem('isLoggedIn', "false"); 
    localStorage.setItem('username',"");
  }


  constructor(public httpClientService: AppService, private keycloakService: KeycloakService,
    public router: Router,private WebSocket:WebSocketService) {
  //    localStorage.setItem('newLocation', null); 
     }
     ngOnInit(): void {

      this.userNam = localStorage.getItem("username");
      this.RoleId = localStorage.getItem("Id");
  
      this.httpClientService.retrieveDeliveryStatus(this.userNam)
      .subscribe((data:any) => {
        this.shopRegId=data.shopRegId
        this.notification=data.notification
        this.Immediatenotifi=data.immediateNoti
        this.Schedulednotifi=data.scheduledNoti
        this.DeliveryUnitNoti=data.deliveryUnitNoti
        this.FleetId=data.fleetId;
           });
  
      if(this.RoleId==='2' && this.userNam!=''){
        this.isButtonVisible=true ; 
        this.bussinessMenu=false ; 
        this.HomeNoti=false;
      }
      else if(this.RoleId==='1' && this.userNam!=''){
        this.bussinessMenu=true ; 
        this.HomeNoti=false;
      }
      else if(this.RoleId==='3' && this.userNam!=''){
        this.bussinessMenu=false ; 
        this.HomeNoti=false;
        this.isButtonVisible=false ; 
        this.DeliveryUnitMenu=true;
      }
      else if(this.RoleId==='4' && this.userNam!=''){
        this.bussinessMenu=false ; 
        this.HomeNoti=false;
        this.isButtonVisible=false ; 
        this.DeliveryUnitMenu=false;
        this.AdminMenu=true;
      }
      else{
  
      }
     
     
    }
  // constructor(private app: AppService, private http: HttpClient, private router: Router) {
  //   this.app.authenticate(undefined, undefined);
  // }
  showHeaderLinks() {
    const currentRoute = this.router.url;
    // Add logic to determine which links to display based on the current route
    return currentRoute == '/home'; // Example condition: don't show links on the login page
    
  }
 logout() {
  localStorage.setItem('username',"");
  localStorage.setItem('isLoggedIn', "false"); 
  this.router.navigateByUrl('/login');

  }

      log(id:any) {
  
        this.LoggedIn =  localStorage.getItem("isLoggedIn");
      
        if (this.LoggedIn==="true") {
      
           this.saveid = localStorage.getItem("Id");
           if (this.saveid ==='1')
                 {this.router.navigate(['/Shops']);
                }
              else
               {
                    if (this.saveid===null || this.saveid==='[object Object]') 
                     {
                      localStorage.setItem('isLoggedIn', "true");
                     this.router.navigate(['']);
                     } 
                    else 
                    {
                    //this.router.navigate(['/showPromotion/'+saveid]);
                    this.router.navigate(['']);
                    } 
                } 
                if(this.saveid ==='3')
                {
                  this.router.navigate(['/priorityUpdate']);
                }
                else if(this.saveid ==='4')
                {
                  this.router.navigate(['/home']);
                }
      
      
        }
        else{
        this.router.navigate(['/login',id])
        }
      
        }



}





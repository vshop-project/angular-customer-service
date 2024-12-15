import { Component,OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { FilterlocationPipe } from '../filterlocation.pipe';

import { AppService, LoginText, ProductWiseSearch, SelectedLocation,  } from '../service/http-client.service';
import { AuthGuard } from '../auth.guard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';




@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
 
  invalidLogin = false
  employees:any ;
  allImages = []; 
  locationid ='PURAPUZHA';
  userNam:any;
  locBar:any;
  isButtonVisible:any;
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
locationValue: Array<any>=[];
separatedValues: string[];
  listLoc: Array<any>=[];
  listPrd: Array<any>=[];
  myControl = new UntypedFormControl('');
  myControl1 = new UntypedFormControl('');
  // locations = [ "Ang Mo Kio", "Bishan", "Punggol","Kuala lumpur","Raffles City","Marina Bay","ChangiAirport","Kattappana","London","Murickassery" ];
  
  selectedLoc: SelectedLocation = new SelectedLocation("");
  selectedPro: ProductWiseSearch = new ProductWiseSearch("","");
  credentials: LoginText = new LoginText("","","");
  removeDuplicatesArrayByName: Array<any>= [];
  saveid: any;
  LoggedIn: any;
  logginValue: any;
  filteredOptions: any;
  filteredOptions2: any;
  private socket: WebSocket | null = null;
  KafkaValue: any;
  TopicName;
  Type;
  Value;
keyclo;
 isLoggedIn = false;

private apiUrl = 'http://localhost:8089/api/endpoint';
  constructor(public httpClientService:AppService ,public router: Router,private keycloakService: KeycloakService,
    private AuthService:AuthGuard,private http: HttpClient
  ) {
       // localStorage.setItem('newLocation', null); 
       localStorage.setItem('newLocation', '{}'); 
       this.userNam = localStorage.getItem("username");
       this.RoleId = localStorage.getItem("Id");
       console.log(this.userNam," ",this.RoleId);
   
       this.httpClientService.retrieveDeliveryStatus(this.userNam)
       .subscribe((data:any) => {
         this.shopRegId=data.shopRegId
         this.notification=data.notification
         this.FleetId=data.fleetId;
         console.log(this.DeliveryUnitNoti," fleet id check",this.FleetId);
         console.log(this.TopicName," ",this.shopRegId);
   
            });
   
       this.connect();
      }
   
      connect() {
       this.socket = new WebSocket('ws://localhost:8080');
       this.socket.onmessage = (event) => {
        console.log('Message received:', event.data);
        this.KafkaValue=JSON.parse(event.data);
        this.TopicName=this.KafkaValue?.message?.TopicName || '';
        this.Type=this.KafkaValue?.message?.Type || '';
        this.Value=this.KafkaValue?.message?.Id || '';
        console.log('seperated kafka values  '+this.TopicName,' ',this.Type,' ',this.Value);
        console.log(this.TopicName,"abcderfcttr ",this.shopRegId);
        if(this.TopicName=="shopUnit" && this.shopRegId==this.Value){
    
               if(this.Type=='Immediate'){
    
                 this.Immediatenotifi='1';
               }else if(this.Type=='Scheduled'){
    
               this.Schedulednotifi='1';
               }
      }
      else if(this.TopicName=='DeliveryUnit' && this.FleetId==this.Value){
        this.DeliveryUnitNoti='1';
      }
    
    
      };

}
async login() {
  const abc = await this.keycloakAuthentication();
}


async loadUserProfile() {
  const userProfile = await this.keycloakService.loadUserProfile();
  console.log(userProfile);
  this.userNam= userProfile.email;
  localStorage.setItem('username',this.userNam);
  console.log('User ID:', this.userNam);
}

  async ngOnInit(): Promise<void> {  
    try{
    const userProfile =  this.keycloakService.loadUserProfile();
    if(userProfile){
    console.log(userProfile);
    this.userNam= (await userProfile).email;
    localStorage.setItem('username',this.userNam);
    console.log('User ID:', this.userNam);
    const token=this.AuthService.getToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Token:', token);
    }
  }
  catch (error) {}
  this.isLoggedIn = await this.keycloakService.isLoggedIn();
  if (this.isLoggedIn) {
    console.log(this.isLoggedIn);
    const status = this.getData();
    localStorage.setItem('isLoggedIn', "true"); 
  }

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
            
            if(this.userNam === "")
            {
              this.logginValue=false ; 
            }
            else
            {
              this.logginValue=true ;  
            }

    const newlocation = localStorage.getItem("newLocation");

     if (newlocation=='{}') 
     {
      const token = await this.AuthService.getToken();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
    console.log(headers);
    

      this.httpClientService.getEmployees(this.locationid).subscribe(
        response =>this.handleSuccessfulResponse(response),
       ); 
     } 
    else 
    {
      const token = await this.AuthService.getToken();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
      this.httpClientService.getEmployees(newlocation).subscribe(
        response =>this.handleSuccessfulResponse(response),
       ); 
       localStorage.setItem('newLocation', '{}'); 

    } 

     let LocValue = new FilterlocationPipe().transform([],'');

     this.httpClientService.getLoc(this.enteredSearchVale)
       .subscribe( (data: any) => {
         this.listLoc=[];
         for(var i=0;  i<data.length; i++){
          this.listLoc.push(data[i].location+', '+data[i].nearest_town+' '+data[i].district);
         }
       
            });

         this.filteredOptions = this.myControl.valueChanges.pipe(
           startWith(''),
            map(value => this._filter(value || '')),
        );

        this.httpClientService.getPrdName(this.enteredPrdVale)
          .subscribe( (data: any) => {
            this.removeDuplicatesArrayByName = this.removeDuplicates(data, "prodname")

            this.listPrd=[];
            for(var i=0;  i<this.removeDuplicatesArrayByName.length; i++){
             this.listPrd.push(this.removeDuplicatesArrayByName[i].prodname);
          
            }
          
               });
               this.filteredOptions2 = this.myControl1.valueChanges.pipe(
                startWith(''),
                 map(value => this._filter1(value || '')),
             );


  }
  async getData(): Promise<any> {
    try{
    await this.AuthService.refreshToken();
    const token = await this.AuthService.getToken();
    console.log('Token:', token);
    if(token==undefined){
      alert('Your Session has expired: Please login again');
      localStorage.setItem('username',"");
      localStorage.setItem('isLoggedIn', "false"); 
      this.RoleId=0;
      this.userNam = "";
      this.keycloakService.logout();
    }
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get(this.apiUrl, { headers }).toPromise();
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
  }


  async keycloakAuthentication(): Promise<boolean> {
  try
  {
    
    localStorage.setItem('Id', '2');
    this.keycloakService.login({
      // redirectUri: window.location.origin + '/displayShops',
    });
    return true
  } 
  catch(error){
          console.log(error);
          return false;
      }

  }

     private _filter(value: string): string[] {
       const filterValue = value.toLowerCase();

       return this.listLoc.filter(option => option.toLowerCase().includes(filterValue));
  

     
  }

  private _filter1(value: string): string[] {
    const filterValue2 = value.toLowerCase();

    return this.listPrd.filter(option => option.toLowerCase().includes(filterValue2));


  
}


removeDuplicates(myArray, Prop) {
  return myArray.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
  });
}


  async update(event: any){
    const token = await this.AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    const loc=event.value;

  //  this.selectedLoc.locationName = event.currentTarget.innerText;
    if(loc==null){

    //  this.selectedLoc.locationName = event.target.value
    const valuesArray = event.currentTarget.innerText.split(',');
    const LocName = valuesArray[0];
    this.selectedLoc.locationName = LocName;
    }
    else{
      const valuesArray = loc.split(',');
      const LocName = valuesArray[0];
      this.selectedLoc.locationName=LocName
    }
    this.separatedValues= this.selectedLoc.locationName.split(',');
    this.locationid = this.separatedValues[0];
   this.httpClientService.getEmployees(this.selectedLoc.locationName).subscribe(
    response =>this.handleSuccessfulResponse(response),
   ); 
      };


      product(event: any){
       this.selectedPro.locationName=this.locationid;
       //this.selectedPro.productName = event.currentTarget.innerText;
       this.selectedPro.productName = event.value
       if(this.selectedPro.productName==null){

        this.selectedPro.productName = event.currentTarget.innerText;
      }
       this.httpClientService.getProduct(this.selectedPro).subscribe(
        response =>this.handleSuccessfulResponse(response),
       );
          };
    
  
  DisplayShopPromo(): void
  {
    let LocValue = new FilterlocationPipe().transform([],'');
  }

handleSuccessfulResponse(response)
{
  console.debug(response);
    this.employees=response;
}
openDialog(){

   this.router.navigate(['/deliveryNotifi'])
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

  async logout(): Promise<void> {
      localStorage.setItem('username',"");
      localStorage.setItem('isLoggedIn', "false"); 
      this.RoleId=0;
      this.userNam = "";
      console.log('Logging out...');
      await this.keycloakService.logout('http://localhost:4200');
      console.log('Logout successful');


  }
  ProductView():void{
    this.router.navigate(['shopDetView/',this.shopRegId])
  }
  openScheduled(): void {
 
    this.router.navigate(['/scheduledPurchase',this.shopRegId])
  }
  openImmediate(): void {

    this.router.navigate(['/shopPurchase',this.shopRegId])
  }

  ScheduledPend(){

    this.router.navigate(['/scheduledPendingPurchase',this.shopRegId])
}   

openDelivery(): void {

    this.router.navigate(['notification', this.FleetId]); 
  }
  async DefaultLoc(event: any){
     this.enteredPrdVale = event.target.value

   if(this.enteredPrdVale==""){

    const token = await this.AuthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    const  locationName="THODUPUZHA";
     this.httpClientService.getEmployees(locationName).subscribe(
      response =>this.handleSuccessfulResponse(response),
     ); 
    }
  } 


}
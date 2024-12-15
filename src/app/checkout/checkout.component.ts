import { Component, OnInit } from '@angular/core';
import {  AppService, CartService, DeliveryAddressDetails, purchaseProdDetails } from '../service/http-client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { KafkaService } from '../kafka.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css',]
})
export class CheckoutComponent implements OnInit {
  // [x: string]: any;
  deliveryType: any = ['Immediate','Scheduled']
  itemsValue: any[];
  total_amount:Number;
  address1:string;
  email:any;
  fullname:any;
 deliveryValue:[];
 selectedTransportType: string = '';

 add;

 items: any[];

  unitsplit:any = ['1','.5','.25'];
  dft_unitsplit = '1';
  selectedUnitSplit = '';
  basicUnitPrice = 0;
selectShopId = '';
customerId:any;
 shopName = '';
 locationid = ''; 
  indexProduct = 0;
idd='';
  isButtonVisible: any;
  avaiStatus: any;
Status:string;
address:string;
temp_unit="";
t_amt:any;
userNam;
twn;
userDetails;
storedUsername;
ShopRegId;
  // address2:any;
  // purchaseProdDet: purchaseProdDetails = new purchaseProdDetails("","","",0,"","");
  delivDetails: DeliveryAddressDetails =new DeliveryAddressDetails("","","","","","","","","","");

  constructor(public httpClientService:AppService, private cartService: CartService, public router: Router,
    private kafkaService: KafkaService,private activatedrot:ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.t_amt = this.cartService.getTotalAmount();
    this.total_amount=this.t_amt.toFixed(2);
    this.userNam = localStorage.getItem("username");
    this.delivDetails.email=this.userNam;
    this.userDetails = this.getCookie(this.userNam );
     console.log('Cookie Value:', this.userDetails);
     if(this.userDetails==null) {}
     else {
          this.delivDetails.address=this.userDetails.Address;
          this.delivDetails.city=this.userDetails.Town;
          this.delivDetails.street=this.userDetails.street;
          this.delivDetails.zip=this.userDetails.pin;
     }
   
     this.ShopRegId=this.items[0].selectShopId;
  }

  transportTypeChangeHandler (event: any) {

    this.selectedTransportType = event.target.value;
  }

  purchaseProduct1(): void {
  this.delivDetails.deliveryType=this.selectedTransportType;
  //this.delivDetails.deliveryType=this.selectedTransportType;

    const LoggedIn =  localStorage.getItem("isLoggedIn");
    const user =  localStorage.getItem("username");
    // alert(" User logged :"+user + LoggedIn)
  
    // if (LoggedIn==="true") {

      let flag=false;
      if(this.delivDetails.fullname==""){
      alert("Please Enter Full Name")
     flag=true;
  
      }
      else if(this.delivDetails.email==""){
       alert("Please Enter Email")
   flag=true;
       
     }
     else if(this.delivDetails.deliveryType==""){
       alert("Please Select Delivery Unit Type")
   flag=true;
       
     }
     else if(!this.delivDetails.address){
       alert("Please Enter Address Line1")
   flag=true;
       
     }
     else if(this.delivDetails.city==""){
       alert("Please Enter City Name")
   flag=true;
       
     }
     else if(this.delivDetails.street==""){
       alert("Please Enter Street Name")
   flag=true;
       
     }
     else if(this.delivDetails.zip==""){
      alert("Please Enter Zip Name")
  flag=true;
      
    }
     else if(flag==false){

      this.add=this.delivDetails.address;
      this.twn=this.delivDetails.city;
      const userDetails = {
        userid:  this.userNam ,
        Address: this.add,
        Town: this.twn,
        street: this.delivDetails.street,
        pin: this.delivDetails.zip
      
      };
      
      this.setCookie(this.userNam , JSON.stringify(userDetails));
      // document.cookie = `address=${this.add}`;
  
      this.getSelecteditem()
      this.itemsValue = this.itemsValue.concat(this.delivDetails);
      this.httpClientService.purchaseProduct(this.itemsValue)
      .subscribe( data => {
        this.itemsValue = this.cartService.clearCart();
        this.total_amount=this.cartService.clearTotalAmount();
       alert("Purchase request submitted");
////////////////// kafka value saving 
       const message = {
        TopicName:"shopUnit" ,
        Id:this.ShopRegId,
        Type:this.delivDetails.deliveryType,
      };
     this.kafkaService.KafkaValueSave(message);
////////////////////////////////////////////////////////////////
        this.router.navigate(['']);
      });
    }

    // } else {
    
    //   localStorage.setItem("shoprgid",JSON.parse(this.activatedrot.snapshot.paramMap.get("id") || '{}'));

    //    this.router.navigate(['/login','2']);
       
    // }
   
  };

  cancelPromo():void {
    this.router.navigate(['']);
  }
  
  
  getSelecteditem(){
     this.itemsValue = this.cartService.getItems();

    // this.purchaseDet.custid = localStorage.getItem("username");
    // this.purchaseDet.shopregid = this.activatedrot.snapshot.paramMap.get("id");
  }

  logout() {
    localStorage.setItem('username',"");
    localStorage.setItem('isLoggedIn', "false"); 
    this.router.navigateByUrl('/login');
  
    }

    deleteCart(prodname,net_amount,unittype,unit,basicUnitPrice){
      this.temp_unit=unit;
      this.temp_unit
      this.cartService.deleteCart(prodname,net_amount,unittype,unit,this.selectedUnitSplit,basicUnitPrice,this.selectShopId,this.locationid,this.customerId,this.address,this.temp_unit);
      this.items = this.cartService.getItems();
      //this.total_amount = this.cartService.getTotalAmount();
      this.t_amt = this.cartService.getTotalAmount();
      this.total_amount=this.t_amt.toFixed(2);
     // alert("Product Removed from the Cart")
    }


    setCookie(cookieName: string, cookieValue: string) {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate()+365)
      document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}`;

    }

  getCookie(cookieName: string): any {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return JSON.parse(cookie.substring(name.length, cookie.length));
      }
    }
    return null;
  }

}

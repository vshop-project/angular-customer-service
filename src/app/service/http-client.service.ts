import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
//import { Kafkas } from 'kafkajs';

export class ProductAdding {
  constructor(
  public productName: string,
  public HsnCode:string,
  public Gst: string,
  ){}
}

export class DeliveryTime {
  constructor(
  public  date:string,
	public  time: string,
  public  purchId: string,

  ){}
} 

export class Kafka {
  constructor(
  public  id:string,
	public  notiStatus: string,
	public  stopNoti: string

  ){}
} 


export class productGet {
  constructor(
  public selectShopId: string,
  public shopName: string,

  ){}
} 
export class DeliveryAddressDetails {
  constructor(
  public fullname: string,
  public email: string,
  public address:string,
  public address2:string,
  public city: string,
  public street: string,
  public state: string,
  public zip: string,
  public cvv: string,
  public deliveryType: string
  // public  deliveryDetails:[]
  ){}
} 

export class RegisterDetails {
  constructor(
  public fullname: string,
  public email: string,
  public cntry:string,
  public mobile: string,
  public password: string,
  public role: string,
  public retypePassword: string
  ){}
} 

export class SelectedLocation {
  constructor(
  public locationName: string,

  ){}
} 

export class ProductWiseSearch {
  constructor(
  public locationName: string,
  public productName: string
  ){}
} 
export class Scheduled {
  constructor(
  public Fleet_id: string,
  public ShopId:string,
  public DeliveryId: string,
  public DeliveryDate: string,
  public DeliveryTime: string,
  ){}
} 




export class RoleDetail {
  constructor(
  public roleId: string,

  ){}
} 




export class promotionDetails {
  // [x: string]: string;
  constructor(
  public promoid:number,
  public description: string,
  public category: string,
  public fromdate: string,
  public todate: string,
  public duration: number,
  public durtype: string,
  public price: number,
  public offerprice: number,
  public shopregid: string
  ){}
} 
export class productDetails{
  [x: string]: any;
  status: string;
  constructor(
  public prodname:string,
  public unittype: string,
  public unit: Number,
  public price: Number,
  public discount_percentage: Number,
  public net_amount: Number,
  public shopregid: string,
  public category:string,
  public availabilitystatus:string
  ){}

}

export class shopRegIdRetri{
  [x: string]: any;
  // status: string;
  constructor(
  public shopId: string,
  public deliveryType: string,
  ){}

}


export class purchaseDetails{
  constructor(
    public promoid:string,
    public shopregid: string,
    public custid: string,
    public price:number,
    public effdate: string,
    public todate: string,


  ){}
}

export class purchaseProdDetails{
  constructor(

    public itemslist: []

  ){}
}


export class ShopComponents {
  
  // [x: string]: string;
  constructor(
  public status: string,
  public shopRegId: string,
  public shopName: string,
  public shopType: string,
  public shopLoc: string,
  public address: string,
  public district:string,
  public state:string,
  public country:string,
  public customerId:string
  ){}
} 

export class DeliveryComponents {
  
  constructor(
  public fleet_id: string,
  public location_name: string,
  public birthdate: string,
  public delivery_unit_name: string,
  public transport_type: string,
  // public Status:string,
  public contact_number:string,
  public owner_name:string,
  public country:string,
  public state:string,
  public district:string,
  public email:string,
  public location_idno:string,

  ){}
} 

export class DeliveryNotificationDetails {
  // userNam: any;
  
  constructor(
  public notifType: string,
  public notifDescription: string,
  public notifDestination: string,
  public destination_Desc: string,
  public destination_Id: string,
  public validFlag:string,
  public crtTs:string,
  public crtBy:string,
  public updTs:string,
  public updBy:string,

  ){}
} 

export class PriorityComponents {
  
  constructor(
  public fleetId: string,
  public availabilityStatus:string,
  public acceptanceStatus:string,
  public locationName:string,
  public deliveryName:string,

  ){}
} 

export class LoginText {
  constructor(
  public username: string,
  public password: string,
  public loginscenario: string,
  ){}
} 

export class LocationDetails {
  constructor(
  public country: string,
  public state: string,
  public district:string,
  public location: string,
  public nearest_town: string,
  public pincode: string,
  // public role: string,
  )
  {}
}
export class purchaseAllDetDTO {
  [x: string]: any;
  constructor(
    public total: String,
  public purchase_id: string,
  public customer_id: string,
  public location_id: string,
  public delivery_status:String,
	public fleet_id:String,
	public delivery_address:String,
  public  delivery_charge:String,
  public  net_payable_amt:String,
  // public  purchaseDetailsList:Object

  ){}
} 
export class purchaseDetailsDTO {
  [x: string]: any;
  constructor(
 
  public  purchaseDetailsList=new purchaseDetailsList(),
  public trn_dte: string,
  public product_id: string,
  public productName: string,
  public unit: string,
  public unitType: string,
  public unitPrice: string,
  public totalUnitPrice: string,
  public totalAmt: string,
  public discount_amt: string,
  public gst_amount: string,
  public shop_reg_id: string,
	public  crt_ts:string,
	public  crt_by:String,
	public  upd_ts:string,
	public  upd_by:String
  

  ){}
}

export class PurchaseStatusDetailsDTO {
  [x: string]: any;
  constructor(
    public total: String,
    public  fleet_id:String,
    public  delivery_address:String,
    public  purchase_id:String,
    public  delivery_id:String,
    public  location_id:String,
    public  shop_reg_id:String,
    public  street:String,
    public  city:String,
    public  pincode:String,
    public  delivery_charges:String,
    public  delivery_status:String

  ){}
} 
export class UpdateStatus {
  constructor(
  public Delivery_id: string,
  public Status: string,

  ){}
} 

export class User{
  constructor(
    public status:string,
     ) {}
     
}


@Injectable({
  providedIn: 'root'
})

export class AppService {
  [x: string]: any;

  authenticated = false;

   apiURL = 'http://localhost:8081';
  apiCustURL = 'http://localhost:8084';
  apiPurchURL = 'http://localhost:8083';
  apiAdminURL = 'http://localhost:8083';
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
/////want
  updDelTime(TimeUpd){
    let params=new HttpParams()
    .set("Dte",TimeUpd.date)
    .set("delId",TimeUpd.purchId)
    .set("time",TimeUpd.time)
    return this.http.get<ShopComponents>(this.apiCustURL + '/DeliveryTimeUpd',{params:params}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );

  };
/////want
  getdeliverydate(delId){
    let params = new HttpParams()
    .set("delId",delId) 
    return this.http.get<ShopComponents>(this.apiCustURL + '/getdeliveryDte_Time',{params:params}).pipe(
      map(
        userData =>{
          return userData;
        }
      )
    );
  };
/////
/////want
  getProduct(selectedPro){

    let params = new HttpParams()
           .set("locationName", selectedPro.locationName)
           .set("productName", selectedPro.productName)
           return this.http.get<ShopComponents>(this.apiCustURL + '/productList',{params:params}).pipe(
            map(
              userData => {
               
               return userData;
              }
            )
       
           );
        
         };

////want

getEmployees(locationid){

  let params = new HttpParams()
  .set("locationId", locationid)
  return this.http.get<ShopComponents>(this.apiCustURL+'/shopsList', {params:params}).pipe(
    map(
      userData => {
      if (userData==null){
        alert("No shops preasent in this location")
      }
       return userData;
      }
    )

   );
}
//////
////want
  retrieveDeliveryStatus(userName) {

    let params = new HttpParams()
                  .set("userName", userName)
  
    return this.http.get<DeliveryComponents>(this.apiAdminURL + '/PurchaseNotification',{params:params}).pipe(
       map(
         userData => {
          
          return userData;
         }
       )
  
      );
   
    };

/////want
    retrievePendingProductDet(userName) {

      let params = new HttpParams()
                    .set("userName", userName)
  
      return this.http.get<purchaseAllDetDTO>(this.apiCustURL + '/RetrievePurchaseDet',{params:params}).pipe(
         map(
           userData => {
            
            return userData;
           }
         )
    
        );
     
      };
//////
        /////want
 retrieveProductDet(productsDisplay) {

          let params = new HttpParams()
          .set("PurchId", productsDisplay)
           return this.http.get<purchaseDetailsDTO>(this.apiCustURL + '/RetrieveProductDet',{params:params}).pipe(
             map(
               userData => {
                
                return userData;
               }
             )
        
            );
         
          };
///      

//////want
    getLoc(employee) {

      let params = new HttpParams()
                    .set("location", employee)
      return this.http.get<User>(this.apiCustURL + '/getCacheLoc',{params:params}).pipe(
         map(
           userData => {
            
            return userData;
           }
         )
    
        );
     
      }; 

      //////want
      getPrdName(employee) {

        let params = new HttpParams()
                      .set("PrdName", employee)
        return this.http.get<User>(this.apiCustURL + '/getCachePrd',{params:params}).pipe(
           map(
             userData => {
              
              return userData;
             }
           )
      
          );
       
        }; 
    //////  
/////want
purchaseProduct(purchaseProdDet) {
  return this.http.post<purchaseProdDetails>(this.apiCustURL + '/purchaseproduct', JSON.stringify(purchaseProdDet), this.httpOptions)
 
} 
////

////want
    getProdDetails(id:string) {

      let params = new HttpParams()
                    .set("shopregid", id)
     
      return this.http.get<productDetails>(this.apiCustURL + '/readProd',{params:params}).pipe
      (
         map
         (
           userData => 
           {
            return userData;
           }
          )
    
      );
     
      };
/////

}


@Injectable()    
export class ImageService {    
    allImages = [] as  any;  
    
    getImages() {    
        return this.allImages = Imagesdelatils.slice(0);    
    }    
    
    getImage(id: number) {    
        return Imagesdelatils.slice(0).find(Images => Images.id == id)    
    }    
}    
const Imagesdelatils = [    
    { "id": 1, "category": "Veg","prodname": "Tomatto","unit": "1","unittype": "KG","Price": 10.50, "url": "assets/images/Tomatto.jpg" },    
    { "id": 2, "category": "Veg","prodname": "SmallLemon","unit": "5","unittype": "KG","Price": 20.60, "url": "assets/images/SmallLemon.jpg" },    
    { "id": 3, "category": "Veg","prodname": "Beens","unit": "1","unittype": "KG","Price": 30.60, "url": "assets/images/Beens.jpg" },    
    { "id": 4, "category": "Veg","prodname": "BigLemon","unit": "5","unittype": "KG","Price": 30.70, "url": "assets/images/BigLemon.jpg" },    
    { "id": 5, "category": "Veg","prodname": "WhiteGarlic","unit": "100","unittype": "Gram","Price": 70.55, "url": "assets/images/WhiteGarlic.jpg" },    
    { "id": 6, "category": "Veg","prodname": "Onion","unit": "1","unittype": "KG","Price": 60.60, "url": "assets/images/Onion.jpg" },    
    { "id": 7, "category": "Fruit","prodname": "GreenApple","unit": "1","unittype": "KG","Price": 100.00, "url": "assets/images/GreenApple.jpg" },    
    { "id": 8, "category": "Fruit","prodname": "Grapes","unit": "1","unittype": "KG","Price": 40.20, "url": "assets/images/Grapes.jpg" },    
    { "id": 9, "category": "Fruit","prodname": "Pineapple","unit": "1","unittype": "Piece","Price": 30.40, "url": "assets/images/Pineapple.jpg" },    
    { "id": 10, "category": "Fruit","prodname": "Tomatto","unit": "1","unittype": "KG","Price": 10.50, "url": "assets/images/Tomatto.jpg" },    
    { "id": 11, "category": "Fruit","prodname": "Gova","unit": "1","unittype": "KG","Price": 25.50, "url": "assets/images/Gova.jpg" },    
    { "id": 12, "category": "Nonveg","prodname": "GoldenEgg","unit": "10","unittype": "Piece","Price": 60.50, "url": "assets/images/GoldenEgg.jpg" },    
    { "id": 13, "category": "Nonveg","prodname": "WhiteEgg","unit": "1","unittype": "KG","Price": 83.60, "url": "assets/images/WhiteEgg.jpg" },    
    { "id": 14, "category": "Nonveg","prodname": "CoffeBean","unit": "1","unittype": "KG","Price": 300.10, "url": "assets/images/CoffeBean.jpg" },    
    { "id": 15, "category": "Fruit","prodname": "Banana","unit": "1","unittype": "KG","Price": 30.40, "url": "assets/images/Banana.jpg" },    
    { "id": 16, "category": "asus", "url": "assets/images/laptop15.jpg" },    
    { "id": 17, "category": "asus", "url": "assets/images/laptop16.jpg" },    
    { "id": 18, "category": "asus", "url": "assets/images/laptop17.jpg" },    
    { "id": 19, "category": "asus", "url": "assets/images/laptop18.jpg" },    
    { "id": 20, "category": "asus", "url": "assets/images/laptop20.jpg" },    
    
]    


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.items = [];
  }
  flag=true;
  itemformat = { ProductName: String, Unit: Number, UnitType:String, net_amount: Number,basicUnitPrice: Number,basicUnit:Number,selectShopId:Number,locationid:String,customerId:String,address:String };
  items = [this.itemformat] ;
  total_price = 0;
  indexProduct = 0;
  updated_unit = 0;
  existing_unit = 0;
  changedPrice = 0;
 
  len=0;
  item_exist = { ProductName: String, Unit: Number, UnitType:String, net_amount: Number,basicUnitPrice: Number,basicUnit:Number};
  
  
  addToCart(PrdName,Unit,UnitType,net_amount,basicUnitPrice,basicUnit,selectShopId,locationid,customerId,address) {
    
      this.items.push({ProductName:PrdName,Unit:Unit, UnitType:UnitType,net_amount:net_amount,basicUnitPrice:basicUnitPrice,basicUnit:basicUnit,selectShopId:selectShopId,locationid:locationid,customerId:customerId,address:address });
      this.total_price = this.total_price + net_amount;
  
  }

  minusUpdateCart(PrdName,net_amount,UnitType,Unit,selectedUnitSplit,basicUnitPrice,selectShopId,locationid,customerId,address,basic_unit){

   this.changedPrice = 0;
   basic_unit=0;
   this.indexProduct = this.items.findIndex(X => X.ProductName === PrdName);
   this.item_exist = this.items[this.indexProduct];
   this.existing_unit = Number(this.item_exist.Unit);
   basic_unit=Number(this.item_exist.basicUnit);
   if (UnitType==='Kilogram' || (UnitType==='Piece'&& selectedUnitSplit==='1'))
   {
    Unit = this.existing_unit -Number(selectedUnitSplit);
    net_amount = Unit * basicUnitPrice;
    net_amount=net_amount.toFixed(2);
    this.changedPrice = (this.existing_unit - Unit) * basicUnitPrice;
   }
   if (UnitType==='Gram')
   {
    Unit = this.existing_unit -(Number(selectedUnitSplit) * 100);
    net_amount = (Unit * basicUnitPrice)/100;
    net_amount=net_amount.toFixed(2);
    this.changedPrice = ((this.existing_unit - Unit) * basicUnitPrice)/100;
   }
   
   if (Unit < basic_unit )
   {
    this.items.splice(this.indexProduct,1);
     this.len=this.items.length
          if(this.len>0){
            if(UnitType==='Gram'){
              this.changedPrice=(basic_unit * basicUnitPrice)/100;
              this.total_price = this.total_price - this.changedPrice;
            }
            else{
       this.changedPrice=basicUnitPrice*basic_unit;
        this.total_price = this.total_price - this.changedPrice;
            }
          }
          else{
            
            this.total_price =0;
          }
   }
   else{
    this.total_price = this.total_price - this.changedPrice;
    this.items[this.indexProduct] = {ProductName:PrdName, Unit:Unit, UnitType:UnitType,net_amount:net_amount,basicUnitPrice:basicUnitPrice,basicUnit:basic_unit,selectShopId:selectShopId,locationid:locationid,customerId:customerId,address:address};
   }
   

  }

  addUpdateCart(PrdName,net_amount,UnitType,Unit,selectedUnitSplit,basicUnitPrice,basic_unit,selectShopId,locationid,customerId,address){
    this.changedPrice = 0;
    basic_unit=0;
    this.indexProduct = this.items.findIndex(X => X.ProductName === PrdName);
    this.item_exist = this.items[this.indexProduct];
    this.existing_unit = Number(this.item_exist.Unit);
    basic_unit=Number(this.item_exist.basicUnit);
    if (UnitType==='Kilogram' || (UnitType==='Piece' && selectedUnitSplit==='1'))
    {
      if(Unit>=2){
        basicUnitPrice=net_amount/Unit;
        basicUnitPrice=basicUnitPrice.toFixed(2);
        this.flag=false;
      }

     Unit = this.existing_unit +Number(selectedUnitSplit);
     net_amount = Unit * basicUnitPrice;
     net_amount=net_amount.toFixed(2);
     this.changedPrice = (Unit - this.existing_unit) * basicUnitPrice;
    }

    if (UnitType==='Gram')
    {
     Unit = this.existing_unit +(Number(selectedUnitSplit) * 100);
     //net_amount = (Unit * basicUnitPrice)/100;
      if(Unit>=200 && basicUnitPrice>=net_amount)
     {
     basicUnitPrice=(net_amount/this.existing_unit)*100;
    //basicUnitPrice=basicUnitPrice.toFixed(2);
     }
     net_amount = (Unit * basicUnitPrice)/100;
     net_amount=net_amount.toFixed(2);
  
     this.changedPrice = ((Unit - this.existing_unit) * basicUnitPrice)/100;
    }
    
    this.total_price = this.total_price + this.changedPrice;
    this.items[this.indexProduct] = {ProductName:PrdName, Unit:Unit, UnitType:UnitType,net_amount:net_amount,basicUnitPrice:basicUnitPrice,basicUnit:basic_unit,selectShopId:selectShopId,locationid:locationid,customerId:customerId,address};

  }

  deleteCart(PrdName,net_amount,UnitType,Unit,selectedUnitSplit,basicUnitPrice,selectShopId,locationid,customerId,address,basic_unit,){
    this.changedPrice = net_amount;
    Unit=0;
    basic_unit=0;
    this.indexProduct = this.items.findIndex(X => X.ProductName === PrdName);
    this.item_exist = this.items[this.indexProduct];
    this.existing_unit = Number(this.item_exist.Unit);
    basic_unit=Number(this.item_exist.basicUnit);
    if (Unit < basic_unit )
    {
     this.items.splice(this.indexProduct,1);
      this.len=this.items.length
           if(this.len>0){
     this.total_price = this.total_price - this.changedPrice;
           }
           else{
             
             this.total_price =0;
           }
    }
    else{
     this.total_price = this.total_price - this.changedPrice;
     this.items[this.indexProduct] = {ProductName:PrdName, Unit:Unit, UnitType:UnitType,net_amount:net_amount,basicUnitPrice:basicUnitPrice,basicUnit:basic_unit,selectShopId:selectShopId,locationid:locationid,customerId:customerId,address:address};
    }
    
  }
  getItems() {
    return this.items;
  }
  getTotalAmount() {
    return this.total_price;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  clearTotalAmount() {
    this.total_price = 0;
    return this.total_price;
  }

}


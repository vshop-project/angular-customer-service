import { Component, OnInit } from '@angular/core';
import { ImageService, CartService, AppService, productDetails, productGet } from '../service/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { PopupWindowComponent } from '../popup-window/popup-window.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-itemsgallery',
  templateUrl: './itemsgallery.component.html',
  styleUrls: ['./itemsgallery.component.css']
})
export class ItemsgalleryComponent implements OnInit {

  images:any[];    
  filterBy?: any = 'all' ;   
  allImages:any[] = [];  
  total_price:Number;  
  prodDet:productDetails =  new productDetails("","",0,0,0,0,"","","");
  // prod:productDisplay=new productDisplay("") changed the export class productDisplay to Scheduled also removed import in module.ts along with Imageservice(30)
  // prodDet:productDetails[];
all:boolean = true;
vegitable:boolean = false;
Fruits:boolean = false;
Nonveg:boolean = false;
Others:boolean = false;


 prodGet:productGet =new productGet("","");

  items: any[];
  Tempitems: any[];
  total_amount:Number;
  unitsplit:any = ['1','.5','.25'];
  dft_unitsplit = '1';
  selectedUnitSplit = '';
  basicUnitPrice = 0;
selectShopId = '';
tempShopId = '';
customerId:any;
 shopName = '';
 locationid = ''; 
  indexProduct = -1;
idd='';
isButtonVisible: any;
  avaiStatus: any;
Status:string;
address:string;
basic_unit="";
prdName="";
  index: number;
  t_amt:any;
 // vall:any[];
  itemformat = { ProductName: String};
  vall =[this.itemformat];
  purchaseList: any[];
  constructor( private imageService: ImageService,private cartService: CartService,private activatedrot:ActivatedRoute,public httpClientService:AppService,
    public dialog: MatDialog) {  
   // this.allImages = this.imageService.getImages();   
   this.vall = [];

   
  }    
  // ngOnInit(): void {
  //   this.allImages = this.imageService.getImages(); 
  // }

  ngOnInit(): void {
    
    this.isButtonVisible=false
    this.selectedUnitSplit = this.dft_unitsplit;
    //this.items = this.cartService.getItems();
     this.Tempitems = this.cartService.getItems();
    this.total_amount = this.cartService.getTotalAmount();
    this.customerId = localStorage.getItem("username");
   this.selectShopId =(JSON.parse(JSON.stringify(this.activatedrot.snapshot.paramMap.get("id")) || '{}'))
  this.shopName =(JSON.parse(JSON.stringify(this.activatedrot.snapshot.paramMap.get("name")) || '{}'))
   this.locationid = (JSON.parse(JSON.stringify(this.activatedrot.snapshot.paramMap.get("locationid")) || '{}')) 
   
 const valll=this.Tempitems.find(x=>x.selectShopId == this.selectShopId);
   
   if(valll!=null){
    this.isButtonVisible=true;
    this.items = this.cartService.getItems();
    this. t_amt = this.cartService.getTotalAmount();
    this.total_amount=this.t_amt.toFixed(2);
   }
    // this.shopName = name;
  // this.prodGet.shopName =(JSON.parse(this.activatedrot.snapshot.paramMap. et("name") || '{}'));
    this.httpClientService.getProdDetails(this.selectShopId).subscribe(
      response =>this.handleSuccessfulResponse(response),
     );
    }

    handleSuccessfulResponse(response)
    {
      console.debug(response);
        this.prodDet=response;

    }
    
    activate(filter:string){ 
      // if(filter!='all'){
      //   this.all=false;
      // }
      this.all= filter ==='all';
      this.vegitable= filter ==='vegitable';
      this.Fruits= filter ==='Fruits';
      this.Nonveg= filter ==='Nonveg';
      this.Others= filter ==='Others';

    }
  // ngOnChanges() {    
  //   this.allImages = this.imageService.getImages();    
  // }    

  addToCart(prodname,unit,unittype,net_amount,shopregid) {

    this.items = this.cartService.getItems();
    let abc=this.items.find(X => X.selectShopId == shopregid)
    if(this.items.length==0 ||abc!=null){
  

   // this.selectShopId
    this.basic_unit=unit;
    this.isButtonVisible=true;
    // if(this.basicUnitPrice==0)
    // {
     this.basicUnitPrice = net_amount;
    // }
    this.indexProduct = this.items.findIndex(X => X.ProductName === prodname);
    if (this.indexProduct >= 0)
    {
      this.cartService.addUpdateCart(prodname,net_amount,unittype,unit,'1',net_amount,this.basic_unit,this.selectShopId,this.locationid,this.customerId,this.address);
    }
    else{
      this.cartService.addToCart(prodname,unit,unittype,net_amount,this.basicUnitPrice,this.basic_unit,this.selectShopId,this.locationid,this.customerId,this.address);
    }
    
    this.items = this.cartService.getItems();
    //this.total_amount = this.cartService.getTotalAmount();
    this. t_amt = this.cartService.getTotalAmount();
    this.total_amount=this.t_amt.toFixed(2);
    if(this.items.includes("ProductName")==prodname){
     // this.index=1;
    }
let ab=this.items.find(X => X.ProductName == prodname)
this.vall.push(ab.ProductName);
this.index=this.vall.length
this.purchaseList=this.vall;
//var x=this.purchaseList.find(temp=>temp==prodname)
for(let i=0;i<=this.index;i++){
  //this.prod.productName=this.vall.indexOf("0")
 // this.prod.productName=this.purchaseList.values;

}
console.log(ab)
   //this.index=1;
 
  }
  else{
    alert("If you need to add products from this shop then you need to clear the cart");
   
      const dialogRef = this.dialog.open(PopupWindowComponent, {
        width: '320px',
        height:'180px',
    
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    
      });
    
  }
    // window.alert('Your product has been added to the cart!');
  }

  minusUpdateCart(prodname,price,unittype,unit,basicUnitPrice){
    this.basic_unit
    if(this.basic_unit==unit){
      let ab=this.items.find(X => X.ProductName == prodname)
      this.vall.splice(ab.ProductName);
    }
    this.cartService.minusUpdateCart(prodname,price,unittype,unit,this.selectedUnitSplit,basicUnitPrice,this.selectShopId,this.locationid,this.customerId,this.address,this.basic_unit);
    this.t_amt = this.cartService.getTotalAmount();
    this.total_amount=this.t_amt.toFixed(2);
   // alert("aaa")
  }
  addUpdateCart(prodname,price,unittype,unit,basicUnitPrice){
    // if(basicUnitPrice==null)
    // {
    // basicUnitPrice = price;
    // }
    this.cartService.addUpdateCart(prodname,price,unittype,unit,this.selectedUnitSplit,basicUnitPrice,this.basic_unit,this.selectShopId,this.locationid,this.customerId,this.address);
    this.t_amt = this.cartService.getTotalAmount();
    this.total_amount=this.t_amt.toFixed(2);
  }

  categoryChangeHandler (event: any) {
    //update the ui
    this.selectedUnitSplit = event.target.value;
    this.dft_unitsplit = event.target.value;
  }
  
  clear (event: any) {
    //update the ui
    this.total_amount=0;
  }



}

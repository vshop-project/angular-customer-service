import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AppService, purchaseAllDetDTO, purchaseDetailsDTO } from '../service/http-client.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';




@Component({
  selector: 'app-delivery-status-notification',
  templateUrl: './delivery-status-notification.component.html',
  styleUrls: ['./delivery-status-notification.component.css']
})
export class DeliveryStatusNotificationComponent implements OnInit {

   PurchaseProductDet: purchaseAllDetDTO = new purchaseAllDetDTO("","","","","","","","","");
  PurchaseProduct:any;
  PurchaseTrnProduct:any;
  purchaseList: any[];
  productLists: any[];
  CustomerId:any;
  userNam:any;
   isButtonVisible: any;
   bussinessMenu=false;
   purchView=true;

  displayedColumns: string[] = [ 'ProductName','Purchase Id','unit', 'symbol','quantity','Total'];
 

 displayColumn: string[] = ['Total','GST' ,'Discount' ,'Delivery' , 'NetPlayable'];

 PurchaseTrnDisplay: string[] = ['Fleet Id','Purchase Id','Total','Address Line 1','Address Line 2','Pin Code','Delivery Status'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  ngAfterViewInit() {
  
    
  }
 
  constructor(
    public httpClientService:AppService ,public router: Router, private AuthService:AuthGuard
  ) {

   }
 
  
  
   ngOnInit(){

    this.userNam = localStorage.getItem("username");
    this.httpClientService.retrievePendingProductDet(this.userNam)
    .subscribe(
      response =>this.handleSuccessfulResponse(response),
     );

  }
    handleSuccessfulResponse(response)
    {
      console.debug(response);
       this.purchaseList=response;
    }

  TableHide(): void{
    this.isButtonVisible=true ;  
  }

  productDisplay(purchId:any): void{

      this.bussinessMenu=true
      this.purchView=false
      this.httpClientService.retrieveProductDet(purchId)
      .subscribe(
        response =>this.handleSuccessfulResponse1(response),
        );
  }
  handleSuccessfulResponse1(response): void {

      console.log(response)
      this.productLists=response
  }
  close():void{
    this.bussinessMenu=false
    this.purchView=true
  }
 
}


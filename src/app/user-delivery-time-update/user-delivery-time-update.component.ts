import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, DeliveryTime } from '../service/http-client.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delivery-time-update',
  templateUrl: './user-delivery-time-update.component.html',
  styleUrls: ['./user-delivery-time-update.component.css']
})
export class UserDeliveryTimeUpdateComponent{
  userNam: any;
  time:any;
  Deldte: any;
  TempTime: any;
  ddd:any;
  aa:any;
  bb:any;
  deltme:string;
  tempTime:any;
  delId:any
  formattedDate: string;
  originalDate: Date;
  
  TimeSetting: DeliveryTime= new DeliveryTime("","","");
  innerWidth: number;

  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes: string[] = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
  periods: string[] = ['AM', 'PM'];

  hour: number;
  minute: string;
  period: string;




  time3: string = '01:40:20 ';
  time4: string = '12:40:20 ';
  constructor(public httpclientService: AppService,public router: Router, private datePipe: DatePipe,
    private activatedrot:ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.delId= (JSON.parse(JSON.stringify(this.activatedrot.snapshot.paramMap.get("DeliveryId")) || '{}')) 
    this.userNam = localStorage.getItem("username");
    // if(this.userNam==""){
    //   this.router.navigate(['login/',5])
    //   console.log(this.userNam)
    // }
    // else{

          this.httpclientService.getdeliverydate(this.delId).subscribe(
          response=>this.handleSuccessfulResponse(response)
          );
    // }
   
  }
  handleSuccessfulResponse(response: any) {
    if(response==null){
      alert("Time Expired")
      this.router.navigate([''])
    }
    else{
      console.log(response);
      this.deltme=response.delivery_time
      this.Deldte=response.delivery_date
    //  this.delId=response.delivery_id
    }
  }
  Cancel(): void {
    this.router.navigate([''])
  }

  Updatetime(): void {
    const Time=this.time;
    console.log(`Selected Time:`,this.hour);
    console.log(`Hour: `,this.minute);
    console.log(`Minute: `,this.period);
     const formattedTime = this.hour+':'+this.minute+':'+this.period;
  console.log(formattedTime);

     this.TimeSetting.time=formattedTime;
      this.originalDate = new Date(this.TimeSetting.date);
      const datePipe = new DatePipe('en-US');
    const currentDate= datePipe.transform(this.originalDate, 'medium');
    const vvvv= datePipe.transform(this.originalDate, 'medium');
    this.aa=this.datePipe.transform(vvvv,'dd-MM-yyyy');

    const time_cur=this.aa+' '+this.TimeSetting.time
    const Prev_time=this.Deldte+' '+this.deltme
    if (Prev_time > time_cur) {
      alert('Selected Time or Date is lesser than the current Date & Time');
    } 
    else if (Prev_time < time_cur) 
    {

          this.TimeSetting.purchId=this.delId
          this.TimeSetting.date=this.aa
          this.httpclientService.updDelTime(this.TimeSetting).subscribe(
          response=>this.handleSuccessfulResponse2(response),
         );
    }
    else
    {
          this.TimeSetting.purchId=this.delId
          this.TimeSetting.date=this.aa
          this.httpclientService.updDelTime(this.TimeSetting).subscribe(
          response=>this.handleSuccessfulResponse2(response),
          );
    } 
     }
  handleSuccessfulResponse2(response: any) {
  if(response==true){
    this.router.navigate([''])
  }
  else{
    alert("ERROR: Delivery time is not update, Please try again");
  }
  }

}

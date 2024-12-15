import { Component, Injectable, OnInit } from '@angular/core';
import { AppService, Kafka } from '../service/http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data, Router } from '@angular/router';

import { KafkaService } from '../kafka.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Time } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExtendedKeycloakService } from '../extended-keycloak.service';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { AuthGuard } from '../auth.guard';






@Component({
  //selector: 'app-home-create',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// @Injectable()
export class HomeComponent {


  role = [
    {id:1,name:'Employee'},
    {id:2,name:'Manager'},
    {id:3,name:'Ceo'},
    {id:4,name:'Director'},

   ]
  em:any;
  pass:any;
  roleId;
  dte;

  // @ViewChild('formDirective') private formDirective: NgForm;
  signupForm: UntypedFormGroup = new UntypedFormGroup({});
  // signupForm:FormGroup


  

  name = 'Angular';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  times:any;
  time:Time;
  tempss:Time;
  
  messages: string[] = ['aaaa','bbb'];

  title = 'Demo';
  searchText;
  
  greeting = {'id': 'XXX', 'content': 'Hello World'};
value="";
leng:Number;
enteredSearchVale:string="";
  temp="";
  listLoc: Array<Data>=[];
  myList: Array<any>=[];
  urls:any;
  buttonss:any;
  kafkaMessages: any[];
  selectedTime: string;

  constructor(private app: AppService, private http: HttpClient,   public httpclientService:AppService ,public router: Router,public AuthService:AuthGuard
    , private kafkaService: KafkaService,private dialog: MatDialog, private fb: UntypedFormBuilder,private keycloak: ExtendedKeycloakService,private keycloakService: KeycloakService) {
 // The URL of your pop-up component

    }
    ngOnInit() {
      this.keycloakService.keycloakEvents$.subscribe({
        next: event => {
          if (event.type === KeycloakEventType.OnAuthSuccess) {  // Correctly use KeycloakEventType
            this.router.navigate(['/displayShops']);
          }
        }
      });
    }
    async login() {
      const token = await this.AuthService.getToken();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
    console.log(headers);


      this.httpclientService.keycloaktokenCheck(headers)
      .subscribe((data:any) =>  {});
    }
    register() {
      try {
        const registrationUrl = this.keycloak.createRegisterUrl();
        window.location.href = registrationUrl;
      } catch (error) {
        console.error('Error accessing Keycloak instance:', error);
        // Handle error as needed
      }
    }

session(): void {
  this.setSession('user',{id:1,name:'jhon'});
}
  setSession(key:string,value:any):any {
    sessionStorage.setItem(key,JSON.stringify(value));
  } 

  getSession(key:string):any {
    const data = sessionStorage.getItem(key);
    console.log(data);
  }

  kafkaSaving: Kafka = new Kafka("","","");
  authenticated() { return this.app.authenticated; }


  StopScheduler(): void{
 
     this.httpclientService.Scheduler(this.value)
     .subscribe( (data: any) => {
       this.router.navigate([''])
          });
  }
  StartScheduler(): void{
 
    this.httpclientService.SchedulerStart(this.value)
    .subscribe( (data: any) => {
      this.router.navigate([''])
         });
 }


onChangeHour(event) {
  console.log('event', event);
}


onSearch(){

  console.log(this.enteredSearchVale);
  this.httpclientService.getLoc(this.enteredSearchVale)
    .subscribe( (data: any) => {
      this.router.navigate([''])
         });
        }
product(event: any){

  this.enteredSearchVale = event.target.value
  this.httpclientService.getLoc(this.enteredSearchVale)
    .subscribe( (data: any) => {
      this.listLoc=[];
      for(var i=0;  i<data.length; i++){
    //   console.log(data[i].location);
       this.listLoc.push(data[i].location);
    
      }

         });


} 

LocationMaint(): void {

   this.httpclientService.getcache(this.temp)
   .subscribe( (data: any) => {
    this.temp=data.nativeCache;
    this.router.navigate(['/home'])
        });
      
     
     };


     click(event:any) {
      this.temp = event;
      this.httpclientService.getcache(this.temp)
      .subscribe( (data: any) => {
       this.temp=data.nativeCache;
       this.router.navigate(['/home'])
           });
         
        
        };


        sendMessageToKafka(value: string): void {
          const url = 'http://localhost:3001/api/kafka/send-message'; // Replace with the actual URL of your backend API
          //const message='abcdef';
          const message = {
            userid: 'abcdef',
            Address: 'testing kafka'
          
          };
        //  const message = this.messages;
          console.log(message);

          this.http.post('http://localhost:3001/api/kafka/send-message', {message}).subscribe(
        //  this.http.post('http://localhost:3001/sendArrayToKafka', body).subscribe(  
            (response) => {
              console.log('Message sent to Kafka:', response);
            },
            (error) => {
              console.error('Error sending message to Kafka:', error);
            }
          );
        }
        // MessageToKafka(){
          
        //   this.kafkaService.KafkaMessages().subscribe(
        //     (messages) => {
        //       this.kafkaMessages = messages;
        //     },
        //     (error) => {
        //       console.error('Error retrieving Kafka messages:', error);
        //     }
        //   );
        // }   
        TestToKafka()
        {
          this.kafkaService.KafkaTestMessages().subscribe(
            (messages) => {
              this.kafkaMessages = messages;
            },
            (error) => {
              console.error('Error retrieving Kafka messages:', error);
            }
          );
        }


        onTimeSelect(time: string): void {
          // Handle the selected time
          console.log(time);
        }
        // Kafka(){
          
        //   this.kafkaService.KafkaSingleMessages().subscribe(
        //     (messages) => {
        //       this.kafkaMessages = messages;
        //     },
        //     (error) => {
        //       console.error('Error retrieving Kafka messages:', error);
        //     }
        //   );
        // }   

        generateTopic() {
          const topicName = 'b1'; // Replace with the desired topic name
          this.kafkaService.createTopic(topicName).subscribe(
            response => console.log(response),
            error => console.error(error)
          );
        }

        hide = true;  
        submitted = false;
        signUpSubmitted = false;
        loginForm = this.fb.group({
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.maxLength(8)]],
       
        })
       
       
        
        
         get signUpControl() {
           
          return  this.signupForm.controls
         }
        
       
        confirmPasswordChecker(group: UntypedFormGroup) {
          // console.log('signUpform',group.get('confirmPassword'))
          let valid = true;
         
            
            
          }
       
        
         get formControl() {
          return  this.loginForm.controls
         }
        
        
        onSubmit(loginForm) {
         console.log(this.em);
         console.log(this.pass);
          this.submitted=true
          console.log({loginForm})
          console.log('dsada',this.formControl)
        }
       
        signUpSubmit(signupForm) {
         console.log(this.dte);
          this.signUpSubmitted=true
        }
       
        tabClicked() {
          console.log('hi',this.roleId)
          // this.resetForm()
          // this.formDirective.resetForm();
        }
       //   resetForm() {
       //  }
        
       locations: { name: string, district: string }[] = [
        { name: 'Location A', district: 'District 1' },
        { name: 'Location B', district: 'District 2' },
        { name: 'Location C', district: 'District 1' },
        { name: 'Location D', district: 'District 3' },
        { name: 'Location E', district: 'District 2' },
        // Add more locations as needed
      ];
    
      selectLocation(locationName: string): void {
        const selectedLocation = this.locations.find(location => location.name === locationName);
        if (selectedLocation) {
          console.log('Selected Location:', selectedLocation.name);
          console.log('District:', selectedLocation.district);
          // Here you can perform any action with the selected location and district
        }
      }   







 }

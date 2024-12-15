import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../service/http-client.service';

@Component({
  selector: 'app-itemsdetail',
  templateUrl: './itemsdetail.component.html',
  styleUrls: ['./itemsdetail.component.css']
})
export class ItemsdetailComponent implements OnInit {

  image:any    
    
  constructor(private imageService: ImageService,    
    private route: ActivatedRoute) { }    
    
  ngOnInit(){    
    this.image = this.imageService.getImage(    
      this.route.snapshot.params['id']    
    )    
  }    

}

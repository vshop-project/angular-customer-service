import { Pipe, PipeTransform } from '@angular/core';
import { productDetails } from './service/http-client.service';

@Pipe({
  name: 'filterimages'
})
export class FilterimagesPipe implements PipeTransform {

  transform(items, groceryType: string): any {    
    if(groceryType === 'all'){ return items } else    
    return items.filter(item =>{    
      return item.category === groceryType;    
    });    
  }    
}

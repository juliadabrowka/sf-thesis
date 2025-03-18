import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sfFormatPrice'
})
export class SfFormatPricePipe implements PipeTransform {

  transform(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}

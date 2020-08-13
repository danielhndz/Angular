import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {

  transform(products: Product[]): number {
    console.log('exponential.pipe');
    console.log(products.length);
    return Math.pow(products.length, 2) + 1;
  }

}

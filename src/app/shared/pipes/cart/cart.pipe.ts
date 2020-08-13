import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductOrder } from 'src/app/models/product-order/product-order.module';

@Pipe({
    name: 'cart'
})
export class CartPipe implements PipeTransform {
    private productsOrder: ProductOrder[] = [];

    /**
     * Transform an array of Product (cart) into an array of ProductOrder.
     * Returned array does not have repeated Product objects, instead it,
     * stores each Product object in the "product" parameter, and the times
     * it appears in the cart in the "units" parameter, of ProductOrder.
     * @param cart Array with all products
     */
    transform(cart: Product[]): ProductOrder[] {
        console.log('cart.pipe - transform');
        const productSet = new Set(cart);
        cart.forEach((cartProduct: Product) => {
            if (productSet.has(cartProduct)) {
                this.productsOrder.push({
                    product: cartProduct,
                    units: 1
                });
                productSet.delete(cartProduct);
            } else {
                this.productsOrder.find((productOrder: ProductOrder) => {
                    if (productOrder.product === cartProduct) {
                        productOrder.units++;
                    }
                });
            }
        });
        return this.productsOrder;
    }

}

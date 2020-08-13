import { Product } from '../product/product.model';

export interface ProductOrder {
    product: Product;
    units: number;
}

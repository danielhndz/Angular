import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart: BehaviorSubject<Product[]>;

  cart$: Observable<Product[]>;

  constructor() {
    console.log('cart.service - constructor');
    this.cart = new BehaviorSubject<Product[]>([]);
    this.cart$ = this.cart.asObservable();
  }

  addCart(product: Product): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}

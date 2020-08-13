import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product/product.model';
import { ProductsService } from 'src/app/core/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  showProducts: boolean;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.showProducts = false;
    this.fetchProducts();
  }

  clickProduct(id: number): void {
    console.log('products.component - clickProduct');
    console.log('id = ' + id);
  }

  private fetchProducts(): void {
    this.productsService.getAllProducts()
    .subscribe(
      products => {
        this.products = products;
        this.showProducts = true;
      }
    );
  }

}

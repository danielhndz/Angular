import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../core/products/products.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  showProducts: boolean;
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'button'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.showProducts = false;
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getAllProducts()
    .subscribe(
      products => {
        this.products = products;
        this.showProducts = true;
      }
    );
  }

  /**
   * Click on delete.
   * Response of server is true or false.
   */
  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id)
    .subscribe(
      deleteProductOk => {
        if (deleteProductOk) {
          this.deleteProductOfView(id);
          window.confirm('Eliminado');
        } else {
          window.alert('Error - No se ha eliminado');
        }
      }
    );
  }

  /**
   * Delete a product of view.
   * @param id Id of deleted product
   */
  deleteProductOfView(id: string): void {
    const index = this.products.findIndex(
      product => product.id === id
    );
    this.products.splice(index, 1);
    this.products = [...this.products];
  }

}

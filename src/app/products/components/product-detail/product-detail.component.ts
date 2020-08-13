import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../core/products/products.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  showProduct: boolean;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    console.log('product-detail.component - ngOnInit');
    this.showProduct = false;
    this.route.params.subscribe(
      (params: Params) => {
        console.log('product-detail.component - ngOnInit - subscribe');
        const id = params.id;
        console.log('id = ' + id);
        this.fetchProduct(id);
      }
    );
  }

  /**
   * que hace esta mierda
   * @param id parametro obvio
   */
  private fetchProduct(id: string): void {
    console.log('product-detail.component - fetchProduct');
    this.productsService.getProduct(id)
    .subscribe((product: Product) => {
      console.log('product-detail.component - fetchProduct - subscribe');
      console.log('product:');
      console.log(product);
      this.product = product;
      this.showProduct = true;
    }
    );
  }

  createProduct(): void {
    console.log('product-detail.component - createProduct');
    const newProduct: Product = {
      id: '98',
      title: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 1584321.25,
      description: 'buena mis papachos'
    };
    this.productsService.createProduct(newProduct)
      .subscribe(
        productCreated => {
          console.log(productCreated);
        }
      );
  }

  updateProduct(): void {
    console.log('product-detail.component - updateProduct');
    const updatedProduct: Partial<Product> = {
      title: 'update',
      description: 'update'
    };
    this.productsService.updateProduct('12', updatedProduct)
      .subscribe(
        productCreated => {
          console.log(productCreated);
        }
      );
  }

  deleteProduct(): void {
    console.log('product-detail.component - deleteProduct');
    this.productsService.deleteProduct(this.product.id)
      .subscribe(
        response => {
          console.log('product-detail.component - deleteProduct - subscribe');
          console.log(response);
        }
      );
  }
}

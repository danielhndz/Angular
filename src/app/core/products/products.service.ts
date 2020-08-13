import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.urlTestAPI}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.urlTestAPI}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.urlTestAPI}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>): Observable<object> {
    return this.http.put(`${environment.urlTestAPI}/products/${id}`, changes);
  }

  deleteProduct(id: string): Observable<object> {
    return this.http.delete(`${environment.urlTestAPI}/products/${id}`);
  }
}

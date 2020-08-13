import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../core/products/products.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  products: Product[];
  showProducts: boolean;
  displayedColumns: string[] = ['image', 'id', 'title', 'price', 'description'];

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

}


// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTable } from '@angular/material/table';
// import { TableDataSource, TableItem } from './table-datasource';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.scss']
// })
// export class TableComponent implements AfterViewInit, OnInit {
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatTable) table: MatTable<TableItem>;
//   dataSource: TableDataSource;

//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = ['id', 'name'];

//   ngOnInit() {
//     this.dataSource = new TableDataSource();
//   }

//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.table.dataSource = this.dataSource;
//   }
// }

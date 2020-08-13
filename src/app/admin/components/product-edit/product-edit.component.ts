import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/products/products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  editForm: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.editForm.patchValue(product);
      });
    });
  }

  sendUpdate(event: Event): void {
    event.preventDefault();
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      const product = this.editForm.value;
      this.productsService.updateProduct(this.id, product).subscribe(
        (newProduct) => {
          console.log(newProduct);
          this.router.navigate(['./admin/products']);
        }
      );
    }
  }

  private buildForm(): void {
    this.editForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [, [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line: typedef
  get priceField() {
    return this.editForm.get('price');
  }

}

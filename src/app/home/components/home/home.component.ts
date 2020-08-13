import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ProductsService } from '../../../core/products/products.service';
import { Router } from '@angular/router';
import { MyValidators } from '../../../utils/validators/validators';

import { AuthService } from '../../../core/auth/auth.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * FormControl, al escuchar cambios en el input,
   * emite un Observable al que me puedo suscribir.
   * this.emailField.valueChanges
   * .subscribe(
   *  (newValue) => {
   *    console.log(newValue);
   *  }
   * );
   */
  emalField: FormControl;
  createProductFrom: FormGroup;
  signinForm: FormGroup;
  signupForm: FormGroup;
  hide = true;
  show = false;
  /**
   * Es una buena pŕactica nombrar las variables de tipo
   * Observable con un "$" al final.
   */
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService,
    private aFStorage: AngularFireStorage
  ) {
    this.emalField = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) // => valida email
    ]);
    this.buildForm();
    this.buildSigninForm();
    this.buildSignupForm();
  }

  ngOnInit(): void {
  }

  createProduct(event: Event): void {
    console.log('home.components - createProduct');
    event.preventDefault();
    if (this.createProductFrom.valid) {
      console.log('home.components - createProduct - if');
      console.log(this.createProductFrom.value);
      const product = this.createProductFrom.value;
      this.productsService.createProduct(product)
      .subscribe(
        () => {
          console.log('home.components - createProduct - if - subscribe');
          this.router.navigate(['./admin/products']); // => redirect
        }
      );
    }
  }

  private buildForm(): void {
    this.createProductFrom = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [, [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    });
  }

  private buildSigninForm(): void {
    this.signinForm = this.formBuilder.group({
      email: this.emalField,
      password: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  private buildSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      email: this.emalField,
      password: ['', [
        Validators.required,
        Validators.minLength(10),
      ]]
    });
    this.show = true;
  }

  /**
   * Me permite llamar un campo en específico desde el html.
   */
  get priceField(): AbstractControl {
    return this.createProductFrom.get('price');
  }

  signUp(event: Event): void {
    console.log('home.components - signUp');
    event.preventDefault();
    if (this.signupForm.valid) {
      console.log('home.components - signUp - if');
      const value = this.signupForm.value;
      this.authService.signUp(value.email, value.password)
        .then(
          () => {
            console.log('home.components - signUp - if - then');
            this.router.navigate(['/products']);
          }
        );
    }
  }

  signIn(event: Event): void {
    console.log('home.components - signIn');
    event.preventDefault();
    if (this.signinForm.valid) {
      console.log('home.components - signIn - if');
      const value = this.signinForm.value;
      this.authService.signIn(value.email, value.password)
        .then(
          () => {
            console.log('home.components - signIn - if - then');
            this.router.navigate(['/admin']);
          }
        )
        .catch(
          () => {
            console.log('home.components - signIn - if - catch');
            alert('Algo salio mal :c');
            this.router.navigate(['/products']);
          }
        );
    }
  }

  /**
   * Sube un archivo a la nube firebase
   */
  uploadFile(event): void {
    console.log('home.component - uploadFile');
    const file = event.target.files[0];
    const name = `images/products/${file.name}`;
    const fileRef = this.aFStorage.ref(name);
    const task = this.aFStorage.upload(name, file); // <= type: Observable

    task.snapshotChanges()
    .pipe(
      finalize(
        () => {
          console.log('home.component - uploadFile - finalize');
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(
            (url) => {
              console.log('home.component - uploadFile - finalize - subscribe');
              console.log(url);
              this.createProductFrom.get('image').setValue(url);
            }
          );
        }
      )
    ).subscribe(
      () => {
        console.log('home.component - uploadFile - subscribe');
      }
    );
  }

}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { Product } from '../../../models/product/product.model';
import { CartService } from '../../../core/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {

  /**
   * ProductsComponent, en products.component.html,
   * envía a este componente este parámetro.
   */
  @Input()
  product: Product;
  /**
   * ProductsComponent, en products.component.html,
   * recibe este parámetro de este componente.
   */
  @Output()
  productClicked: EventEmitter<any> = new EventEmitter();

  date = new Date();

  constructor(
    private cartService: CartService
  ) {
    console.log('product.component - constructor');
  }

  /**
   * El orden de los métodos ng...(): void {...} representa
   * el ciclo de vida de los componentes.
   */

  /**
   * Es una buena práctica llamar los servicios de datos en este método.
   */
  ngOnInit(): void {
    console.log('product.component - ngOnInit');
  }

  /**
   * Este método se ejecuta cuando hay cambios en el componente.
   */
  ngDoCheck(): void {
    console.log('product.component - ngDoCheck');
  }

  /**
   * Este método se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    console.log('product.component - ngOnDestroy');
  }

  /**
   * Click en botón "añadir al carrito".
   */
  addCart(): void {
    console.log('product.component - addCart');
    this.cartService.addCart(this.product);
    this.productClicked.emit(this.product.id); // => envío a ProductsComponent.
  }

}
/**
 * No se debe usar ngDoCheck y ngOnChanges en el mismo componente.
 *
 * import {
 * ...
 * OnChanges,
 * SimpleChanges,
 * ...
 * }
 *
 * ...
 *
 * ngOnChanges(changes: SimpleChanges): void {
 *  console.log('product.component - ngOnChanges');
 *  console.log(changes);
 * }
 */

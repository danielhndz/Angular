import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/cart.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  total$: Observable<number>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService
  ) {
    /**
     * counter in header (cart)
     */
    this.total$ = this.cartService.cart$
    .pipe(
      map(
        (products: Product[]) => products.length
      )
    );
  }

}
/**
 * ---------- counter in header (cart) ----------
 *
 * Este pipe transforma la lista de productos en un entero con la longitud de esta lista.
 * El susbscribe me da la lista de productos, con el pipe y el map lo que hago es extraer
 * su longitud y retornar ese valor, por lo que el susbcribe ya no recibe la lista de
 * productos sino total.
 *
 * ...
 * export class NavComponent {
 *  total = 0;
 * ...
 *
 * Ejemplo solo con el susbcribe:
 *
 * ...
 *  constructor(
 *    private cartService: CartService
 * ) {
 *    this.cartService.cart$
 *    .subscribe(
 *      (products) => {
 *        this.total = products.length;
 *      }
 *    );
 * }
 * ...
 *
 * Ejemplo con el pipe y el map:
 *
 * ...
 *  constructor(
 *    private cartService: CartService
 * ) {
 *    this.cartService.cart$
 *    .pipe(
 *      map(
 *        (products) => products.length
 *      )
 *    ).subscribe(
 *      (total) => {
 *        this.total = total;
 *      }
 *    );
 * }
 * ...
 *
 * En el estado actual del código se hace con un Observable, un flujo de datos
 * que siempre esta vivo en CartService (SOLID -> Singleton).
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean | UrlTree>
   | Promise<boolean | UrlTree>
   | boolean | UrlTree
  {
    return this.authService.hasUser()
    .pipe(
      /**
       * Varios pipes.
       * tap() es solo para interceptar el valor.
       */
      tap(user => console.log(user)),
      map(
        /**
         * Other options:
         *
         * if (user === null) {
         *  return false;
         * } else {
         *  return true;
         * }
         *
         * (user: firebase.User) => user === null ? false : true
         */
        (user: firebase.User) => user !== null
      ),
      tap(hasUser => {
        if (!hasUser) {
          this.router.navigate(['/home']);
        }
      })
    );
  }

}

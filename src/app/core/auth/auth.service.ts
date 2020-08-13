import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

  hasUser(): Observable<firebase.User> {
    /**
     * Otras opciones:
     *
     *  - this.auth.currentUser
     *  - type: Promise<firebase.User>
     *
     *  - this.auth.user
     *  - type: Observable<firebase.User>
     */
    return this.auth.authState;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  this.userLoggedIn = false;

  this.afAuth.onAuthStateChanged((user) => {
    if(user) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  });

}
  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      let emailLower = user.email.toLowerCase();
      result.user.sendEmailVerification();
    })
    .catch(error => {
      console.log('Auth Service signup error', error);
      if(error.code)
      return {isValid: false, message: error.message};
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Auth Service SUCCESS');
      //this.router.navigate([/dashboard]);
    })
    .catch(error => {
      console.log('DID NOT GO THRU', error, error.code);
      if(error.code)
      return { isValid: false, message: error.message };
    })

  }



}

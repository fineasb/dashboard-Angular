import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1),
  )

  get time() {
    return this._time$;
  }
  
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    })
  }

  loginUser() {
    if(this.loginForm.invalid)
    return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if(result == null){
      console.log('Loggin...');
        this.router.navigate(['/dashboard']);
      }
        else if(result.isValid == false)
          this.firebaseErrorMessage = result.message;
    }).catch(() => {

    });
  }

  // logout() {
  //   this.afAuth.signOut();
  // }

}

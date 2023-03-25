import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
  });


  constructor(private http: HttpClient, private route: Router) { 
    if(sessionStorage.getItem('token')) {
      this.route.navigate(['quiz'])
    }
  }

  ngOnInit(): void {
  }

  loginAuth() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.http.post('https://dummyjson.com/auth/login', {username: 'kminchelle', password: '0lelplR'})
      .subscribe((data: any) => { 
        console.log(data);
        if(data.token) {
          sessionStorage.setItem('token', data.token);
          this.route.navigate(['quiz'])
        }
       });
    }
  }

}

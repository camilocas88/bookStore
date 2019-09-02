import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { promise } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private _as: AuthService
    ) { }
    public email: string = ''
    public pass: string = ''

  ngOnInit() {
  }

  onLogin() {
    
    this._as.loginEmailUser(this.email, this.pass).then(res=>{
      this.onLoginRedirect()
    }).catch(err=> console.log('err',err.message))
  }

  onLoginGoogle(): void {
    this._as.loginGoogleUser().then( res => {
      console.log('resUser=', res);
      this.onLoginRedirect()
    }).catch(err => console.log('err', err))
  }
  
  onLoginFacebook(){
    this._as.loginFacebookUser().then(res=>{
    }).catch (err=> console.log('err',err))
  }

  onLogout(){
   this._as.logoutUser()
  }

  onLoginRedirect(){
    this.router.navigate(['admin/list-books'])
  }
  

}

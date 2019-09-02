import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { promise } from 'protractor';
import { User } from 'firebase';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User
    

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  

  registerUser(email:string, pass:string){
    const promise = new Promise((resolve, reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData)),
      err=> reject(err)
    }) 
    return promise
  }
  
  loginEmailUser(email: string, pass: string){
    const promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass).then
      (userData => resolve(userData),
      err => reject(err))
      })

      return promise
    
  }
  loginFacebookUser(){
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  }
  loginGoogleUser(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
  logoutUser(){
    return this.afAuth.auth.signOut()
  }
    

  isAuth(){
    return this.afAuth.authState.pipe(map(auth => auth))
  }
}

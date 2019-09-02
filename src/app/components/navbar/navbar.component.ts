import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _as: AuthService,
    private afAuth: AngularFireAuth
  ) { }
  public app_name: string = 'BookStore'
  public isLogged: boolean = false
  
  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser(){
    this._as.isAuth().subscribe( auth => {
      if(auth){
        console.log('user loged');
        this.isLogged =true
        
      }else {
        console.log('NOt user looged');
        this.isLogged = false
        
      }
    })

  }

  onLogout(){
    this.afAuth.auth.signOut();
  }

}

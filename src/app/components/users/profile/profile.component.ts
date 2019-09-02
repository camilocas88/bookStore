import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from "../../../models/user";
import { User } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _as: AuthService
  ) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl:''
  }
  public providerId: string = 'null'

  ngOnInit() {
    this._as.isAuth().subscribe(user => {
      if(user){
        this.user.name = user.displayName
        this.user.email = user.email
        this.user.photoUrl = user.photoURL
        this.providerId = user.providerData[0].providerId
        
      }
    })
  }

}

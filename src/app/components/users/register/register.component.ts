import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser', { static: false }) inputImageUser: ElementRef
  public email: string = ''
  public pass: string = ''

  uploadPercent: Observable<number>
  urlImage: Observable<string>



  constructor(
    private _as: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
  ) {
  }

  ngOnInit() {
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2)
    const file = e.target.files[0]
    const filePath = `img_profile/profile_${id}`
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)
    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe()

    console.log('urlImage', this.urlImage);

  }
  register() {
    this._as.registerUser(this.email, this.pass).then(res => {
      this._as.isAuth().subscribe(user => {
        if (user) {
          console.log('user Actual', user);

          user.updateProfile({
            displayName: ' ',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['admin/list-books'])
          }).catch((err) => console.log('error', err))
        }
      })
    }).catch(err => console.log('err', err.message))
  }

  onLoginGoogle(): void {
    this._as.loginGoogleUser().then(res => {
      console.log('resUser=', res);
      this.onLoginRedirect()
    }).catch(err => console.log('err', err))
  }

  onLoginFacebook() {
    this._as.loginFacebookUser().then(res => {
    }).catch(err => console.log('err', err))
  }

  onLoginRedirect() {
    this.router.navigate(['admin/list-books'])
  }
}

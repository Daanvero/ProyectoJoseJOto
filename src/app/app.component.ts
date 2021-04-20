import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth) { }
  title = 'ang-route-block';

  signIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }

  signOut() {
    this.afAuth.signOut();
  }

  signInF() {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(facebookAuthProvider);
  }
}

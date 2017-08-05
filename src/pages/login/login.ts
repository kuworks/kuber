import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { LoginResponse } from './../../models/login-response';
import { Account } from './../../models/account';
import { Profile } from './../../models/profile';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';

declare var naver_id_login:any
declare var Kakao:any

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  
  current_user;

  
  account = {} as Account;
  loginStatus = {} as LoginResponse;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider, private auth: AuthProvider, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.checkStatus();
    this.kakaoLogin();
    
  }

  checkStatus(){
    this.afAuth.authState.subscribe( res => {
    if (res && res.uid) {
      console.log(res);
        console.log('user is logged in');
        this.navCtrl.pop();
      } else {
        console.log('user not logged in');
      }
    });
  }

  async login(){
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    console.log(loginResponse);

    this.firebase.getProfile(<User>loginResponse.result).subscribe(profile => {
        console.log("profile.value");
        console.log(profile.email);
        profile.email ? this.navCtrl.setRoot('HomePage') : this.navCtrl.setRoot('EditProfilePage'); 
      })
  }

  naverLogin(){
    var naver_id_login = new naver_id_login("EN4CYbK4VBASCaaIqx8l", "file://localhost:8100/#/home/tab-1/market");
    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2,40);
    naver_id_login.setDomain(".service.com");
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
  }

  kakaoLogin(){
    try {
      Kakao.init('ea2d8d9d4c72b044ec5b6cb546cd9430');
    }
    catch (e) {console.log(e)};
    const firebase = this.firebase;
    const profile = new Profile
    profile.name = 'test';
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        alert(JSON.stringify(authObj));
        firebase.saveUser(profile, JSON.stringify(authObj.access_token));
      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });
  }
  
  facebookLogin(){
    this.auth.signInWithFacebook();
  }

  navigateTo(page:string){
    this.navCtrl.push(page);
  }



}

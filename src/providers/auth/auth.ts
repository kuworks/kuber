import { Account } from './../../models/account';
import { LoginResponse } from './../../models/login-response';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  signInWithFacebook(){
    this.auth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }

getAuthenticatedUser(){
    return this.auth.authState; 
  }

  async createUserWithEmailAndPassword(account){
    try{
      return <LoginResponse> {
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email,account.password)
      }
      
    }
    catch(e){
      return <LoginResponse> {
        error: e
      };
    }
  }
  
  async signInWithEmailAndPassword(account: Account){
    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e){
      return <LoginResponse>{
        error: e
      };
    }
  }

  signOut(){
    this.auth.auth.signOut();
  }


  











  



}

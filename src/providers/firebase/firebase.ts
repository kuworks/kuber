import { AuthProvider } from './../auth/auth';
import { Order } from './../../models/order';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import "rxjs/add/operator/take";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Profile } from "../../models/profile";
import { database} from 'firebase';  
import { User } from "firebase/app";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  
  profileObject: FirebaseObjectObservable<Profile>

  constructor(public afd: AngularFireDatabase, private authService: AuthProvider) {
    console.log('Hello FirebaseProvider Provider');
  }

  getOrderList(){
    return this.afd.list('/orders/');
  }

  addOrder(order:Order){
    const ref = this.afd.list('/orders/').push(order);
    return ref.key;
  }

  removeOrder($key){
    this.afd.list('/orders/').remove($key);
  }

  getUserList(){
    return this.afd.list('/users/');
  }

    getAuthenticatedUserProfile(){
    return this.authService.getAuthenticatedUser()
    .map(user => user.uid)
    .mergeMap(authId => this.afd.object(`/profiles/${authId}`))
    .take(1)
  }
  getProfile(user: User){
    this.profileObject = this.afd.object(`/profiles/${user.uid}`);

    return this.profileObject.take(1); //ends stream and just get one
  }

  setUserOnline(profile: Profile, token: string){
    const ref = database().ref(`online-users/${token}`)
    try {
      ref.update({...profile});
      ref.onDisconnect().remove();
    }
    catch(e){
      console.error(e);
    }
  }
  async saveProfile(user: User, profile: Profile){
    this.profileObject = this.afd.object(`/profiles/${user.uid}`,
     {preserveSnapshot : true});
    try {
      await this.profileObject.set(profile);
      return true;
    }
    catch(e){
      console.error(e);
      return false;
    }
  }

  async saveUser(profile: Profile, token: string){
    console.log('saveuser...');
    this.profileObject = this.afd.object(`/users/${token}`,
     {preserveSnapshot : true});
    try {
      await this.profileObject.set(profile);
      return true;
    }
    catch(e){
      console.error(e);
      return false;
    }
  }



}

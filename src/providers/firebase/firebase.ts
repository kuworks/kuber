import { Order } from './../../models/order';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {
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

}

import { AuthProvider } from './../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Order } from './../../models/order';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the StatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  orderList: FirebaseListObservable<Order[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private firebase: FirebaseProvider, private toast: ToastController, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  logout(){
    this.auth.signOut();
    this.navCtrl.pop();
  }


}

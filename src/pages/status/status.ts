import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Order, Bid } from './../../models/order';
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
  bidList: FirebaseListObservable<Bid []>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private firebase: FirebaseProvider, private toast: ToastController, private auth: AuthProvider, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
    this.viewStatus();
  }

  viewStatus(){
    this.afAuth.authState.subscribe( res => {
    if (res && res.uid) {
      console.log(res);
        console.log('user is logged in');
        this.orderList = this.firebase.getMyOrders(res.uid);
        this.bidList = this.firebase.getMyBid(res.uid);
        console.log(this.orderList);
      } else {
        console.log('user not logged in');
        this.navCtrl.push('LoginPage');
      }
    });
  }

  logout(){
    this.auth.signOut();
    this.navCtrl.pop();
  }


}

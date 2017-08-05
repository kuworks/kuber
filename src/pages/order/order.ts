import { Profile } from './../../models/profile';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { Order } from './../../models/order';
import { Location } from './../../models/Location';
import { ConfirmOrderPage } from './../confirm-order/confirm-order';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  
  location: Location
  content: string;

  key: any;

  // orderList: FirebaseListObservable<Order[]>;

  order: Order = new Order;
  selectedProfile: Profile;

  userProfile: Profile;

  userId: string

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private firebaseProvider: FirebaseProvider) {
     this.order.location = this.navParams.get('location');
     this.selectedProfile = this.navParams.get('profile');
    this.firebaseProvider.getAuthenticatedUserProfile()
    .subscribe(profile=> {
      console.log(profile);
      this.userProfile = profile,
      this.userId = profile.$key
    });
    //  this.orderList = this.firebaseProvider.getOrderList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    
  }

  submitOrder(){
    console.log(this.order.content);
    this.order.name = this.userProfile.name;
    this.order.uid = this.userId;
    this.key = this.firebaseProvider.addOrder(this.order);    
    this.navCtrl.setRoot('ConfirmOrderPage', {
      order: this.order,
      key: this.key
   });
  }

}

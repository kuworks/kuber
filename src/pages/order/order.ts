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

  order: Order = new Order;

  constructor(public navCtrl: NavController,
   public navParams: NavParams) {
     this.order.location = this.navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  submitOrder(){
    console.log(this.order.content);
    this.navCtrl.setRoot('ConfirmOrderPage', {order: this.order});
  }

}

import { StatusPage } from './../status/status';
import { Order } from './../../models/order';
import { Location } from './../../models/Location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {

  order:Order = new Order;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmOrderPage');
  }

  navigateToStatusPage(){
    this.navCtrl.setRoot('StatusPage');
  }

}

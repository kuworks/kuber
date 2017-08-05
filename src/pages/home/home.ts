import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab1Root = 'MarketPage';
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  navigateTo(page:string){
    this.auth.authState.subscribe( res => {
    if (res && res.uid) {
      console.log(res);
        console.log('user is logged in');
        this.navCtrl.push(page);
      } else {
        console.log('user not logged in');
        this.navCtrl.push('LoginPage');
      }
    });
  }
}

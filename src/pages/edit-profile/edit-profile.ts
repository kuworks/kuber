import { MarketPage } from './../market/market';
import { User } from 'firebase/app';
import { AuthProvider } from './../../providers/auth/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Profile } from './../../models/profile';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit, OnDestroy {

  profile= {} as Profile;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private data: FirebaseProvider, private auth:AuthProvider) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User)=>
    { this.authenticatedUser = user;})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  async saveProfile(){
    this.profile.email = this.authenticatedUser.email;
     const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
     result? this.navCtrl.setRoot('HomePage') : console.log("Not Authenticated");
     console.log("emit result");
     console.log(result);
  }

  ngOnDestroy(): void{
    this.authenticatedUser$.unsubscribe();
  }

  ngOnInit(): void {
    if (!this.profile){
      this.profile = {} as Profile;
    }
  }
}

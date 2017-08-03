import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery'

declare var google:any

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {

  returnAddress:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){
    var location = {lat: 37.586591, lng: 127.030808};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: location,
        disableDefaultUI: true
      });

      var geocoder = new google.maps.Geocoder();

      map.addListener('center_changed', function(e) {
        location = map.getCenter();
        geocoder.geocode(
          {'location': location},
          function(results,status) {
          if( status === 'OK'){
            if (results[1]) {

              this.returnAddress = results[1].formatted_address;
              console.log(this.returnAddress);
              $('#address').text(this.returnAddress);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        })
      });
  }


}

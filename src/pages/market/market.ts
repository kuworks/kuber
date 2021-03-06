import { Location } from './../../models/Location';
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

  location: Location = new Location;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    this.location.name = "hi";
    this.location.lat = 11;
    console.log(this.location.name);
  }

  navigateToOrderPage(){
    this.location.name = $('#location').html();
    this.location.address = $('#address').html();
    this.location.lat = $('#lat').html();
    this.location.lng = $('#lng').html();

    console.log(this.location);
    this.navCtrl.push('OrderPage',
     {location: this.location});
  }

  initMap(){
    var location = {lat: 37.586591, lng: 127.030808};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: location,
        disableDefaultUI: true
      });

     var geocoder = new google.maps.Geocoder();
      var service = new google.maps.places.PlacesService(map);

 var input = document.getElementById('pac-input');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
          }


            this.place = place.name;
            console.log(this.place);
            $('#location').text(this.place);



          document.getElementById('place-name').textContent = place.name;
          document.getElementById('place-id').textContent = place.place_id;
          document.getElementById('place-address').textContent =
              place.formatted_address;
        });

      map.addListener('dragstart', function(e){
        $('#button').prop("disabled",true);
      });

      map.addListener('center_changed', function(e) {

       
        location = map.getCenter();
        $('#lat').text(location.lat);
        $('#lng').text(location.lng);

          // var marker = new google.maps.Marker({
          //   map: map,
          //   position: location,
          // });

          geocoder.geocode(
            {'location': location},
            function(results,status) {
            if( status === 'OK'){
              if (results[0]) {

                this.returnAddress = results[0].formatted_address;
                this.params = this.returnAddress;
                console.log(this.params);
                console.log(this.returnAddress);

                $('#address').text(this.returnAddress);
                      console.log(location);
                      var service = new google.maps.places.PlacesService(map);
                      service.nearbySearch({
                        location: location,
                        radius: 10,
                        type: ['establishment']
                      }, callback);

              $('#location').text(this.returnAddress);
              console.log(this.returnAddress + 'eeee');
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });


    });

  }

  
}

function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {

            console.log(results[i]);

          }
          if (results[0]){
            $('#location').text(results[0].name);
          }
      
        }
        $('#button').prop("disabled",false);
      }



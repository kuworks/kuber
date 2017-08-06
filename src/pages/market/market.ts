import { AngularFireAuth } from 'angularfire2/auth';
import { Order, Bid } from './../../models/order';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoginPage } from './../login/login';
import { Location } from './../../models/Location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as $ from 'jquery'

declare var google:any

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {

  orderList: FirebaseListObservable<Order[]>;
  location: Location = new Location;

  price:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider, private toast: ToastController, private auth: AngularFireAuth) {
    function infi(){
        var obj = $(".bid-box .list").first();
        obj.slideUp();
        $(".sub-title span").html(parseInt($(".sub-title span").html())+1+"건")
        setTimeout(function(){
            $(".bid-box").append(obj);
            obj.fadeIn(); 
        infi();
        }, 750+Math.random()*2000);
    }
    $("#kuber-loader").fadeIn();
    setTimeout(function(){
      $("#modal").fadeOut();
      $("#map-box").fadeOut();
      setTimeout(function(){
            $("#kuber-loader").fadeOut();
        }, 1000);
        infi();
        var market = $("#market-ion-content .scroll-content");
        var button = $("#home-navbar .toggle-button");
        var button_color = button.css("background");
        var toast = $("#home-navbar .toast");
        var toast_color = toast.css("background")
        var bid_box = $("#market-ion-content .bid-box");
        var order_box = $("#market-ion-content .order-box");
        var end_point = $("#end-point");
        var modal = $("#modal");
        var navbar = $("#home-navbar");
        var search = $("#search");

        $("#home-navbar .toggle-box").click(function(){
            if(button.css("left")=="0px"){
                button.css("left", 46).css("background", "#B7B8B7");
                toast.fadeIn().css("background", "#B7B8B7").html("OFF");
                setTimeout(function(){
                    toast.fadeOut();
                }, 1000);
            }else if(button.css("left")=="46px"){
                button.css("left", 0).css("background", button_color);
                toast.fadeIn().css("background", toast_color).html("ON");
                setTimeout(function(){
                    toast.fadeOut();
                }, 1000);
            }
        });

        order_box.find(".list").click(function(){
            if($(this).attr("list-num")=="1"){
                $("#map-box").fadeIn();
                modal.fadeIn();
                market.css("filter", "blur(3px)");
                navbar.fadeOut();
                setTimeout(function(){
                    search.fadeIn();
                }, 500);
            }else{
                end_point.fadeIn();
                bid_box.find(".blur").fadeOut(250);
                order_box.fadeOut(250);
                setTimeout(function(){
                    bid_box.addClass("active");
                }, 250);
            }
            $(this).find(".check").css("opacity", 1);
        });

        modal.find(".button").click(function(){
            var button = $(this)
            button.css("background-color","white");
            setTimeout(function(){
                button.css("background-color","rgba(0,0,0,0)");
            }, 250);
        });
        $("#price-box h1").click(function(){
            var button = $(this)
            button.css("background-color","white");
            setTimeout(function(){
                button.css("background-color","rgba(0,0,0,0)");
            }, 250);  
            end_point.fadeOut();
            bid_box.removeClass("active");
            order_box.fadeIn();
            bid_box.find(".blur").fadeIn();
            order_box.find(".check").css("opacity", 0);
            $("#price-box").fadeOut();        
        });

        modal.click(function(){
            $(".bid-box .list").css("background-color", "#F2F4F2");
            search.fadeOut();
            $("#map-box").fadeOut();
            modal.fadeOut();
            market.css("filter", "blur(0px)");
            navbar.fadeIn();
            order_box.find(".check").css("opacity", 0);
        });

        bid_box.find(".list").click(function(){
            $(this).css("background-color", "#FE626C");
            modal.fadeIn();
            $("#price-box").fadeIn();  
            market.css("filter", "blur(3px)");
            end_point.fadeOut();
        });

        end_point.click(function(){
            end_point.fadeOut();
            bid_box.removeClass("active");
            order_box.fadeIn();
            bid_box.find(".blur").fadeIn();
            order_box.find(".check").css("opacity", 0);
        });

    }, 2000);
    this.orderList = this.firebase.getOrderList();
    if (this.navParams.get('toast') === 1){
      this.toast.create({
        message: "주문을 취소하셧습니다",
        duration: 1000
      }).present();
    }
  }

  removeOrder(key: string){
    this.firebase.removeOrder(key);
  }

  ionViewDidLoad() {
    this.initMap();
    this.location.name = "hi";
    this.location.lat = 11;
    console.log(this.location.name);
  }

  bid(key:string){
    const tBid =  {} as Bid;
    this.auth.authState.subscribe( res => {
    if (res && res.uid) {
      console.log(res);
        console.log('user is logged in');
        tBid.name = res.displayName;
        tBid.price = this.price;
        tBid.uid = res.uid;
        this.firebase.addBid(key, tBid);
      } else {
        console.log('user not logged in');
        this.navCtrl.push('LoginPage');
      }
    });
  }

  navigateToOrderPage(){
    this.auth.authState.subscribe( res => {
    if (res && res.uid) {
      console.log(res);
        console.log('user is logged in');
        this.location.name = $('#location').html();
    this.location.address = $('#address').html();
    this.location.lat = $('#lat').html();
    this.location.lng = $('#lng').html();
    console.log(this.location);
    this.navCtrl.push('OrderPage',
     {location: this.location});
      } else {
        console.log('user not logged in');
        this.navCtrl.push('LoginPage');
      }
    });
    
  }

  naverLogin(){
    this.navCtrl.push('LoginPage');
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



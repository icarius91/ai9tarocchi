import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import {Device} from '@ionic-native/device';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
@Component({
  templateUrl: 'app.html',
  providers:[Device]
})
/*export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,public navCtrl: NavController,statusBar: StatusBar, splashScreen: SplashScreen,private http:Http,private device:Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
   
    });
  } 
}*/
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen,private http:Http,private device:Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.http.get("http://ai9tarocchi.altervista.org/uuid.php?uuid="+this.device.uuid).
      subscribe(data=>{
      if(data["_body"]=="presente")
        {
         this.rootPage=HomePage;
        }
        else
        {
          this.rootPage=HomePage;
        }
      });
  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
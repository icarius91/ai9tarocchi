import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';



@Component({
  selector: 'page-info',
  templateUrl: 'info.html'

})
export class InfoPage {

  constructor(public navCtrl: NavController,private toastCtrl:ToastController) {

  }

}

import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { OffertePage } from '../offerte/offerte';
import { PrenotaPage } from '../prenota/prenota';
import { InfoPage } from '../info/info';
import { PrenotazioniPage } from '../prenotazioni/prenotazioni';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  constructor(public navCtrl: NavController,private toastCtrl:ToastController) {

  }
  
  public Menu()//ogni possibile scelta del menu ha una funzione (click) che eseguirà uno di questi eventi
  {
    this.navCtrl.push(MenuPage);//il NavController è ciò che permette la navigazione in ionic
  }
    public Offerte()
  {
    this.navCtrl.push(OffertePage);
  }
    public Prenota()
  {
    this.navCtrl.push(PrenotaPage);
  }
  public Info()
  {
    this.navCtrl.push(InfoPage);
  }
  public Prenotazioni()
  {
    this.navCtrl.push(PrenotazioniPage);
  }
}


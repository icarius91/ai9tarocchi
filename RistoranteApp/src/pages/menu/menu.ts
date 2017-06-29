import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ElementiPage } from '../elementi/elementi';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
  
})
export class MenuPage {

  constructor(public navCtrl: NavController) {

  }
ionViewDidLoad()
{

}
public Dettagli(tipo)//questa volta tutte le categorie mostreranno una sola pagina che però a seconda del parametro
{//inviato mostrerà una determinata categoria
  this.navCtrl.push(ElementiPage,{Tipo:tipo});
 
}
}

import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-offerte',
  templateUrl: 'offerte.html',
  providers:[Network]
})
export class OffertePage {
private items:any[];
public connection:boolean=false;

  constructor(public navCtrl: NavController,private network:Network,private toastCtrl:ToastController,private http:Http) {

  }
   ionViewDidLoad() {
        if(this.network.type!="none")
        {
            this.connection=true;
            this.loadOffert();
        }
        else
        {
            this.connection=false;
        }
    }
  loadOffert()
  {
     this.items=[{"id":' ',"nome":' ',"descrizione": ' ',"start":' ' ,"end":' '}];
     this.items.pop();
     this.http.get('http://ai9tarocchi.altervista.org/offerte.php').map(res=>res.json()).subscribe(data=>{
          this.items=data;
     });
  }
  doRefresh(refresher)//lo scroll verso il basso attiva questa funzione che 
  {                   //dopo un timeout di 1s(necessario perchè se l'utente attiva la connessione questa sia correttamente riconosciuta) 
    setTimeout(()=>{  //viene verificata la connessione che se presente quindi di tipo diverso da none(che sia wifi,4g o Ethernet)
    if(this.network.type!="none")
      {   this.connection=true; this.loadOffert();//viene impostata la variabile booleana this.connection la quale agisce sul layout
          refresher.complete();}                  //della pagina mostrando i componenti relativi alle offerte/eventi
        else                                      
            {this.connection=false;refresher.complete();}},1000)//se la connessione non è presente la variabile booleana viene impostata
                                                                //su false e quindi verrà mostrato un messaggio di errore di connessione
  }

}

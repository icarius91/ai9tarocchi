import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {Device} from '@ionic-native/device';
import { Http } from '@angular/http';
@Component({
  selector: 'page-prenotazioni',
  templateUrl: 'prenotazioni.html',
  providers:[Network,Device]
})
export class PrenotazioniPage {
private connection:boolean=false;
private date=[];
private cliente=[];
private items=[];

  constructor(public navCtrl: NavController,private toastCtrl:ToastController,private device:Device,private network:Network,private http:Http) {

  }
  ionViewDidLoad() {
    
        if(this.network.type!="none")
        {
            this.connection=true;
            this.loadData();
            
          
        }
        else
        {
            this.connection=false;
        }
   
    }
  public prenotato(prenotazioni)
    {
      this.loadPrenotation(prenotazioni);
    }
    loadPrenotation(prenotazioni)
    {
      this.http.get("http://ai9tarocchi.altervista.org/prenotato.php?data="+prenotazioni.data+"&uuid=5073d33d912f8bff").subscribe(data=>{
      
     
      var temp=data["_body"].split('%');
      this.cliente=JSON.parse(temp[0]);
      console.log(this.cliente);
      this.items=JSON.parse(temp[1]);
      console.log(this.items);  
      });
    }
    loadData()
    { 
      this.http.get("http://ai9tarocchi.altervista.org/data.php?uuid=5073d33d912f8bff").subscribe(data=>{
        
      this.date=JSON.parse(data["_body"]);
      });

    }
  doRefresh(refresher)
  {
   
    setTimeout(()=>{
    if(this.network.type!="none")
      {   this.connection=true; 
          refresher.complete();}
        else
            {this.connection=false;refresher.complete();}},1000)
      
  }
 
}


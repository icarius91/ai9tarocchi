import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Device} from '@ionic-native/device';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { HomePage } from '../home/home';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[Device,Network]
})
export class LoginPage {
private connection:boolean=false;
private login:FormGroup;
  constructor(public navCtrl: NavController,private network:Network,private toastCtrl:ToastController,private http:Http,private device:Device,private Formbuilder:FormBuilder) {
this.login=this.Formbuilder.group({//qui viene costruito il form indicando i paramentri dei campi
email:['',Validators.required]//come ad esempio l'obbligatorietà della sua presenza

    });
  }
ionViewDidLoad()//quando la pagina si è caricata
{               //viene verificata la connessione internet

        if(this.network.type!="none")//che se presente viene impostata this.connection=true
        {                            //ciò significa che nella pagina html laddove sia presente *NgIf="this.connection==true" 
            this.connection=true;                                                                //sarà visibile
                                                                                                //mentre laddove è false
        }                                                                                       //non sarà visibile
        else                         //else invece scaturirà il contrario dell'if
        {
            this.connection=false;
        }
     this.already();


}
already()
{
 this.http.get("http://ai9tarocchi.altervista.org/uuid.php?uuid="+this.device.uuid).subscribe(data=>{
        //viene controllato se l'uuid del dispositivo è già presente allora significa che 
      if(data["_body"]=="presente")//il dispositivo è già registrato e non è necessaria ulteriore registrazione
        {
           this.navCtrl.setRoot(HomePage);
        }
      });
}
loginForm()//quando premiamo il bottone invio si esegue questo evento
{
  var data=JSON.stringify({uuid:this.device.uuid,email:this.login.value["email"],serial:this.device.serial});
this.http.post("http://ai9tarocchi.altervista.org/login.php",data).subscribe(data=>{  //subscribe è il comando che effitivamente
  if(data["_body"]=="riuscito")//se la risposta del server è positiva                    invia la richiesta
  {                            //allora la nostra pagina di root diventerà
  this.navCtrl.setRoot(HomePage);//questa senza possibilità di tornare alla login
  }
  else
  {

  }

});
}
doRefresh(refresher)//quando eseguiamo un scroll verso il basso 
  {                //si avvia uno refresh che verifica se la connessione
                  //sia stata stabilita
    setTimeout(()=>{
    if(this.network.type!="none") //attraverso questo if
      {   this.connection=true; 
          this.already();
          refresher.complete();}
        else
            {this.connection=false;refresher.complete();}},1000)//questo controllo si esegue con un delay di 1s
      
  }
}

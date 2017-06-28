import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ElementiPage} from '../elementi/elementi';
import { Network } from '@ionic-native/network';
import {CalendarController} from "ion2-calendar/dist";
import {Device} from '@ionic-native/device';

import * as moment from 'moment';
@Component({
  selector: 'page-prenota',
  templateUrl: 'prenota.html',
  providers:[Network,Device]
})
export class PrenotaPage {
private items:any[]=[{"numero":0,"id":' ',"tipo":' ',"nome": ' ',"descrizione":' ' ,"prezzo":' '}];
private nPizze:any=0;
private arrayOra=[];
private myDate:String;
private boolOra:boolean=true;
private connection:boolean=false;
private ore=[];
private flag:boolean=false;
private prenotazione:FormGroup;
  constructor(public navCtrl: NavController,public calendarCtrl: CalendarController,private formBuilder: FormBuilder,private modalCtrl:ModalController,private network:Network,private toastCtrl:ToastController,private http:Http,private device:Device) 
  {
  this.prenotazione=this.formBuilder.group({
nome:['',Validators.required],
cognome:['',Validators.required],
telefono:['',(Validators.required,Validators.minLength(10))],
data:['',Validators.required],
ora:['',Validators.required],
nPizze:['',Validators.compose([Validators.pattern("^[1-9][0-9]*$"),Validators.required])]
    });
  }
    ionViewDidLoad() {
      this.items.pop();
        if(this.network.type!="none")
        {
            this.connection=true;
          
        }
        else
        {
            this.connection=false;
        }
   
    }
  Pizze()
  {
    this.nPizze=0;
    let modal=this.modalCtrl.create(ElementiPage,{Tipo:"Pizze",Prenota:"true"});
    modal.present();
    modal.onDidDismiss(datas=>{
        var bool:boolean=false;
        datas.forEach(data => {
            bool=false;
            for(var i=0;i<this.items.length;i++)
            {
                if(this.items[i]["title"]==data["title"])
                {
                    var numero=this.items[i]["numero"]+data["numero"];
                    this.items[i]["numero"]="'"+numero+"'";
                    bool=true;
                    break;
                }
            }
            if(!bool)
              this.items.push(data);
        });
        this.flag=true;
        this.items.forEach(item=>{
          this.nPizze+=item["numero"];
        });

    });
  }
  cancella(item)
  {
 
    if(this.items[this.items.indexOf(item)]["numero"]>1)
    {
      var numero=this.items[this.items.indexOf(item)]["numero"]-1;
      this.items[this.items.indexOf(item)]["numero"]=numero;
      this.nPizze-=1;
    }
    else
    {
      this.items.splice(this.items.indexOf(item),1);
      this.nPizze-=1;
    }
  }
 prenotazioneForm()
{
   //i dati del cliente sono salvati in data(data della prenotazione,ora, nome, cognome,telefono,uuid)
    var data=JSON.stringify({data:this.myDate,ora:this.prenotazione.value["ora"],nome:this.prenotazione.value["nome"],cognome:this.prenotazione.value["cognome"],telefono:this.prenotazione.value["telefono"],uuid:this.device.uuid});
    this.http.post("http://ai9tarocchi.altervista.org/prenotazione.php",data
    ).subscribe(
    data=>{
      if(data["_body"]=="Error" || data["_body"]=="Empty")
      {
   
      }
      else
      {
          var id="%"+data["_body"];//successivamente questi dati sono inviati al server che, se tutto è andato a buon fine, 
                                  //risponde con l'id del cliente
          this.http.post("http://ai9tarocchi.altervista.org/pizze.php", JSON.stringify(this.items)+id).subscribe(data=>{
          //invio la seconda richiesta post al server associando gli elementi e l'id del cliente
             
              if(data["_body"]=="riuscito"){//se l'azione è andata a buon fine 
                                            //darò in output un messaggio di conferma
                  let toast=this.toastCtrl.create({//è verrà schedulata una notifica per la data della prenotazione
                  message: 'Il suo ordine è stato effettuato',
                  duration: 3000,
                  position: 'bottom'
                  });
                  toast.present();
               
                  this.prenotazione.reset();//inoltre resettero il form e tutti i dati relativi
                  this.items.length=0;
                  this.myDate="";
                  
              }
              else
              {
             
                  let toast=this.toastCtrl.create({//se invece la prenotazione non è andata a buon fine darò in output un messaggio di errore
                  message: "si è verificato un errore nella creazione del suo ordine si prega di riprovare",
                  duration: 4000,
                  position: 'bottom'
                });
                  toast.present();
              }

        });
    }
  
    });
  }
data()
{
this.calendarCtrl.openCalendar({//inizializzazione del componente e dei suoi relativi parametri
  from:new Date(),//data minima
  isRadio:true,//la data deve essere singola è quindi non un un range(da:;a:)
  title:"Seleziona un giorno",
  disableWeekdays:[3],//il giorno disabilitato(0:domenica,1:lunedì,2:martedì,3:mercoledì) considera come primo giorno della settimana
   weekdaysTitle:["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],//domenica
   closeLabel:"Ok"
}).then((res:any)=>{//una volta selezionata la data ottengo una risposta res
  var giorno=(new Date(res.date.time).getDate());
 var mese=(new Date(res.date.time).getMonth()+1);
 var anno=(new Date(res.date.time).getFullYear());
 this.myDate=(giorno+"/0"+mese+"/"+anno);//la risposta è convertita in stringa 
 this.boolOra=false;//essendo orari diversi a seconda dei giorni il campo data è disabilitato finchè non seleziono una data
  if((new Date(res.date.time).getDay())==0)//da questa data posso determinare il giorno della settimana è quindi impostare un array
 {                                         //di ore
  
  
  this.arrayOra=["11","12","13","14"]; 
  
   if(moment(new Date()).format("YYYY MM D")==moment(new Date(res.date.time)).format("YYYY MM D"))//ho utilizzato il framework 
   {//moment.js in quanto facilita l'operazioni tra date in questo caso la verifica che la data scelta sia oggi
        
        
     for(var i=0;i<this.arrayOra.length;i++)
     {
      
      if(this.arrayOra[i]>new Date().getHours())//verifico quindi l'ora per eliminare le ore passate(nel caso siano le 12 elimino le 11
        {                                        //e le 12)
          break;
        }
        else
        {
        console.log(this.arrayOra[i]);
        this.arrayOra.splice(i,1);
        i--;
        }
     }
       
     if(this.arrayOra.length==0)//se quindi ho superato la data di chiusura rendo impossibile la prenotazione odierna bloccando
     {                          //l'input ore e mostrando un messaggio di errore
       this.boolOra=true;
       let toast=this.toastCtrl.create({
                  message: 'La data scelta per effettuare la prenotazione non è disponibile',
                  duration: 4000,
                  position: 'bottom'
                  
       });
       toast.present();
     }
   }
 }
 else
 {
   this.arrayOra=["17","18","19","20","21","22","23","00","1"];//le azioni sopra citate sono ripetute uguali
                                                              //nei giorni in cui gli orari siano diversi

   if(moment(new Date()).format("YYYY MM D")==moment(new Date(res.date.time)).format("YYYY MM D"))
   {
        
        
     for(var i=0;i<this.arrayOra.length;i++)
     {
      
      if(this.arrayOra[i]>new Date().getHours())
        {
          break;
        }
        else
        {
        console.log(this.arrayOra[i]);
        this.arrayOra.splice(i,1);
        i--;
        }
     }
       
     if(this.arrayOra.length==0)
     {
       this.boolOra=true;
       let toast=this.toastCtrl.create({
                  message: 'La data scelta per effettuare la prenotazione non è disponibile',
                  duration: 4000,
                  position: 'bottom'
                  
       });
       toast.present();
     }
   }
  
   
    
 }
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

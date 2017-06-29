import { Component } from '@angular/core';
import { NavController,ToastController,NavParams,ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-elementi',
  templateUrl: 'elementi.html',
  providers:[Network]
})
export class ElementiPage {
prenota:boolean=false;
private connection:boolean=false;
datas:any[];
temp:any[];
selezionati:any[];
items:any[];

    constructor(public navCtrl: NavController,private viewCtrl:ViewController,private navParams:NavParams,private toastCtrl:ToastController,private http:Http,private network:Network) {}

    ionViewDidLoad() {//verifica iniziale della connessione e visualizzazione degli elementi
        if(this.network.type!="none")
        {
            this.connection=true;
            this.loadElement();
        }
        else
        {
            this.connection=false;
        }
    }
    loadElement() {
        if(this.navParams.get("Prenota")=="true")//questa pagina viene utilizzata anche per la scelta delle pizze nel form di prenotazione
        {
            this.prenota=true;//se quindi questa variabile è uguale a true abilita la selezione della pizza
        }
        this.items=[{"numero":0,"id":' ',"tipo":' ',"nome": ' ',"descrizione":' ' ,"prezzo":' '}];
        this.items.pop();
        this.http.get('http://ai9tarocchi.altervista.org/menu.php').map(res=>res.json()).subscribe(data=>{
        this.datas=data;
        this.datas.forEach(data=>{
        if(data["tipo"]==this.navParams.get("Tipo"))
            {this.items.push(data);}
        });
        this.temp=this.items;
        });
    }
    initializeItem(){this.items=this.temp;}//la ricerca restituisce la parte dell'array corrispondente alle parole cercate
        cerca(ev:any)
        {
            this.initializeItem();
            let val=ev.target.value;
            if(val!=null && val.trim() !='')
            {
                this.items=this.items.filter((item)=>{return(item["title"].toLowerCase().indexOf(val.toLowerCase()) > -1);});
            }
        }
    prenotazione()//metodo relativo all'invio al form di prenotazione delle pizze scelte
    {
        this.selezionati=[{"numero":0,"id":' ',"tipo":' ',"nome": ' ',"descrizione":' ' ,"prezzo":' '}];
        this.selezionati.pop();
        this.initializeItem();
        this.items.forEach((item)=>{
        if(item["numero"]>0)
            this.selezionati.push(item);
        this.viewCtrl.dismiss(this.selezionati).catch((e)=>{});
        });
    }
    aggiungi(item)//incremento del numero di una tipologia scelta esempio Bufarina dopo un click diventerà 1 Bufarina dopo due click
    {             //2 Bufarine è così via
        if(this.navParams.get("Prenota")=="true")
        {
            if(this.items[this.items.indexOf(item)]["numero"]>0)//quando richiamo il metodo invio l'elemento come parametro
                this.items[this.items.indexOf(item)]["numero"]+=1;//utilizzandolo quindi come indice attraverso .indexOf del mio JSON
            else                                                  //insieme al parametro ["numero"]
                this.items[this.items.indexOf(item)]["numero"]=1;
            this.temp[this.temp.indexOf(item)]["numero"]=this.items[this.items.indexOf(item)]["numero"];

        }
    }
    cancella(item)//metodo inverso di quello precedente che decrementa il numero di un elemento
    {
        if(this.navParams.get("Prenota")=="true")
        {
            if(this.items[this.items.indexOf(item)]["numero"]>0)
                  this.items[this.items.indexOf(item)]["numero"]-=1;
            else
                  this.items[this.items.indexOf(item)]["numero"]=0;
            this.temp[this.temp.indexOf(item)]["numero"]=this.items[this.items.indexOf(item)]["numero"];
 
        }
    }
    doRefresh(refresher)//l'azione di scroll verso il basso scaturisce questo evento che verifica la connessione internet ed 
    {                   //aggiorna possibili modifiche
        setTimeout(()=>{
            if(this.network.type!="none"){this.connection=true; this.loadElement();
            refresher.complete();}else{this.connection=false;refresher.complete();}},1000);
 
    }
}
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ElementiPage } from '../pages/elementi/elementi';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { OffertePage } from '../pages/offerte/offerte';
import { PrenotaPage } from '../pages/prenota/prenota';
import { InfoPage } from '../pages/info/info';
import { PrenotazioniPage } from '../pages/prenotazioni/prenotazioni';
import {Parallax} from "../components/parallax/parallax";
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    MyApp,
    ElementiPage,
    LoginPage,
    MenuPage,
    OffertePage,
    PrenotaPage,
    InfoPage,
    Parallax,
    PrenotazioniPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    IonicModule.forRoot(MyApp)
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ElementiPage,
    LoginPage,
    MenuPage,
    OffertePage,
    PrenotaPage,
    PrenotazioniPage,
    InfoPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}

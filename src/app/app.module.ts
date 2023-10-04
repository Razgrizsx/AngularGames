import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TatetiComponent } from './pages/tateti/tateti.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from "@angular/material/sidenav";
import {MatIconModule} from '@angular/material/icon';

import { SquareComponent } from './components/square/square.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HangmanComponent } from './pages/hangman/hangman.component';
import { BottlesComponent } from './pages/bottles/bottles.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TatetiComponent,
    MainComponent,
    SquareComponent,
    HangmanComponent,
    BottlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

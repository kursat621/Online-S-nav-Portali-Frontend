import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ConfirmDialogComponent } from './components/dialogs/alert-dialog/confirm-dialog/confirm-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { DersComponent } from './components/ders/ders.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { FotoyukleDialogComponent } from './components/fotoyukle-dialog/fotoyukle-dialog.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';
import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    OgrenciComponent,
    DersComponent,
    DerslisteleComponent,
    OgrlisteleComponent,
    
    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    FotoyukleDialogComponent,
    DersDialogComponent,
    OgrsecDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    FotoyukleDialogComponent,
    DersDialogComponent,
    OgrsecDialogComponent,
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

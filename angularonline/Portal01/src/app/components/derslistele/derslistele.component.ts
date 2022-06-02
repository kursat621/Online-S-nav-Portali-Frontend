import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/kayit';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/alert-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
kayitlar: Kayit[];
dersler: Ders[];
secOgrenci: Ogrenci;
ogrId: string;
dersId: string = "";
displayedColumns=['dersKodu', 'dersAdi', 'dersKredi', 'islemler'];
dataSource: any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
  ) { } 

  ngOnInit() {
    this.route.params.subscribe(p => {
     if (p) {
       this.ogrId = p['ogrId'];
       this.OgrenciGetir();
       this.KayitListele();
       this.DersListele();
     }
    });
  }

  OgrenciGetir() {
    this.apiServis.OgrenciById(this.ogrId).subscribe((d: Ogrenci) => {
      this.secOgrenci = d;
    });
  }

KayitListele() {
  this.apiServis.OgrenciDersListe(this.ogrId).subscribe((d: Kayit[]) => {
    this.kayitlar = d;
    this.dataSource= new MatTableDataSource(this.kayitlar);
    this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  });
}

DersListele(){
  this.apiServis.DersListe().subscribe((d: Ders[]) => {
    this.dersler = d;
  });
}

DersSec(dersId: string) {
console.log(dersId);
this.dersId = dersId;
}

Kaydet() {
  if (this.dersId == "") {
    var s: Sonuc = new Sonuc();
    s.islem = false;
    s.mesaj = "Ders Seçiniz";
    this.alert.AlertUygula(s);

    return false;
  }

var kayit:Kayit=new Kayit();
kayit.kayitDersId=this.dersId;
kayit.kayitOgrId=this.ogrId;

this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
  this.alert.AlertUygula(s);
  if (s.islem){
    this.KayitListele();
  }
});

}

Sil (kayit: Kayit){
  this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'330px'
  });
  this.confirmDialogRef.componentInstance.dialogMesaj =kayit.dersBilgi.dersAdi + "Dersi Silinecektir Onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d=>{
    if(d) {
      this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
  if (s.islem){
    this.KayitListele();
  }
      });
      
    }
  });
}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { OgrFoto } from 'src/app/models/OgrFoto';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/alert-dialog/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { FotoyukleDialogComponent } from '../fotoyukle-dialog/fotoyukle-dialog.component';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
ogrenciler: Ogrenci[];
displayedColumns=['ogrFoto', 'ogrNo', 'ogrAdsoyad' , 'ogrYas' , 'ogrDersSayisi' , 'islemler'];
dataSource:any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogreRef: MatDialogRef<OgrenciDialogComponent>;
fotodialogrRef: MatDialogRef<FotoyukleDialogComponent>;
ConfirmDialogreRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }

  OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d:Ogrenci[])=>{
      this.ogrenciler = d;
      this.dataSource= new MatTableDataSource(this.ogrenciler); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

Filtrele(e){
  var deger = e.target.value;
  this.dataSource.filter = deger.trim().toLowerCase();
  if(this.dataSource.paginator) {
this.dataSource.paginator.firstPage();
  }
}

Ekle() {
  var yeniKayıt: Ogrenci = new Ogrenci();
  this.dialogreRef = this.matDialog.open(OgrenciDialogComponent, {
    width: '400px',
    data: {
      kayit: yeniKayıt,
      islem: 'ekle'
    }
  });

this.dialogreRef.afterClosed().subscribe(d=> {
  if (d) {

  
  this.apiServis.OgrenciEkle(d).subscribe((s:Sonuc) => {
    this.alert.AlertUygula(s);
    if (s.islem) {
      this.OgrenciListele(); 
    }
});
}
});


}

Duzenle(kayit: Ogrenci){
  this.dialogreRef = this.matDialog.open(OgrenciDialogComponent, {
    width: '400px',
    data: {
      kayit: kayit,
      islem: 'duzenle'
    }
  });
  this.dialogreRef.afterClosed().subscribe(d=> {
    if (d) {
    kayit.ogrNo = d.ogrNo;
    kayit.ogrAdsoyad = d.ogrAdsoyad;
    kayit.ogrYas = d.ogrYas;

    this.apiServis.OgrenciDuzenle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
    });
  }

    });
}

Sil(kayit: Ogrenci){
this.ConfirmDialogreRef = this.matDialog.open(ConfirmDialogComponent,{
width: '500px'
});
this.ConfirmDialogreRef.componentInstance.dialogMesaj=kayit.ogrAdsoyad + "İsimli Öğrenci Silinecektir Onaylıyor musunuz ?"
this.ConfirmDialogreRef.afterClosed().subscribe(d => {
  if(d) {
    this.apiServis.OgrenciSil(kayit.ogrId).subscribe((s:Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.OgrenciListele();
      }
    });
  }
});

  }

  FotoGuncelle(kayit: Ogrenci) {
    this.fotodialogrRef = this.matDialog.open(FotoyukleDialogComponent, {
      width: '400px',
      data: kayit
    });

    this.fotodialogrRef.afterClosed().subscribe((d:OgrFoto) => {
      if (d) {
        d.ogrId = kayit.ogrId;
        this.apiServis.OgrFotoGuncelle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgrenciListele();
          }
        });
      }
    });

  }

}

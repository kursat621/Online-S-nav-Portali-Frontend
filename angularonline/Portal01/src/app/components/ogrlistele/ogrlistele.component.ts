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
import { OgrsecDialogComponent } from '../dialogs/ogrsec-dialog/ogrsec-dialog.component';

@Component({
  selector: 'app-ogrlistele',
  templateUrl: './ogrlistele.component.html',
  styleUrls: ['./ogrlistele.component.css']
})
export class OgrlisteleComponent implements OnInit {
dersId: string;
secDers: Ders;
kayitlar: Kayit[];
displayedColumns=['ogrFoto', 'ogrNo', 'ogrAdsoyad' , 'ogrYas' , 'ogrDersSayisi' , 'islemler'];
dataSource:any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
dialogRef: MatDialogRef<OgrsecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
  this.route.params.subscribe(p => {
    this.dersId = p['dersId'];
    this.DersById();
    this.KayitListele();
  });
  }

  KayitListele(){
    this.apiServis.DersOgrenciListe(this.dersId).subscribe((d:Kayit[])=>{
      this.kayitlar = d;
      this.dataSource= new MatTableDataSource(this.kayitlar); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  DersById(){
    this.apiServis.DersById(this.dersId).subscribe((d: Ders) => {
      this.secDers = d;
    });
  }

  Ekle(){
    this.dialogRef = this.matDialog.open(OgrsecDialogComponent, {
      width: '800px'
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitOgrId= d.ogrId;
        kayit.kayitDersId=this.dersId;

        this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        } );
      }
    });
  }

  Sil(kayit: Kayit) {
this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
  width: '500px',
});
this.confirmDialogRef.componentInstance.dialogMesaj=kayit.ogrBilgi.ogrAdsoyad + " İsimli Öğrenci Dersten Çıkarılacaktır, Onaylıyor musunuz?";
this.confirmDialogRef.afterClosed().subscribe(d=> {
  if (d) {
    this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    });
  }
});
  }

}

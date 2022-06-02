import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/alert-dialog/confirm-dialog/confirm-dialog.component';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
dersler: Ders[];
dataSource: any;
displayedColumns=['dersKodu', 'dersAdi', 'dersKredi', 'dersOgrSayisi', 'detay'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogreRef: MatDialogRef<DersDialogComponent>;
ConfirmDialogreRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
public apiServis: ApiService,
public alert: MyAlertService,
public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.DersListele();
  }
DersListele() {
this.apiServis.DersListe().subscribe((d:Ders[]) => {
  this.dersler = d;
  this.dataSource= new MatTableDataSource(d);
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
    var yeniKayıt: Ders = new Ders();
    this.dialogreRef = this.matDialog.open(DersDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayıt,
        islem: 'ekle'
      }
    });
    
    this.dialogreRef.afterClosed().subscribe(d=> {
      if (d) {
        this.apiServis.DersEkle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });

}

  Duzenle(kayit: Ders){
    this.dialogreRef = this.matDialog.open(DersDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogreRef.afterClosed().subscribe(d => {
      if (d) {
        d.dersId= kayit.dersId;
        this.apiServis.DersDuzenle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
    
  }

  Sil(kayit: Ders) {
    this.ConfirmDialogreRef = this.matDialog.open(ConfirmDialogComponent,{
      width: '500px'
      });
      this.ConfirmDialogreRef.componentInstance.dialogMesaj=kayit.dersAdi + "İsimli ders Silinecektir Onaylıyor musunuz ?";
      this.ConfirmDialogreRef.afterClosed().subscribe(d=> {
        if (d) {
          this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.DersListele();
            }
          });
        }
      });
  }
 
}

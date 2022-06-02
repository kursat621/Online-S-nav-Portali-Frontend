import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { FotoyukleDialogComponent } from '../../fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmDialogComponent } from '../alert-dialog/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ogrsec-dialog',
  templateUrl: './ogrsec-dialog.component.html',
  styleUrls: ['./ogrsec-dialog.component.css']
})
export class OgrsecDialogComponent implements OnInit {

  ogrenciler: Ogrenci[];
  displayedColumns=['ogrNo', 'ogrAdsoyad' , 'ogrYas' , 'ogrDersSayisi' , 'islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  fotodialogrRef: MatDialogRef<FotoyukleDialogComponent>;
  ConfirmDialogreRef: MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiServis: ApiService,
      public matDialog: MatDialog,
      public alert: MyAlertService,
      public dialogreRef: MatDialogRef<OgrenciDialogComponent>,
    ) { }

    ngOnInit() {
      this.OgrenciListele();
    }
  
    OgrenciListele(){
      this.apiServis.OgrenciListe().subscribe((d:Ogrenci[])=>{
        this.ogrenciler = d;
        this.dataSource= new MatTableDataSource (this.ogrenciler); 
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

  OgrenciSec(ogr:Ogrenci) { 
    this.dialogreRef.close(ogr)
  }

}

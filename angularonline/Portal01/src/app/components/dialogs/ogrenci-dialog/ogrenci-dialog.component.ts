import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css']
})
export class OgrenciDialogComponent implements OnInit {
dialogBaslik: string;
islem: string;
frm: FormGroup;
yeniKayit: Ogrenci;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit; 
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Öğrenci Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Öğrenci Düzenle"
    }
    this.frm = this.formOlustur();
  } 

  ngOnInit() {
  }

  formOlustur(){
    return this.frmBuild.group({
      ogrNo: [this.yeniKayit.ogrNo],
      ogrAdsoyad: [this.yeniKayit.ogrAdsoyad],
      ogrYas: [this.yeniKayit.ogrYas],

    });
  }

}

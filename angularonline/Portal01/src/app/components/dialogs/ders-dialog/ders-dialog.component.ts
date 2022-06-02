import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ders-dialog',
  templateUrl: './ders-dialog.component.html',
  styleUrls: ['./ders-dialog.component.css']
})
export class DersDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Ders;
    constructor(
      public apiServis: ApiService,
      public matDialog: MatDialog,
      public frmBuild: FormBuilder,
      public dialogRef: MatDialogRef<DersDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  
    ) { 
      this.islem = data.islem;
      this.yeniKayit = data.kayit; 
      if (this.islem == 'ekle') {
        this.dialogBaslik = "Ders Ekle"
      }
      if (this.islem == 'duzenle') {
        this.dialogBaslik = "Ders Düzenle"
      }
      this.frm = this.formOlustur();
    } 
  
    ngOnInit() {
    }
  
    formOlustur() {
      return this.frmBuild.group({
        dersKodu: [this.yeniKayit.dersKodu],
        dersAdi: [this.yeniKayit.dersAdi],
        dersKredi: [this.yeniKayit.dersKredi],
  
      });
    }

}

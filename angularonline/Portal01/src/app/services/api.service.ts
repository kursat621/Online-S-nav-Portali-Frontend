import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { Kayit } from '../models/kayit';
import { Ogrenci } from '../models/Ogrenci';
import { OgrFoto } from '../models/OgrFoto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl = "http://localhost:49500/api/";
siteUrl = "http://localhost:49500/";
constructor(
  public http: HttpClient
) { }

OgrenciListe() {
  return this.http.get(this.apiUrl + "ogrenciliste");
}

OgrenciById(ogrId: string) {
  return this.http.get(this.apiUrl + "ogrencibyid/" + ogrId);
}

OgrenciEkle(ogr: Ogrenci) {
  return this.http.post(this.apiUrl + "ogrenciekle", ogr);
}

OgrenciDuzenle(ogr: Ogrenci) {
  return this.http.put(this.apiUrl + "ogrenciduzenle", ogr);
}

OgrenciSil(ogrId: string) {
  return this.http.delete(this.apiUrl + "ogrfotogüncelle/" + ogrId);
}

OgrFotoGuncelle(ogrFoto: OgrFoto) {
  return this.http.post(this.apiUrl + "ogrenciekle", ogrFoto); 
}

DersListe() {
  return this.http.get(this.apiUrl + "dersliste");
}

DersById(dersId:string) {
  return this.http.get(this.apiUrl + "dersbyid/" + dersId);
}

DersEkle(ders: Ders) {
  return this.http.post(this.apiUrl + "dersekle", ders);
}

DersDuzenle(ders: Ders) {
  return this.http.put(this.apiUrl + "dersduzenle", ders);
}

DersSil(dersId:string) {
  return this.http.delete(this.apiUrl + "derssil/" + dersId);
}

OgrenciDersListe(ogrId: string) {
  return this.http.get(this.apiUrl + "ogrencidersliste/" + ogrId);
}

DersOgrenciListe(dersId: string) {
  return this.http.get(this.apiUrl + "dersogrenciliste/" + dersId);
}

KayitEkle(kayit: Kayit) {
  return this.http.post(this.apiUrl + "kayitekle", kayit);
}

KayitSil(kayitId:string) {
  return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
}


}

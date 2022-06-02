import { Ders } from "./Ders";
import { Ogrenci } from "./Ogrenci";

export class Kayit{
    kayitId: string;
    kayitDersId: string;
    kayitOgrId: string;
    ogrBilgi: Ogrenci;
    dersBilgi: Ders;
}
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseSerService {

  constructor(
    private firestore: AngularFirestore
  ) { }

    getVuelos(){
      return this.firestore.collection("vuelos").snapshotChanges();
    }

    createVuelo(vuelo:any){
      return this.firestore.collection("vuelos").add(vuelo);
    }
    
}

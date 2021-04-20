import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { FirebaseSerService } from "../../services/firebase-ser.service";


@Component({
  selector: 'app-secret-route',
  templateUrl: './secret-route.component.html',
  styleUrls: ['./secret-route.component.scss']
})
export class SecretRouteComponent implements OnInit {

  ocultarMostrarTabla = false;

  mostrarTablaXD() {
    this.ocultarMostrarTabla = false;
  }

  user = firebase.auth().currentUser;
  currentUserID = this.user.uid;

  constructor(
    public afAuth: AngularFireAuth,
    private firebaseSerService: FirebaseSerService
  ) { }

  title = 'ang-route-block';

  idReserv = "";
  config: any;
  collection = { count: 150, data: [] }

  ngOnInit(): void {

    console.log("Hola", this.user.displayName);


    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    //get vuelos2
    this.firebaseSerService.getVuelos().subscribe(resp => {
      /* resp.filter((e:any) => e.payload.doc.data().UserIdLog == this.currentUserID) */
      this.collection.data = resp.map((e: any) => {
        return {
          UserIdLog: e.payload.doc.data().UserIdLog,
          Origen: e.payload.doc.data().Origen,
          Destino: e.payload.doc.data().Destino,
          FechaSalida: e.payload.doc.data().FechaSalida,
          FechaRegreso: e.payload.doc.data().FechaRegreso,
          Redondo: e.payload.doc.data().Redondo,
          Sencillo: e.payload.doc.data().Sencillo,
        }
      })
    },
      error => {
        console.error(error);
      }
    );

  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseSerService } from "../../services/firebase-ser.service";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  //Logica para desactivar el regreso cuando el vuelo es sencillo.
  habilitarRegreso = false;

  user = firebase.auth().currentUser;  

  setStateRegreso(event: Event) {
    if ((<HTMLInputElement>event.target).value == "Sencillo") {
      this.habilitarRegreso = true;
    } else if ((<HTMLInputElement>event.target).value == "Redondo") {
      this.habilitarRegreso = false;
    }
  }

  //Desactivar Regreso V2
  desactivarRegreso(){
    this.habilitarRegreso = true;
  }
  activarRegreso(){
    this.habilitarRegreso = false;
  }

  //
  vueloForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private firebaseSerService: FirebaseSerService,
  ) { }

  config: any;
  collection = { count: 150, data: [] }
   
  ngOnInit(): void {

    console.log("ID: ", this.user.uid);

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.vueloForm = this.fb.group({
      UserIdLog: this.user.uid,
      Redondo: ['', Validators.required],
      Sencillo: ['', Validators.required],
      Origen: ['', Validators.required],
      Destino: ['', Validators.required],
      FechaSalida: ['', Validators.required],
      FechaRegreso: ['', Validators.required],
    })

    this.firebaseSerService.getVuelos().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
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

  crearVuelo(): void {
    this.firebaseSerService.createVuelo(this.vueloForm.value).then(resp => {
      alert('Reservación creada!');
      console.log("Vuelo creado");
      this.vueloForm.reset();
    }).catch(error => {
      console.error(error);
    })
  }

  /* crearVuelo2(): void {
    this.firebaseSerService.createVuelo2(this.vueloForm.value).then(resp => {
      console.log("Vuelo creado2");
      this.vueloForm.reset();
    }).catch(error => {
      console.error(error);
    })
  } */

  

}

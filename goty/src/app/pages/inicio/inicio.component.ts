import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { game } from '../../interfaces/interfaces';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos:game[] = [];
  constructor(private db: AngularFirestore) {

  }

  ngOnInit(): void {
    // utilizamos el operador map para crear un array que concuerde con la informacion del grafico NgxCharts name, value
     this.juegosFirebase()
         .pipe(map((dataGamer:game[]) => {
            return dataGamer.map((obj:game) => ({'name' : obj.name, 'value' : obj.votos }) );
          }))
         .subscribe((res:any) => {
           this.juegos = res
          });
  }

  juegosFirebase(){
    return this.db.collection('BDgoty').valueChanges();
  }

}

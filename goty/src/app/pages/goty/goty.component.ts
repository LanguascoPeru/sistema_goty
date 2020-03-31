import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { game } from '../../interfaces/interfaces';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos:game[] = [];

  constructor(private gameservice:GameService) { }

  ngOnInit(): void {
     this.gameservice.getNominados()
         .subscribe((data)=>{
           this.juegos = data;
         });
  }
  votarJuego(juego:game){
 
    this.gameservice.setvotar(juego.id)
        .subscribe((res:any)=>{

          if (res.ok==true) {
            Swal.fire({
              icon: 'success',
              title: 'Gracias por tu voto ' + juego.name,
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Sistemas',
              text: res.mensaje
            })
          }
        
        }, (err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        });
    
  }



}

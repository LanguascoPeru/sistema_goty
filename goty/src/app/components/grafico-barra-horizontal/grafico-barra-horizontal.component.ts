import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { single } from './data';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnInit {

 
  @Input() listaJuegos: any[] = []
 
 // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor( ) {    
    // this.intervalo = setInterval(()=>{
    //   console.log('entro')

    //   /// sirve para romper los resultados, sino ambos tuvieran los mismos valores y si cambia uno cambiaria el otro, eso no queremos
    //   const newResultados = [...this.resultados];

    //   for(let i in newResultados){
    //     newResultados[i].value = Math.round(Math.random() * 100);
    //   }

    //   this.resultados = [...newResultados]
 
    // }, 1500) 
  }
 
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void { 

  }

  onSelect(event) {

  }

}

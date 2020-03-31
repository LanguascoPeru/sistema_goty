import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { game } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games:game []= [];
  constructor(private http: HttpClient) { }


  getNominados(): Observable<game[]> {
  
    // validaciones para hacer la aplicacion sea mas rapida, como la informacion es la misma no es necesario volver a realizar la peticion varias vces porque es
    // casi estatica...
  
    if (this.games.length >0) {
     
      /// convierte cualquier objecto en un observable...
      return of(this.games)
      
    }else{
 
      return this.http.get<game[]>(environment.url + '/api/getGoty')
                .pipe(map((data:game[]) =>{
                    this.games = data;
                     return data;
                }));
    }

  }


  setvotar(id:string){
    return this.http.post(`${environment.url}/api/postGoty/${id}`, {})
               .pipe(catchError((e) => of(e.error)));
  }


}

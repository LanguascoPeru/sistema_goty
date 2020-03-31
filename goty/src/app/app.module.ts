import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// importar rutas
///---- RUTAS
import { APP_ROUTING } from './app.routes';
import { ComponentsModule } from './components/components.module';

///peticiones http
import { HttpClientModule } from '@angular/common/http';

//angular fire  inyecte los proveedores de Firebase y especifique su configuración de Firebase que esta en los enviaroment.
import { AngularFireModule } from '@angular/fire';

//también debe agregar módulos para los @NgModules individuales que su aplicación necesita
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment.prod';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GotyComponent,
 
  ],
  imports: [
    BrowserModule,
    APP_ROUTING, 
    ComponentsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

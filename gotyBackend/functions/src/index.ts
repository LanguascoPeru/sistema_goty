import * as functions from 'firebase-functions';
//// para trabajar de manera local con firebse 
import * as admin from 'firebase-admin';

/// para trabajar con express y hacer petiiciones rest
import * as express  from 'express';
const cors = require('cors');


const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-78adc.firebaseio.com"
});

/// hace la referencia a firestore a la base de datos, para hacer cualquier consulta
const db =  admin.firestore();



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.json('bienvenidos ');
});


export const getGoty =  functions.https.onRequest( async(req, resp) => {
    /// referencia a la coleccion
    const gotyRef  = db.collection('BDgoty');
    const docSnap  = await gotyRef.get();

    // recuperando informacion de nuestra coleccion
    const juegos  = docSnap.docs.map(doc=>{
        return doc.data()
    })   

    resp.json(juegos);
});


/// creando servidor express

const app = express();
app.use(cors({ origin:true }));

app.get('/getGoty',async(req, resp)=>{
        /// referencia a la coleccion
        const gotyRef  = db.collection('BDgoty');
        const docSnap  = await gotyRef.get();
    
        // recuperando informacion de nuestra coleccion
        const juegos  = docSnap.docs.map(doc=>{
            return doc.data()
        })   
    
        resp.json(juegos);
})

app.post('/postGoty/:id',async(req, resp)=>{
    /// referencia a la coleccion

    const idJuego= req.params.id;

    const gameRef = db.collection('BDgoty').doc(idJuego);
    const gameSnap = await gameRef.get();

    if(!gameSnap.exists){
        return resp.status(404).json({
            ok:false,
            mensaje: 'no existe el juego con el Id :' + idJuego
        })
    }else{        
        ///-- obtner la informacion actual del documento, validacion si no hay informacion creamos un objeto votos : 0
        const juegoAnterior = gameSnap.data() || {votos:0};

        //---referencia al documento de la bd para actualizarlo
        await gameRef.update({
            votos : juegoAnterior.votos + 1 
        });

        return resp.status(201).json({
            ok:true,
            mensaje: 'Gracias por votar por :' + juegoAnterior.name
        })

    }
 
})


//api = nombre del enpoint puede ser cualquira
export const api = functions.https.onRequest(app);








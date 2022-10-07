import express from "express"
import bcrypt from "bcrypt"
import stripe from "stripe"
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// configuracion de firebase
const firebaseConfig={
    apiKey: "AIzaSyADdBoSuadnTcuqIbUajrU24Mgh_EqlQ5I",
  authDomain: "demoecommerce-8876f.firebaseapp.com",
  projectId: "demoecommerce-8876f",
  storageBucket: "demoecommerce-8876f.appspot.com",
  messagingSenderId: "266235109710",
  appId: "1:266235109710:web:afa71f9be9e3b792927e1f"
}
const firebase=initializeApp(firebaseConfig);
const db=getFirestore()
const app=express()
//middleware
app.use(express.static('public'))
app.use(express.json())//permite compartir forms

//Rutas
//home
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'public'})
})
app.listen(3000,()=>{
    console.log('Servidor ejecutandose')
})

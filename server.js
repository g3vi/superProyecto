import express from "express"
import bcrypt from "bcrypt"
import stripe from "stripe"
import {initializeApp} from 'firebase/app'
import {getDoc, getFirestore, setDoc, collection, doc, updateDoc} from 'firebase/firestore'
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
// Ruta para registrar
app.get('/signup',(req,res) => {
    res.sendFile('signup.html',{root: 'public'})
})
app.post('/signup',(req,res) => {
    const { name, email, password, number, tac } = req.body
    console.log(req.body)
    // Validaciones
    if(name.length <3){
        res.json({ 'alert': 'name must be 3 letters long'})
    } else if (!email.length) {
        res.json({'alert': 'enter your email'})
    }else if (password.length < 8) {
        res.json({'alert': 'password must be 8 letters long'})
    }else if (!Number(number) || number.length < 10 ) {
        res.json({'alert': 'invalid number, please enter valid one'})
    }else if (!tac) {
        res.json({'alert': 'you must agree to our terms'})
    }else {
        // Almacenar datos en BD
        const users = collection(db,"users")
        getDoc(doc(users,email)).then(user => {
            if(user.exists()){
            res.json({'alert': 'email already exists'})
            }else {
                //encriptar password
                bcrypt.genSalt(10,(err,salt)=> {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash
                        req.body.seller = false
                        setDoc(doc(users, email), req.body).then(data =>{
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller
                            })
                        })
                    })
                })
            }
        })
    }
})
// Ruta Login
app.get('/login',(req,res) => {
    res.sendFile('login.html',{root: 'public'})
})
app.post('/login',(req,res) => {
    let { email, password } = req.body
    console.log('login', email,password)
    if ( !email.length || !password.length){
        return res.json({
            'alert': 'fill all the inputs'
        })
    }   
    const users = collection(db, 'users')
    getDoc(doc(users, email))
        .then( user => {
            if(!user.exists()) {
                return res.json({
                    'alert': 'fill all the inputs'
                })
            }else {
                bcrypt.compare(password,user.data().password,(err,result) => {
                    if (result) {
                        let data = user.data()
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller
                        })
                    } else {
                        return res.json({'alert': 'incorrect password'})
                }
            })
        }
    })
})

// Ruta Seller
app.get('/seller', (req,res) => {
    res.sendFile('seller.html',{ root: 'public'})
})
app.post('/seller', (req,res) => {
    let { name, address, about, number, email } = req.body
    if (!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
        return res.json({
            'alert': 'somethitng was wrong'
        })
    } else {
        // update seller
        const sellers = collection(db, "sellers")
        setDoc(doc(sellers, email), req.body)
        .then(data => {
            const users = collection(db, "users")
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json( {
                    'seller': true
                })
            })
        })
    }
})
app.listen(3000,()=>{
    console.log('Servidor ejecutandose')
})

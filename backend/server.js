import express from 'express';
import bodyParser from 'body-parser'; //Obrigatorio
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import dotenv from 'dotenv';
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signIn.js';
import { handleProfile } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';



dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DB_URL,
      ssl: {rejectUnauthorized: false},
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME //erro deploy
    },
});

const app = express();

app.use(bodyParser.json()); // Obrigatorio
app.use(cors());


app.get('/', (req, res) => {res.send('it is working')}) //erro deploy

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db)});

//User App Images uploaded counter

app.put('/image', (req, res) => { handleImage(req, res, db)});

app.post('/imageurl', (req, res) => { handleApiCall(req, res) });


// Password encripting 



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.listen(3000, () => {console.log('app is running on port 3000');})

/* 
/ --> res = this is working,
/signin --> POST = success or fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
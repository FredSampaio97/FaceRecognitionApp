import express from 'express';
import bodyParser from 'body-parser'; //Obrigatorio
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'Fedrico8681',
      database: 'faceRecognitionApp',
    },
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json()); // Obrigatorio
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: '12345',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Fred',
            email: 'fred@gmail.com',
            password: '12345',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gamil.com'
        }
    ]
}


app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else {
        res.status(400).json('error loggin in');
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    }); // Password hash creation
    db('users').returning('*').insert({
        email: email,
        name: name,
        joined: new Date()
    })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('Unable to register!')); //Em caso de erro
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id){
            found = true;
            return res.json(users);
        } 
    })
    if(!found) {
        res.status(400).json('Not found!');
    }
})

//User App Images uploaded counter

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id){
            found = true;
            users.entries++;
            return res.json(users.entries);
        } 
    })
    if(!found) {
        res.status(400).json('Not found!');
    }
})


// Password encripting 



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });




app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/* 
/ --> res = this is working,
/signin --> POST = success or fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
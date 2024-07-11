export const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json('incorrect form submission!');
    }
    db.select('email', 'hash').from('login') // Get the 'email' and its 'hash' from 'login' table
    .where('email', '=', email) // where the db 'email' is equal to the written 'email'
    .then(data =>{
        const isValid = bcrypt.compareSync(password, data[0].hash); // Compare the written password with the hash provided by the db
        if(isValid){
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    console.log(user[0]);
                    res.json(user[0]);
                }) 
                .catch(err => res.status(400).json('unable to get user')) 
        } else {
            res.status(400).json('Wrong credentials');

        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}
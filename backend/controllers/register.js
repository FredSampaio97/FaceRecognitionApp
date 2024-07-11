export const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission!');
    }
    
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
            return res.status(500).json('Error hashing password');
        }

        console.log(hash);

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err => res.status(400).json('Unable to register!')); //Em caso de erro    
    }); // Password hash creation
} 


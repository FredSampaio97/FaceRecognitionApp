export const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'incorrect form submission' });
    }
    db.select('email', 'hash').from('login') // Get the 'email' and its 'hash' from 'login' table
        .where('email', '=', email) // where the db 'email' is equal to the written 'email'
        .then(data => {
            if (data.length) {
                const isValid = bcrypt.compareSync(password, data[0].hash); // Compare the written password with the hash provided by the db
                if (isValid) {
                    return db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            console.log('User found:', user[0]);
                            res.json(user[0]);
                        })
                        .catch(err => res.status(400).json({ error: 'unable to get user' }));
                } else {
                    res.status(400).json({ error: 'wrong credentials' });
                }
            } else {
                res.status(400).json({ error: 'wrong credentials' });
            }
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(400).json({ error: 'wrong credentials' });
        });
}

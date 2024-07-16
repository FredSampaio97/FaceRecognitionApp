app.post('/signin', (req, res) => {
    handleSignIn(req, res, db, bcrypt)
    .catch(err => res.status(400).json({ error: 'Unable to sign in' }));
});

// In handleSignIn function
export const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'incorrect form submission!' });
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    console.log(user[0]);
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json({ error: 'unable to get user' }));
        } else {
            res.status(400).json({ error: 'Wrong credentials' });
        }
    })
    .catch(err => res.status(400).json({ error: 'Wrong credentials' }));
}

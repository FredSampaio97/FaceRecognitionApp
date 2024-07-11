export const handleProfile = (res, req, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0])
        }else {
            res.status(400).json('Not found!')
        }
    })
    .catch(err => res.status(400).json('User not found!'));
    // if(!found) {
    //     res.status(400).json('Not found!');
    // }
} 
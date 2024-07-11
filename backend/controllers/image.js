import fetch from 'node-fetch';

export const handleImage = (req, res, db) =>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get count')) 
}

export const handleApiCall = (req, res) => {
    const { input } = req.body;

    const PAT = '4daa5e1d7b1942ce8d916d2a908d8bd0';
    const USER_ID = 'fredr6';
    const APP_ID = 'smart-face';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'));
}
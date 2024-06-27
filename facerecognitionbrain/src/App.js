// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';

//OLD

// const app = new returnClarifaiRequest.App({
//   apiKey: '4daa5e1d7b1942ce8d916d2a908d8bd0'
// });


const returnClarifaiRequest = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '4daa5e1d7b1942ce8d916d2a908d8bd0';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'fredr6';
  const APP_ID = 'smart-face';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
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

  return requestOptions;
}







function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('https://samples.clarifai.com/face-det.jpg');
  const [box, setBox] = useState('');
  const [route, setRout] = useState('signin');
  const [isSignedIn, setSign] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  });

  
  
  
  

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      // password: data.password,
      entries: data.entries,
      joined: data.joined
    });
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequest(input))
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch('http://localhost:3000/image', {
                method:'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: user.id
              }) 
            })
              .then(response => response.json())
              .then(count => {
                setUser(Object.assign({}, user, { entries: count }));
              })
            displayFaceBox(calculateFaceLocation(response))
          }
        } 
      ) 
        .catch(err => console.log(err));
  }
  const onRouteChange = (route) => {
    if(route === 'signout') {
      setSign(false);
    }else if(route === 'home') {
      setSign(true);
    }
    setRout(route);
  }
 
 
  return (
    <div className="App">
      <ParticlesBg className="particles" color="FFFFFF" num={500} type="cobweb" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ? <div>
            <Logo />
            <Rank  name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div> 
         : (
            route === 'signin'
            ? <div>
                <Logo />
                <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
              </div>
            : <div>
                <Logo />
                <Register onRouteChange={onRouteChange} loadUser={loadUser} />
              </div>
         ) 
          
        
      }
      
      
    </div>
  );
}

export default App;

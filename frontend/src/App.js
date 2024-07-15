// import logo from './logo.svg';
import React, {useState} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';



function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('https://samples.clarifai.com/face-det.jpg');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  });

  const resetInput = () => {
      setInput('');
      setImageUrl('');
      setBoxes([]);
  }
  

  const calculateFaceLocations = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
    });
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

  const displayFaceBoxes = (boxes) => {
    setBoxes(boxes);
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch('https://facerecognitionapp-tv2a.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://facerecognitionapp-tv2a.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(Object.assign({}, user, { entries: count }));
            })
          displayFaceBoxes(calculateFaceLocations(response))
        }
      })
      .catch(err => console.log(err));
  }
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      resetInput();
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
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
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
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

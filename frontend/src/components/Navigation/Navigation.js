import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f2 ph2 link dim black underline  pointer'> Sign Out </p>
            </nav>
        );
    }else {
        return(
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 ph2 link dim black underline  pointer'> Sign In </p>
                <p onClick={() => onRouteChange('register')} className='f2 ph2 link dim black underline  pointer'> Register </p>
            </nav>
        );
    }
    
    
}

export default Navigation;
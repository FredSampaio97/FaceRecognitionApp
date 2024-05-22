import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo =  () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-1' style={{ height: '300px', width: '300px'}}>
                <div className='pa3 logobackground'>
                    <img alt='Logo' src={brain}/>
                </div>
            </Tilt>  
        </div>
    );
}

export default Logo;
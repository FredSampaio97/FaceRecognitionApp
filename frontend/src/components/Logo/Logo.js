import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo =  () => {
    return(
        <div className='ma6 mt0'>
            <Tilt className='br2 shadow-1' style={{ height: '200px', width: '200px'}}>
                <div className=' logobackground'>
                    <img alt='Logo' src={brain}/>
                </div>
            </Tilt>  
        </div>
    );
}

export default Logo;
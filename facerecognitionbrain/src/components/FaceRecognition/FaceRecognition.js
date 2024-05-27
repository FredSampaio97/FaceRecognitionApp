import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='imgFaceSize absolute mt2'>
                <img alt='' src={imageUrl} className='' />
            </div>
        </div>
    );
}

export default FaceRecognition;
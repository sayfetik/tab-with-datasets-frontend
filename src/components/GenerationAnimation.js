import React from 'react';
import loadingGif from '../img/loading.gif';

const GenerationAnimation = () => {
return (
    <div>
        <img src={loadingGif} alt="Loading..." style={{ width: '30px', height: '30px' }} />
        {/*<p className='generationText'>Генерация...</p>*/}
    </div>
)
};

export default GenerationAnimation;

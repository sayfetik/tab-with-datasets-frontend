import React from 'react';
import checkGreen from '../../img/checkGreen.png';
import xRed from '../../img/xRed.png';
import './ProccessStages.css';

const ProcessStages = ({ isBase }) => {
  return (
    <div>
        {isBase ?
        <div>
            <div className='row editProcces'>
              <img src={checkGreen} className='iconCompletedProcess' alt=''/>
              <p className='completedProcess'>удаление персональных данных</p>
            </div>
            <div className='row editProcces'>
              <img src={xRed} className='iconCompletedProcess' alt=''/>
              <p className='noProcess'>устранение пустых значений</p>
            </div>
            <div className='row editProcces'>
              <img src={xRed} className='iconCompletedProcess' alt=''/>
              <p className='noProcess'>устранение статистических отклонений</p>
            </div>
        </div>
        :
        <div>
            <div className='row editProcces'>
              <img src={checkGreen} className='iconCompletedProcess' alt=''/>
              <p className='completedProcess'>удаление персональных данных</p>
            </div>
            <div className='row editProcces'>
              <img src={checkGreen} className='iconCompletedProcess' alt=''/>
              <p className='completedProcess'>устранение пустых значений</p>
            </div>
            <div className='row editProcces'>
              <img src={checkGreen} className='iconCompletedProcess' alt=''/>
              <p className='completedProcess'>устранение статистических отклонений</p>
            </div>
        </div>
}
    </div>
  );
}

export default ProcessStages;

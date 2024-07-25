import React from 'react'
import { Header, Back } from '../../components'
import './UnsuccessUpload.css'
import { useNavigate } from 'react-router-dom'; 

const UnsuccessUpload = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
        return (
            <div>
                <Header />
                <div id='unsuccessUpload'>
                    <Back />
                    <div id='mainSectionUnsuccess'>
                        <h1>Произошла ошибка</h1>
                        <button id='repeatUpload' onClick={goBack}>Повторить загрузку датасета</button>
                        <button id='onMain' onClick={()=>{navigate('/')}}>На главную</button>
                    </div>
                </div>
            </div>
        ) 
}

export default UnsuccessUpload
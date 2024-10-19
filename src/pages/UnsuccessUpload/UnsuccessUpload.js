import React , {useEffect} from 'react'
import { Header, Back } from '../../components'
import './UnsuccessUpload.css'
import { useNavigate } from 'react-router-dom'; 

const UnsuccessUpload = () => {
    useEffect(() => {
        document.title = `Датасеты: Ошибка`;
      }, []);
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
                        <button className='blueButton' onClick={goBack}>Повторить загрузку датасета</button>
                        <button className='lightBlueButton' onClick={()=>{navigate('/')}}>На главную</button>
                    </div>
                </div>
            </div>
        ) 
}

export default UnsuccessUpload
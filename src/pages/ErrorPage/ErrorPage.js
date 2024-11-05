import React , {useEffect} from 'react'
import { Header, Back } from '../../components'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'; 

const ErrorPage = () => {
    useEffect(() => {
        document.title = `Датасеты: Ошибка`;
      }, []);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-2);
    };
        return (
            <div>
                <div id='unsuccessUpload'>
                    <div id='mainSectionUnsuccess'>
                        <h2>Произошла ошибка. Повторите попытку позже</h2>
                        <div className='row'>
                            <button className='lightBlueButton' onClick={goBack}>Назад</button>
                            <button className='blueButton' onClick={()=>{navigate('/')}}>На главную</button>
                        </div>
                    </div>
                </div>
            </div>
        ) 
}

export default ErrorPage
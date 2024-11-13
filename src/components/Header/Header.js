import React from 'react'

import { EducationLogo } from './EducationLogo'
import { ProfileSection } from './Profile'

import './Header.css'

const Header = () => {
  return (
    <>
      <div className='headerContainer'>
        <EducationLogo />
     <div className='productButtons'>{/*
          <div className={styles.productButton}>Портал</div>
          <div className={styles.productButton}>Ассесмент</div>
          <div className={styles.productButton}>Курсы</div>
          <div className={styles.productButton}>Обр. программы</div>
          <div className={styles.productButton}>Каталог ПО</div>
          <div className={styles.productButton}>Аналитика</div>
          <div className={styles.productButton}>Робокод</div>
          <div className={styles.productButton}>Клуб</div>
          <div className={styles.productButton}>InnoDataHub</div> */}
        </div>
        <ProfileSection />
        </div>
      <div id='warningNotification'>Сервис работает только из сети UniversityStaff, AOInnopolis. Мы работаем над тем, чтобы он был доступен из всех сетей!</div>
    </>
  )
}

export default Header
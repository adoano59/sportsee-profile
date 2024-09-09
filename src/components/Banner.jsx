import React from 'react'
import "../styles/banner.css"
import { faPersonRunning, faPersonSwimming, faPersonBiking, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import IconMenu from './Icone';
function Banner({ className }) {
  return (
    <div className={`${className}`}>
      {className === 'banner' ? (
        <>
          <img src='src/images/logo.png' alt='logo' className="banner-logo" />
          <a href="">Accueil</a>
          <a href="">Profil</a>
          <a href="">Réglage</a>
          <a href="">Communauté</a>
        </>
      ) : (
        <><div className='menuVerticalContent'>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonRunning} />   </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonSwimming} />   </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonBiking} /> </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faDumbbell} />   </div></a>
        </div>
          <div>
            <p>Copiryght, SportSee 2020</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
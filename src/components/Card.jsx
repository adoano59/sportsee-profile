import React from 'react'
import "../styles/card.css"
import { faFire, faDrumstickBite, faAppleWhole, faBurger } from '@fortawesome/free-solid-svg-icons';
import IconMenu from './Icone';
function Card({ className }) {
    return (
      <div>
         
          <><div className='menuRight'>
          <a href=""><div className='cardNav fire'> <IconMenu icon={faFire} className='test'/>   </div></a>
          <a href=""><div className='cardNav chiken'> <IconMenu icon={faDrumstickBite} />   </div></a>
          <a href=""><div className='cardNav apple'> <IconMenu icon={faAppleWhole} /> </div></a>
          <a href=""><div className='cardNav burger'> <IconMenu icon={faBurger}/>   </div></a>
          </div>
           
          </>
          </div>
    );
  }
  
  export default Card;
import React from 'react'
import "../styles/card.css"
import { faPersonRunning, faPersonSwimming, faPersonBiking, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import IconMenu from './Icone';
function Card({ className }) {
    return (
      <div>
         
          <><div className='menuVerticalContent'>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonRunning} />   </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonSwimming} />   </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faPersonBiking} /> </div></a>
          <a href=""><div className='cardNavLeft'> <IconMenu icon={faDumbbell} />   </div></a>
          </div>
           
          </>
          </div>
    );
  }
  
  export default Card;
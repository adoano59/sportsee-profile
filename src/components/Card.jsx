import React, { useEffect, useState } from 'react'
import "../styles/card.css"
import { faFire, faDrumstickBite, faAppleWhole, faBurger } from '@fortawesome/free-solid-svg-icons';
import IconMenu from './Icone';
function Card() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/12');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
    return (
      <div>
         
          <><div className='menuRight'>
          <a href=""><div className='boxCard'><div className='cardNav fire'> <IconMenu icon={faFire}  /> </div><div> <span className='textData'>{data.data.keyData?.calorieCount  || 0} kcal</span> <div><span className='nameData'> Calories</span></div></div></div></a>
          <a href=""><div className='boxCard'><div className='cardNav chiken'> <IconMenu icon={faDrumstickBite} /></div><div><span className='textData'>{data.data.keyData?.proteinCount  || 0} g</span> <div><span className='nameData'> Proteines</span></div></div></div></a>
          <a href=""><div className='boxCard'><div className='cardNav apple'> <IconMenu icon={faAppleWhole} /></div><div> <span className='textData'>{data.data.keyData?.carbohydrateCount  || 0} g</span><div><span className='nameData'> Glucides</span></div></div></div></a>
          <a href=""><div className='boxCard'><div className='cardNav burger'> <IconMenu icon={faBurger}/> </div><div> <span className='textData'>{data.data.keyData?.lipidCount || 0} g</span> <div><span className='nameData'> Lipides</span></div></div></div></a>
          </div>
           
          </>
          </div>
    );
  }
  
  export default Card;
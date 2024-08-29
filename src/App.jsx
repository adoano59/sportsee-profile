import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import DataFetcher from './components/DataFetcher'
import Card from './components/Card'
import Chart from './components/Chart'
import ActivityChart from './components/BarChart'
import PerformanceChart from './components/RadarChart'
import TodayScore from './components/TodayScore'
import { useParams, Link } from 'react-router-dom'

function App() {
  let{userid} = useParams()
if (userid==null){
  return(<div>
   choisir un utilisateur  
   <Link to = {`/12`} >
   12
   </Link>
   <Link to = {`/18`} >
   18
   </Link>
  </div>)
} 
  return (
    <>
      <Banner className="banner" />
      <Banner className="vertical-banner" />
      <div className='boxContent1'>
      <DataFetcher userid={userid} />
      </div>
      <div className='boxContent'>
      
      <div className='boxContent2'>
       
        <ActivityChart userid={userid}/>
        <div className='boxContent3'>
       <div className='box1'> <Chart userid={userid}/></div>
       <div className='box2'><PerformanceChart userid={userid}/></div>
       <div className='box3'><TodayScore userid={userid}/></div>
    
        </div>
      </div>
      <div className='boxContent4'>
      <Card userid={userid}/>
      </div>
      </div>
     
      
      
    </>
  )
}

export default App

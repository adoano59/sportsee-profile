import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import DataFetcher from './components/DataFetcher'
import Card from './components/Card'
import Chart from './components/Chart'
import ActivityChart from './components/BarChart'
import PerformanceChart from './components/RadarChart'
import TodayScore from './components/TodayScore'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Banner className="banner" />
      <Banner className="vertical-banner" />
      <div className='boxContent1'>
      <DataFetcher />
      </div>
      <div className='boxContent'>
      
      <div className='boxContent2'>
       
        <ActivityChart />
        <div className='boxContent3'>
       <div className='box1'> <Chart /></div>
       <div className='box2'><PerformanceChart /></div>
       <div className='box3'><TodayScore /></div>
    
        </div>
      </div>
      <div className='boxContent4'>
      <Card />
      </div>
      </div>
     
      
      
    </>
  )
}

export default App

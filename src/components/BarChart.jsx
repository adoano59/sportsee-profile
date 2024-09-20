
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getActivity } from '../services/api';
import modelisation from '../models/model1';
import "../App.css"

const ActivityChart = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getActivity(props.userid);
         // Utilisation de la fonction de modelisation pour transformer les données
         const chartData = modelisation(responseData, 'ActivityChart');
        
         // Mise à jour de l'état avec les données transformées
         setData(chartData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ backgroundColor: '#FBFBFB' }}>
      <div className='title'>
        <p>Activité quotidienne</p>

        <BarChart
          width={853}
          height={320}
          data={data.data.sessions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Legend verticalAlign="top" align="right" iconType="circle" formatter={(value) => <span style={{ color: '#74798C' }}>{value}</span>} />
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis dataKey="day" tickLine={false} tickFormatter={(value, index) => index + 1} />
          <YAxis orientation='right' />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                return (<div style={{ backgroundColor: 'red', color: '#fff', padding: '5px', borderRadius: '5px' }}>
                  <div className='valueTooltip'>{payload[0].value}kg</div>
                  <div className='valueTooltip'>{payload[1].value}kcal</div>

                </div>
                );
              }
              return null;
            }} />
          <Bar dataKey="kilogram" name="Poids (kg)" fill="black" barSize={7} activeBar={<Rectangle fill="black" stroke="black" />} />
          <Bar dataKey="calories" name="Calories brûlées (kCal)" barSize={7} fill="red" activeBar={<Rectangle fill="red" stroke="red" />} />
        </BarChart>
      </div>
    </div>
  );
}
export default ActivityChart;
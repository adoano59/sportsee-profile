import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ActivityChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/12/activity');
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
      
      <Legend verticalAlign="top" align="right" iconType="circle" formatter={(value) => <span style={{ color: '#74798C' }}>{value}</span>}/>
      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
      <XAxis dataKey="day" tickLine={false} tickFormatter={(value, index) => index + 1} />
      <YAxis orientation='right'/>
      <Tooltip />
      <Bar dataKey="kilogram" name="Poids (kg)" fill="black"  barSize={7} activeBar={<Rectangle fill="black" stroke="black" />} />
      <Bar dataKey="calories" name="Calories brûlées (kCal)" barSize={7} fill="red" activeBar={<Rectangle fill="red" stroke="red" />} />
    </BarChart>
    </div>
    );
  }
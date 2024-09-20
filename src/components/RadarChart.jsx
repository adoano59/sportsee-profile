
import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getPerformance } from '../services/api';
import modelisation from '../models/model1';

const PerformanceChart = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getPerformance(props.userid);
         // Utilisation de la fonction de modelisation pour transformer les données
         const chartData = modelisation(responseData, 'PerformanceChart');
        
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
    <RadarChart
      width={283}
      height={263}
      data={data.data.data}
      margin={{
        top: 5,
        right: 50,
        left: 20,
        bottom: 5,
      }}>
      <PolarGrid radialLines={false} />
      <PolarAngleAxis dataKey="kind" />
      <PolarRadiusAxis tick={false} axisLine={false} />
      <Radar name="radar" dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
    </RadarChart>
  );
}
export default PerformanceChart;
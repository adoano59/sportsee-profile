import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getPerformance } from '../services/api';

const PerformanceChart = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformance(props.userid);
        data.data.data.map((e) => e.kind = data.data.kind[e.kind])
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
          <PolarGrid radialLines={false}/>
          <PolarAngleAxis dataKey="kind" />
          <PolarRadiusAxis tick={false} axisLine={false}/>
          <Radar name="radar"  dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
        </RadarChart>
    );
  }
export default PerformanceChart;
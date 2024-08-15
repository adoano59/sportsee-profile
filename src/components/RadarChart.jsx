import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function PerformanceChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/12/performance');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
      height={263} data={data.data.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" />
          <PolarRadiusAxis />
          <Radar name="radar"  dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
        </RadarChart>
    );
  }
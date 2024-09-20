
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Rectangle } from 'recharts';
import { getAverageSession } from '../services/api';
import modelisation from '../models/model1';
const CustomLegend = () => {
  return <span style={{ color: '#FFFFFF' }}>Durée moyenne des sessions</span>;
};
const CustomCursor = (props) => {
  const { points, width, height } = props;
  const { x, y } = points[0];
  return (
    <Rectangle
      fill="#470101"
      stroke="#470101"
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};
const Chart = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAverageSession(props.userid);
        // Utilisation de la fonction de modelisation pour transformer les données
        const chartData = modelisation(responseData, 'Chart');
        
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
    <LineChart
      width={283}
      height={263}
      data={data.data.sessions}
      margin={{
        top: 5,
        right: 50,
        left: 30,
        bottom: 5,
      }}
    >
      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#FFFFFF' }} />
      <YAxis hide={true} padding={{ top: 40, bottom: 10 }} />
      <Legend
        wrapperStyle={{ marginTop: '75px' }}
        verticalAlign="top"
        align="left"
        content={<CustomLegend />}
      />
      <Tooltip
        content={({ payload }) => {
          if (payload && payload.length) {
            return (
              <div style={{ backgroundColor: '#fff', color: '#000', padding: '5px', borderRadius: '5px' }}>
                {payload[0].value}
              </div>
            );
          }
          return null;
        }}
        wrapperStyle={{ outline: 'none' }}  // Supprime les bordures du Tooltip
        cursor={<CustomCursor />}
      />
      <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
export default Chart;
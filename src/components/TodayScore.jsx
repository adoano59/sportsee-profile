
import React, { useEffect, useState } from 'react'; 
import modelisation from '../models/model1';
import { PieChart, Pie, Sector } from 'recharts';
import { getTodayScore } from '../services/api';

const TodayScores = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel de l'API pour récupérer les données utilisateur
        const responseData = await getTodayScore(props.userid);
        
        // Utilisation de la fonction de modelisation pour transformer les données
        const chartData = modelisation(responseData, 'TodayScore');
        
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
      <PieChart width={283} height={263}>
        <Pie
          activeIndex={0}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          fill="white"
          startAngle={90}
          dataKey="value"
        />
      </PieChart>
    </div>
  );
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, value } = props;
  const cos = Math.cos(-RADIAN * midAngle);
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill="black" fontSize="26" fontWeight="bold">
        {value}%
      </text>
      <text x={cx} y={cy} dy={25} textAnchor="middle" fill="grey" fontSize="16">
        de votre objectif
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="red"
        cornerRadius={100}
      />
      <text x={90} y={40} textAnchor={textAnchor} fill="#20253A">
        Score
      </text>
    </g>
  );
};

export default TodayScores;

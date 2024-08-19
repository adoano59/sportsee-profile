import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

function TodayScores() {
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
        const jsonData = await response.json();
        const todayScore = jsonData.data.todayScore;
        const value = todayScore * 100;
        const chartData = [
          { name: 'Score', value: value },
          { name: 'AntiScore', value: 100 - value }
        ];
        setData(chartData);
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
  );
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, value } = props;
  const cos = Math.cos(-RADIAN * midAngle);
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill="black">
        {value}%
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="black">
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

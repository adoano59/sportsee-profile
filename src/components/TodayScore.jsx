import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '50+',
    uv: 6.67,
    pv: 4800,
    fill: '#FFFFFF',
  },
  {
    name: 'unknow',
    uv: 2.63,
    pv: 4800,
    fill: '#FF0000',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

export default function TodayScore() {
 
    return (
      <ResponsiveContainer width={283}
      height={263}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    );
  }


import React from 'react';
import { Cell,BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const TaskBarChart = ({ total, completed, pending }) => {
  const data = [
    { name: 'Total', value: total },
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];

  const colors = ['#82ca9d', '#ffc658', '#ff7f50'];

  return (
    <div className="w-full h-100 bg-white/30 backdrop-blur-md p-8 shadow-md rounded-xl border-1 border-cyan-300">
      <h3 className="text-xl font-semibold">📊 Task Summary</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip/>
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
    
  ))}
</Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskBarChart;

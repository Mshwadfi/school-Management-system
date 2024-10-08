"use client";
import Image from 'next/image';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Jan',
      income: 4000,
      expense: 5000,
    },
    {
      name: 'Feb',
      income: 3000,
      expense: 4500,
    },
    {
      name: 'Mar',
      income: 3500,
      expense: 4000,
    },
    {
      name: 'Apr',
      income: 6000,
      expense: 3000,
    },
    {
      name: 'May',
      income: 6500,
      expense: 3500,
    },
    {
      name: 'Jun',
      income: 7000,
      expense: 5000,
    },
    {
      name: 'Jul',
      income: 7200,
      expense: 5200,
    },
    {
      name: 'Aug',
      income: 8000,
      expense: 5500,
    },
    {
      name: 'Sep',
      income: 8200,
      expense: 5700,
    },
    {
      name: 'Oct',
      income: 8400,
      expense: 5900,
    },
    {
      name: 'Nov',
      income: 8600,
      expense: 6000,
    },
    {
      name: 'Dec',
      income: 9000,
      expense: 6500,
    },
  ];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Finance Report</h1>
        <Image src="/moreDark.png" alt="More Options" width={20} height={20} />
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={data}
            margin={{
              top: 20, 
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* Add gridlines for better visual separation */}
            <CartesianGrid strokeDasharray="3 2" />
            {/* X and Y axis */}
            <XAxis dataKey="name" 
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
            />
            <YAxis
             label={{ value: '', angle: -90, position: 'insideLeft' }} 
             axisLine={false}
             tick={{ fill: "#d1d5db" }}
             tickLine={false}
             tickMargin={10}
             />
            {/* Tooltip and Legend */}
            <Tooltip />
            <Legend verticalAlign="top" height={36} /> {/* Legend moved to top */}
            {/* Income and Expense lines */}
            <Line type="monotone" dataKey="income" stroke="rgb(195 235 250 / var(--tw-bg-opacity)" activeDot={{ r: 8 }} name="Income" />
            <Line type="monotone" dataKey="expense" stroke="rgb(250 226 124 / var(--tw-bg-opacity)" name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;

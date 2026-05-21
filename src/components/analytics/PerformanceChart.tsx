"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    quiz: string;
    score: number;
  }[];
}

const PerformanceChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      
      <h2 className="mb-6 text-2xl font-black text-white">
        Performance Analytics 📊
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            
            <XAxis dataKey="quiz" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#a855f7"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
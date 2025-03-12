import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

interface PieChartProps {
  data: ChartData[];
}

export default function Chart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={2}
          animationBegin={0}
          animationDuration={2000}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              style={{
                filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

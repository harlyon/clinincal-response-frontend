import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: number[];
}

export const ClinicalChart = ({ data }: ChartProps) => {
  // Transform array [50, 48, ...] into object array for Recharts
  const chartData = data.map((val, index) => ({
    day: `Day ${index}`,
    value: val,
    // Add a synthetic "Ideal Responder" curve for comparison (20% decay reference)
    target: data[0] * Math.pow(0.85, index),
  }));

  return (
    <div className="h-64 w-full bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4">
        Biomarker Trajectory (0-5 Days)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
          {/* The Patient's Actual Data */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            name="Patient Vitals"
          />
          {/* The Reference "Ideal" Curve */}
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Target Response"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

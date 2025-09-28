import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DaysSelector from "../../../components/DaysSelector";
import { useMemo, useState } from "react";
import { generateTrafficData } from "../../../utils/random";

const DashboardTrend: React.FC = () => {
  const [days, setDays] = useState<number>(7);

  const data = useMemo(() => generateTrafficData(days), [days]);

  return (
    <div className="dashboard-trend block-bg">
      <div className="dashboard-trend__header">
        <div className="dashboard-trend__title">Trend</div>
        <DaysSelector days={days} setDays={setDays} options={[7, 14, 30]} />
      </div>
      <ResponsiveContainer className="dashboard-trend__rechart-container">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${value} TB`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="TB"
            stroke="#8884d8"
            fill="url(#colorTraffic)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardTrend;

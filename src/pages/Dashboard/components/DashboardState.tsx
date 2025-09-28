import { Pie, PieChart } from "recharts";
import type { Server } from "../../../store/types/serversTypes";
import { useMemo } from "react";

interface DashboardStateProps {
  servers: Server[];
}

interface ChartDataItem {
  name: "Running" | "Stopped";
  value: number;
  fill: string;
  [key: string]: string | number;
}

const DashboardState: React.FC<DashboardStateProps> = ({ servers }) => {
  const chartData: ChartDataItem[] = useMemo(() => {
    const counts = servers.reduce<Record<string, number>>((acc, s) => {
      acc[s.state] = (acc[s.state] || 0) + 1;
      return acc;
    }, {});
    return [
      { name: "Running", value: counts.Running || 0, fill: "#459E74" },
      { name: "Stopped", value: counts.Stopped || 0, fill: "#DC3545" },
    ];
  }, [servers]);

  return (
    <div className="dashboard-state block-bg">
      <div className="dashboard-state__title">State</div>
      <div className="dashboard-state__body">
        <PieChart width={180} height={180}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-6px" fontSize="40" fontWeight="bold">
              {servers.length}
            </tspan>
            <tspan x="50%" dy="26px" fontSize="12">
              Total number
            </tspan>
          </text>
        </PieChart>
        <div className="dashboard-state__right">
          {chartData.map((entry) => (
            <div key={entry.name} className="dashboard-state__item">
              <span
                className={`dashboard-state__item-circle dashboard-state__item-circle--${entry.name.toLowerCase()}`}
              ></span>
              <b>{entry.value}</b> {entry.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardState;

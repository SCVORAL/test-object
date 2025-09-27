import { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import "./Dashboard.scss";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DaysSelector from "../../components/DaysSelector";
import Table from "../../components/Table";
import Modal from "../../components/Modals";
import plusImg from "../../assets/img/plus.svg";
import CreateMachine from "../../components/Modals/components/CreateMachine";
import { generateTrafficData } from "../../utils/random";

const Dashboard = () => {
  const servers = useAppSelector((state) => state.servers.list);

  const [open, setOpen] = useState(false);
  const [needConfirmClose, setNeedConfirmClose] = useState(false);
  const [days, setDays] = useState(7);
  const data = useMemo(() => generateTrafficData(days), [days]);

  const groupedByState = servers.reduce<Record<string, number>>(
    (acc, server) => {
      acc[server.state] = (acc[server.state] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(groupedByState).map(([name, value]) => ({
    name,
    value,
    fill: name === "Running" ? "#459E74" : "#DC3545",
  }));

  return (
    <div className="dashboard">
      <div className="dashboard__container container">
        <div className="block-bg">
          <div className="dashboard-state__title">State</div>
          <div className="dashboard-state">
            <PieChart width={180} height={180}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
              >
                <tspan x="50%" dy="-6px" fontSize="40" fontWeight="bold">
                  {servers.length}
                </tspan>
                <tspan x="50%" dy="26px" fontSize="12" fontWeight="normal">
                  Total number
                </tspan>
              </text>
            </PieChart>
            <div className="dashboard-state__right">
              {chartData.map((entry, index) => (
                <div key={index} className="dashboard-state__item">
                  <div
                    className={
                      "dashboard-state__item-circle dashboard-state__item-circle--" +
                      entry.name.toLowerCase()
                    }
                  ></div>
                  <b>{entry.value}</b> {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-trend block-bg">
          <div className="dashboard-trend__header">
            <div className="dashboard-trend__title">Trend</div>
            <DaysSelector days={days} setDays={setDays} options={[7, 14, 30]} />
          </div>

          <ResponsiveContainer className="dashboard-trend__chart">
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
                fillOpacity={1}
                fill="url(#colorTraffic)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-table">
        <div className="container">
          <div className="dashboard-table__header">
            <div className="dashboard-table__title">Virtual machines</div>
            <div className="dashboard-table__count">{servers.length}</div>
            <div
              className="dashboard-table__btn-modal button"
              onClick={() => setOpen(true)}
            >
              <img src={plusImg} alt="" /> New
            </div>
          </div>
          <Table />
        </div>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="New virtual machine"
        needConfirmClose={needConfirmClose}
      >
        <CreateMachine
          setNeedConfirmClose={setNeedConfirmClose}
          onOpenChange={setOpen}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;

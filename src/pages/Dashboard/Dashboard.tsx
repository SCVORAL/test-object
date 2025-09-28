import { useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import "./Dashboard.scss";
import DashboardTable from "./components/DashboardTable";
import images from "../../assets/img";
import CreateMachine from "../../components/Modals/components/CreateMachine";
import withModal from "../../HOC/modalHOC";
import type { Server } from "../../store/types/serversTypes";
import DashboardState from "./components/DashboardState";
import DashboardTrend from "./components/DashboardTrend";

const CreateMachineModal = withModal(CreateMachine);

const Dashboard: React.FC = () => {
  const servers: Server[] = useAppSelector((state) => state.servers.list);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dashboard">
      <div className="dashboard__container container">
        <DashboardState servers={servers} />
        <DashboardTrend />
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
              <img src={images.plus} alt="" /> New
            </div>
          </div>
          <DashboardTable />
        </div>
      </div>

      <CreateMachineModal
        open={open}
        onOpenChange={setOpen}
        title="New virtual machine"
      />
    </div>
  );
};

export default Dashboard;

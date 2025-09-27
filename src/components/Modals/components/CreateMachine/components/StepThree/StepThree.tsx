import "./StepThree.scss";
import type { Server } from "../../../../../../store/types/serversTypes";

interface StepThreeProps {
  dataServer: Server;
}

const StepThree: React.FC<StepThreeProps> = ({ dataServer }) => {
  return (
    <div className="step-three">
      <div className="step-three__item">
        <div className="step-three__name">Name</div>
        <div className="step-three__info">{dataServer.name}</div>
      </div>
      <div className="step-three__item">
        <div className="step-three__name">CPU</div>
        <div className="step-three__info">{dataServer.cpu.used}</div>
      </div>
      <div className="step-three__item">
        <div className="step-three__name">RAM</div>
        <div className="step-three__info">{dataServer.memory.used}</div>
      </div>
    </div>
  );
};

export default StepThree;

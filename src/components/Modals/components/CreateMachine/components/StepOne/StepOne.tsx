import { useEffect } from "react";
import "./StepOne.scss";
import type { Server } from "../../../../../../store/types/serversTypes";
import InputField from "../../../../../InputField";

interface StepOneProps {
  dataServer: Server;
  setDataServer: <K extends keyof Server>(key: K, value: Server[K]) => void;
  setBtnValidate: (data: boolean) => void;
}

const LIMIT_NAME = 80;

const StepOne: React.FC<StepOneProps> = ({
  dataServer,
  setDataServer,
  setBtnValidate,
}) => {
  useEffect(() => {
    if (dataServer.name.length > LIMIT_NAME) {
      setBtnValidate(false);
    } else {
      setBtnValidate(true);
    }

    if (dataServer.name.length === 0) setBtnValidate(false);
  }, [dataServer.name, setBtnValidate]);

  return (
    <div className="step-one">
      <InputField
        value={dataServer.name}
        onChange={(e) => setDataServer("name", e.toString())}
        hint={`Enter unique name up to ${LIMIT_NAME} characters`}
        placeholder="Name"
        max={LIMIT_NAME}
        errorText={"Name is too long"}
        type="text"
      />
    </div>
  );
};

export default StepOne;

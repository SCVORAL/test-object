import { useEffect, useState } from "react";
import "./StepTwo.scss";
import type { Server } from "../../../../../../store/types/serversTypes";
import InputField from "../../../../../InputField";
import CustomCheckbox from "../../../../../CustomCheckbox";
import MemorySlider from "../../../../../MemorySlider";

interface StepTwoProps {
  dataServer: Server;
  setDataServer: <K extends keyof Server>(key: K, value: Server[K]) => void;
  setBtnValidate: (data: boolean) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  dataServer,
  setDataServer,
  setBtnValidate,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (dataServer.cpu.used > dataServer.cpu.total) {
      setBtnValidate(true);
    } else {
      setBtnValidate(false);
    }
  }, [dataServer.cpu, setBtnValidate]);

  useEffect(() => {
    if (dataServer.memory.used > dataServer.memory.total) {
      setBtnValidate(true);
    } else {
      setBtnValidate(false);
    }
  }, [dataServer.memory, setBtnValidate]);

  useEffect(() => {
    if (dataServer.cpu.used > 0 && dataServer.memory.used > 0 && !hasError) {
      setBtnValidate(true);
    } else {
      setBtnValidate(false);
    }
  }, [dataServer.cpu.used, dataServer.memory.used, setBtnValidate, hasError]);

  return (
    <div className="step-one">
      <InputField
        value={dataServer.cpu.used.toString()}
        onChange={(e) =>
          setDataServer("cpu", { ...dataServer.cpu, used: Number(e) })
        }
        max={Number(dataServer.cpu.total)}
        suffix="GB"
        hint={`Enter number of processors up to ${dataServer.cpu.total}`}
        placeholder="CPU"
        errorText={`Number of processors must be up to ${dataServer.cpu.total}`}
        type="number"
        setHasError={setHasError}
      />

      <CustomCheckbox
        checked={dataServer.virtualizedCPU}
        onChange={(e) => setDataServer("virtualizedCPU", e)}
        label="Enable virtualized CPU performance counters"
      />

      <InputField
        value={dataServer.memory.used.toString()}
        onChange={(e) =>
          setDataServer("memory", { ...dataServer.memory, used: Number(e) })
        }
        max={Number(dataServer.memory.total)}
        suffix="GB"
        hint={`Enter memory amount up to ${dataServer.memory.total}`}
        placeholder="RAM"
        errorText={`Enter memory amount up to ${dataServer.memory.total}`}
        type="number"
        setHasError={setHasError}
      />

      <MemorySlider
        max={dataServer.memory.total}
        min={0}
        firstEnd={Math.floor(dataServer.memory.total / 3)}
        secondEnd={Math.floor((dataServer.memory.total / 3) * 2)}
        value={[dataServer.memory.used]}
        setValue={(e) =>
          setDataServer("memory", { ...dataServer.memory, used: Number(e) })
        }
      />
    </div>
  );
};

export default StepTwo;

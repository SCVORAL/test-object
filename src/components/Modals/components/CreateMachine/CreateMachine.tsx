import { useEffect, useState } from "react";
import modalBgImg from "../../../../assets/img/modal-bg.svg";
import "./CreateMachine.scss";
import classNames from "classnames";
import type { Server } from "../../../../store/types/serversTypes";
import { addServer } from "../../../../store/slices/serversSlice";
import { useAppDispatch } from "../../../../store/hooks/useAppDispatch";
import { createNewServer } from "../../../../utils/serverGenerators";
import { useSteps } from "./components/useSteps";

interface CreateMachineProps {
  setNeedConfirmClose: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMachine: React.FC<CreateMachineProps> = ({
  setNeedConfirmClose,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [dataServer, setDataServer] = useState<Server>({
    id: "",
    name: "",
    state: "Stopped",
    host: "",
    cpu: { used: 0, total: 12 },
    memory: { used: 0, total: 50 },
    uptime: "",
    alert: { type: "all good" },
    traffic: [],
    virtualizedCPU: false,
  });
  const [btnValidate, setBtnValidate] = useState(true);

  const updateServer = <K extends keyof Server>(key: K, value: Server[K]) => {
    setDataServer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const steps = useSteps(dataServer, updateServer, setBtnValidate);
  const activeStep = steps[currentStep - 1];

  const onAddServer = () => {
    const newServer = createNewServer(dataServer);
    dispatch(addServer(newServer));
    onOpenChange(false);
  };

  useEffect(() => {
    if (currentStep > 1) {
      setNeedConfirmClose(true);
    } else {
      setNeedConfirmClose(false);
    }
  }, [currentStep, setNeedConfirmClose]);

  return (
    <div className="create-machine">
      <div className="left">
        <img className="left__bg" src={modalBgImg} alt="" />
        <div className="left__info">
          <div className="cleft__subtitle">Welcome to the</div>
          <div className="left__title">New Virtual Machine Wizard</div>

          <div className="left__steps">
            {steps.map((i) => (
              <div
                className={classNames("left__step", {
                  "left__step--active": i.id === currentStep,
                  "left__step--completed": i.id < currentStep,
                })}
              >
                {i.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right">
        <div className="right__title">{activeStep?.title}</div>
        <div className="right__subtitle">{activeStep?.subtitle}</div>

        {activeStep?.content}

        <div className="right__buttons">
          {currentStep !== 1 && (
            <button
              className={classNames(
                "right__button right__button--back button button-reset"
              )}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            >
              Back
            </button>
          )}
          <button
            className={classNames("right__button button button-reset", {
              "right__button--disable": !btnValidate,
            })}
            onClick={() => {
              if (currentStep === steps.length) {
                onAddServer();
              } else {
                setCurrentStep((prev) => Math.min(steps.length, prev + 1));
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMachine;

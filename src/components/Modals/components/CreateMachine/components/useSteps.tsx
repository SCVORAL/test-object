import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import type { Server } from "../../../../../store/types/serversTypes";

export const useSteps = (
  dataServer: Server,
  updateServer: <K extends keyof Server>(key: K, value: Server[K]) => void,
  setBtnValidate: (val: boolean) => void
) => [
  {
    id: 1,
    label: "Virtual Machine Name",
    title: "Select a name",
    subtitle:
      "A virtual machine requires storage so that you can install an operating system.",
    content: (
      <StepOne
        dataServer={dataServer}
        setDataServer={updateServer}
        setBtnValidate={setBtnValidate}
      />
    ),
  },
  {
    id: 2,
    label: "General Settings",
    title: "General Settings",
    subtitle: "Configure the virtual machine hardware.",
    content: (
      <StepTwo
        dataServer={dataServer}
        setDataServer={updateServer}
        setBtnValidate={setBtnValidate}
      />
    ),
  },
  {
    id: 3,
    title: "Ready to complete",
    subtitle: "Review your settings selection before finishing the wizard.",
    content: <StepThree dataServer={dataServer} />,
  },
];

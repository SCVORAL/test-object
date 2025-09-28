import { useState } from "react";
import Modal from "../components/Modals";
import { createPortal } from "react-dom";

export interface InjectedProps {
  setNeedConfirmClose: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange: (open: boolean) => void;
}

function withModal<T extends object>(
  Component: React.ComponentType<T & InjectedProps>
) {
  return ({
    ...props
  }: T & {
    open: boolean;
    title: string;
    onOpenChange: (open: boolean) => void;
  }) => {
    const [needConfirmClose, setNeedConfirmClose] = useState(false);

    return createPortal(
      <Modal
        open={props.open}
        onOpenChange={props.onOpenChange}
        title={props.title}
        needConfirmClose={needConfirmClose}
      >
        <Component
          {...props}
          setNeedConfirmClose={setNeedConfirmClose}
          onOpenChange={props.onOpenChange}
        />
      </Modal>,
      document.body
    );
  };
}

export default withModal;

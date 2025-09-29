import { createContext, useState, useContext } from "react";
import Modal from "../components/Modals";
import ConfirmCloseModal from "../components/Modals/components/ConfirmCloseModal";

export interface InjectedProps {
  onOpenChange: (open: boolean) => void;
}

export interface ModalContextProps {
  needConfirmClose: boolean;
  setNeedConfirmClose: React.Dispatch<React.SetStateAction<boolean>>;
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange: (open: boolean) => void;
}

export const WithConfirmModalContext = createContext<ModalContextProps | null>(
  null
);

export const useWithConfirmModalContext = (): ModalContextProps => {
  const ctx = useContext(WithConfirmModalContext);
  if (!ctx) {
    throw new Error(
      "useModalContext must be used inside withConfirmCloseModal"
    );
  }
  return ctx;
};

function withConfirmCloseModal<T extends object>(
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
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
      <WithConfirmModalContext.Provider
        value={{
          onOpenChange: props.onOpenChange,
          needConfirmClose,
          setNeedConfirmClose,
          confirmOpen,
          setConfirmOpen,
        }}
      >
        <Modal
          open={props.open}
          onOpenChange={props.onOpenChange}
          title={props.title}
        >
          <Component {...props} onOpenChange={props.onOpenChange} />
        </Modal>

        <ConfirmCloseModal />
      </WithConfirmModalContext.Provider>
    );
  };
}

export default withConfirmCloseModal;

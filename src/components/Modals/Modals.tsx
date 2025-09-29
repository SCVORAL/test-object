import * as Dialog from "@radix-ui/react-dialog";
import "./Modals.scss";
import { useCallback, useEffect, useState } from "react";
import img from "../../assets/img";
import { createPortal } from "react-dom";
import { useWithConfirmModalContext } from "../../HOC/withConfirmClouseModal";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const { needConfirmClose, setConfirmOpen } = useWithConfirmModalContext();

  const handleClose = useCallback(
    (val?: boolean) => {
      if (!val && needConfirmClose) {
        setConfirmOpen(true);
      } else {
        onOpenChange(false);
      }
    },
    [needConfirmClose, onOpenChange, setConfirmOpen]
  );

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isVisible) return null;

  return createPortal(
    <>
      <Dialog.Root open={open} onOpenChange={(val) => handleClose(val)}>
        <Dialog.Overlay
          className={`modal__overlay ${
            open ? "modal__overlay--enter" : "modal__overlay--leave"
          }`}
        />
        <Dialog.Content
          className={`modal__content ${
            open ? "modal__content--enter" : "modal__content--leave"
          }`}
        >
          <Dialog.Title className="modal__title">
            {title}
            <img
              className="modal__close"
              src={img.close}
              alt=""
              onClick={() => handleClose(false)}
            />
          </Dialog.Title>

          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Root>
    </>,
    document.body
  );
};

export default Modal;

import * as Dialog from "@radix-ui/react-dialog";
import "./Modals.scss";
import { useEffect, useState } from "react";
import closeImg from "../../assets/img/close.svg";
import errorImg from "../../assets/img/error.svg";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  needConfirmClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
  needConfirmClose,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = (val?: boolean) => {
    if (!val && needConfirmClose) {
      setConfirmOpen(true);
    } else {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
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
              src={closeImg}
              alt=""
              onClick={() => handleClose()}
            />
          </Dialog.Title>

          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Root>

      {/* модалка подтверждения */}
      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="modal__overlay" />
          <Dialog.Content className="confirm-modal__content modal__content">
            <div className="confirm-modal__body modal__body">
              <img src={errorImg} alt="" width={20} />
              <span className="confirm-modal__title">Cancel creating?</span>
              <span className="confirm-modal__text">
                You have unsaved changes that will be lost. Do you want to
                continue?
              </span>
              <div className="confirm-modal__buttons">
                <button
                  onClick={() => {
                    setConfirmOpen(false);
                    onOpenChange(false);
                  }}
                  className="confirm-modal__button-leave button-reset button"
                >
                  Leave
                </button>
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="confirm-modal__button-cancel button-reset button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Modal;

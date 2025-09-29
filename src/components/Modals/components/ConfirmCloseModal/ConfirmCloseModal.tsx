import * as Dialog from "@radix-ui/react-dialog";
import { useWithConfirmModalContext } from "../../../../HOC/withConfirmClouseModal";
import images from "../../../../assets/img";
import "./ConfirmCloseModal.scss";

export const ConfirmCloseModal: React.FC = () => {
  const { onOpenChange, confirmOpen, setConfirmOpen } =
    useWithConfirmModalContext();

  return (
    <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="confirm-modal__content modal__content">
          <Dialog.DialogTitle></Dialog.DialogTitle>
          <div className="confirm-modal__body modal__body">
            <img src={images.error} alt="" width={20} />
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
  );
};

export default ConfirmCloseModal;

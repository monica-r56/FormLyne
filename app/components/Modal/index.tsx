import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  PropsWithChildren,
} from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import Overlay from '@components/Overlay';
import { IconButton } from '@components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalHeader, ModalBody, ModalFooter, ModalTrigger } from './ModalParts';
import { ModalContextProps, ModalProps } from './ModalTypes';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal components must be used within <Modal>');
  return context;
};

const ModalRoot: React.FC<PropsWithChildren<ModalProps>> = ({
  dismissable = true,
  children,
  className,
  width = '480px',
  onClose,
  initialLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<'primary' | 'secondary' | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    if (dismissable) {
      setIsOpen(false);
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
      onClose?.();
    }
  }, [dismissable, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setClickedButton(null);
      setContentLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialLoading) {
      setContentLoading(true);
    }
  }, [isOpen, initialLoading]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissable) handleClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target instanceof HTMLElement && !modalRef.current.contains(e.target)) {
        if (dismissable) handleClose();
      }
    };

    previousActiveElementRef.current ??= document.activeElement as HTMLElement;

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dismissable, handleClose]);

  const childrenArray = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];

  const header = childrenArray.find((child) => child.type === ModalHeader);
  const body = childrenArray.find((child) => child.type === ModalBody);
  const footer = childrenArray.find((child) => child.type === ModalFooter);
  const trigger = childrenArray.find((child) => child.type === ModalTrigger);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setOpen: setIsOpen,
      onClose: handleClose,
      dismissable,
      initialLoading,
      contentLoading,
      setContentLoading,
      clickedButton,
      setClickedButton,
    }),
    [isOpen, handleClose, dismissable, initialLoading, contentLoading, clickedButton]
  );

  if (!isOpen) return <ModalContext.Provider value={contextValue}>{trigger}</ModalContext.Provider>;

  return ReactDOM.createPortal(
    <ModalContext.Provider value={contextValue}>
      {trigger}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <Overlay>
          <div
            ref={modalRef}
            className={clsx(
              'relative z-50 flex max-h-[calc(100vh-48px)] flex-col overflow-hidden rounded-lg bg-white dark:bg-zinc-800',
              className
            )}
            style={{ width }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className={clsx('mt-2 flex h-16 shrink-0 items-center px-5', header ? 'justify-between' : 'justify-end')}
            >
              {header}
              {dismissable && (
                <IconButton
                  id="close"
                  type="Tertiary"
                  color="gray"
                  onClick={handleClose}
                  icon={<FontAwesomeIcon icon={faXmark} />}
                  title="Close modal"
                />
              )}
            </div>
            <div className={clsx('flex-1 overflow-y-auto px-5 py-2', header ? 'pt-2' : 'pt-0', 'mb-6')}>{body}</div>
            <div className="shrink-0 px-5 py-5">{footer ?? <div className="h-12" />}</div>
          </div>
        </Overlay>
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Trigger: ModalTrigger,
});

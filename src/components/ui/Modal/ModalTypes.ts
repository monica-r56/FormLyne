export interface FooterBtnConfig {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ModalProps {
  dismissable?: boolean;
  className?: string;
  width?: string;
  onClose?: () => void;
  initialLoading?: boolean;
}

export interface ModalContextProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
  dismissable: boolean;
  initialLoading?: boolean;
  contentLoading: boolean;
  setContentLoading: (loading: boolean) => void;
  clickedButton: 'primary' | 'secondary' | null;
  setClickedButton: (btn: 'primary' | 'secondary' | null) => void;
}

import React, {
  createContext,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  useContext,
  isValidElement,
  cloneElement,
  ReactElement,
  type FC,
  type PropsWithChildren,
  type Reducer,
} from 'react';
import { cn } from '@/lib/utils';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useAnimationState from './hooks/useAnimationState';
import Overlay from '@/components/ui/Overlay';
import { IconButton } from '@/components/ui/IconButton';
import Divider from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';

type SidePanelState = {
  open: boolean;
  isAnimating: boolean;
  isVisible: boolean;
};

type SidePanelAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'ANIMATION_COMPLETE' }
  | { type: 'SHOW' }
  | { type: 'HIDE' };

const initialState: SidePanelState = {
  open: false,
  isAnimating: false,
  isVisible: false,
};

const animatedReducer: Reducer<SidePanelState, SidePanelAction> = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, open: true, isAnimating: true };
    case 'SHOW':
      return { ...state, isVisible: true };
    case 'CLOSE':
    case 'HIDE':
      return { ...state, isAnimating: true, isVisible: false };
    case 'ANIMATION_COMPLETE':
      return { ...state, isAnimating: false, open: state.isVisible };
    default:
      return state;
  }
};

const instantReducer: Reducer<SidePanelState, SidePanelAction> = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return { open: true, isAnimating: false, isVisible: true };
    case 'CLOSE':
      return { open: false, isAnimating: false, isVisible: false };
    default:
      return state;
  }
};

type SidePanelContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

const PANEL_SIZES = {
  lg: 'w-[90vw] max-w-[1092px]',
  md: 'w-[80vw] max-w-[892px]',
  sm: 'w-[70vw] max-w-[250px]',
} as const;
type PanelSize = keyof typeof PANEL_SIZES;

type SidePanelPlacement = 'left' | 'right';

type SidePanelTriggerProps = {
  children?: ReactElement<{ onClick?: () => void }>;
};

export const SidePanelTrigger: FC<SidePanelTriggerProps> = ({ children }) => {
  const context = useContext(SidePanelContext);
  const { formatMessage } = useIntl();
  if (!context) {
    throw new Error('SidePanel.Trigger must be used within a SidePanel');
  }
  if (children && isValidElement(children)) {
    return cloneElement(children, {
      onClick: () => context.setOpen(true),
    });
  }
  return (
    <Button
      label={formatMessage({
        id: 'sidePanel.openPanel',
        defaultMessage: 'Open side panel',
      })}
      color="blue"
      onClick={() => context.setOpen(true)}
      data-testid="side-panel-trigger"
    />
  );
};

const SidePanelHeader: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <header
    id="sidePanelHeader"
    className={cn('flex flex-col gap-3 self-stretch pt-0 sm:pt-4', className)}
    data-testid="side-panel-header"
  >
    <div className="flex flex-col items-start justify-start gap-2.5 self-stretch px-6">
      <div className="flex flex-col items-start justify-center gap-1 self-stretch">{children}</div>
    </div>
    <Divider />
  </header>
);

const SidePanelBody: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const { formatMessage } = useIntl();
  return (
    <section
      className={cn('h-full w-full flex-1 overflow-y-auto', className)}
      aria-label={formatMessage({
        id: 'sidePanel.content',
        defaultMessage: 'Panel content',
      })}
      data-testid="side-panel-body"
    >
      {children}
    </section>
  );
};

const SidePanelFooter: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const { formatMessage } = useIntl();
  return (
    <div className={cn('sticky bottom-0 z-10 border-t p-4', className)}>
      <footer
        id="sidePanelFooter"
        className="flex justify-end gap-2"
        aria-label={formatMessage({
          id: 'sidePanel.actions',
          defaultMessage: 'Panel actions',
        })}
        data-testid="side-panel-footer"
      >
        {children}
      </footer>
    </div>
  );
};

type SidePanelProps = PropsWithChildren<{
  size: PanelSize;
  dismissable?: boolean;
  placement?: SidePanelPlacement;
}>;

const SidePanelRoot: FC<SidePanelProps> = ({ size, children, dismissable = false, placement = 'right' }) => {
  const isAnimationEnabled = useAnimationState();
  const reducer = isAnimationEnabled ? animatedReducer : instantReducer;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { open, isAnimating, isVisible } = state;
  const panelRef = useRef<HTMLDivElement>(null);
  const { formatMessage } = useIntl();

  const handleOpen = useCallback(() => {
    dispatch({ type: 'OPEN' });
    if (isAnimationEnabled) {
      requestAnimationFrame(() => {
        dispatch({ type: 'SHOW' });
      });
    }
  }, [isAnimationEnabled]);

  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
  };

  const setOpen = useCallback(
    (newState: boolean) => {
      if (newState) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    [handleOpen, handleClose]
  );

  const handleAnimationEnd = () => {
    dispatch({ type: 'ANIMATION_COMPLETE' });
  };

  const contextValue: SidePanelContextType = {
    open,
    setOpen,
  };

  useEffect(() => {
    if (!dismissable || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dismissable, open, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isVisible) return;
    if (dismissable && e.target === e.currentTarget) {
      handleClose();
    }
  };

  const triggerElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SidePanelTrigger
  );

  const panelContent = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === SidePanelTrigger)
  );

  const headerElement = React.Children.toArray(panelContent).find(
    (child) => React.isValidElement(child) && child.type === SidePanelHeader
  );

  useEffect(() => {
    if (open && isVisible && panelRef.current) {
      const focusableElement = panelRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (focusableElement) {
        focusableElement.focus();
      } else {
        panelRef.current.focus();
      }
    }
  }, [open, isVisible]);

  return (
    <SidePanelContext.Provider value={contextValue}>
      {triggerElement}
      {(open || isAnimating) && (
        <>
          <div
            role={dismissable ? 'button' : undefined}
            tabIndex={dismissable ? 0 : undefined}
            className={cn(
              'fixed inset-0 z-40',
              isAnimationEnabled && 'transition-opacity duration-300 ease-in-out',
              isVisible ? 'opacity-50' : 'opacity-0'
            )}
            onClick={dismissable ? handleOverlayClick : undefined}
            onKeyDown={(e) => {
              if (dismissable && (e.key === 'Enter' || e.key === ' ')) {
                handleClose();
              }
            }}
            aria-label={
              dismissable
                ? formatMessage({
                    id: 'dismissPanel',
                    defaultMessage: 'Dismiss panel',
                  })
                : undefined
            }
            data-testid="side-panel-overlay"
          >
            <Overlay />
          </div>
          <div
            className={cn(
              'fixed top-0 z-50 flex items-start',
              placement === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <div
              ref={panelRef}
              className={cn(
                'relative flex h-screen flex-col overflow-visible bg-white dark:bg-zinc-800',
                'w-screen',
                `sm:${PANEL_SIZES[size]}`,
                isAnimationEnabled && 'transform transition-transform duration-300 ease-in-out',
                placement === 'right'
                  ? isVisible
                    ? 'translate-x-0'
                    : 'translate-x-full'
                  : isVisible
                  ? 'translate-x-0'
                  : '-translate-x-full'
              )}
              role="dialog"
              aria-modal="true"
              data-testid="side-panel"
              {...(headerElement
                ? { 'aria-labelledby': 'sidePanelHeader' }
                : {
                    'aria-label': formatMessage({
                      id: 'sidePanel.title',
                      defaultMessage: 'Side panel',
                    }),
                  })}
              onTransitionEnd={handleAnimationEnd}
              tabIndex={-1}
            >
              <div>
                <div className="flex w-full justify-end sm:hidden dark:bg-zinc-800">
                  <IconButton
                    type="Tertiary"
                    color="gray"
                    onClick={handleClose}
                    icon={<FontAwesomeIcon icon={faXmark} />}
                    aria-label={formatMessage({
                      id: 'sidePanel.close',
                      defaultMessage: 'Close panel',
                    })}
                    data-testid="side-panel-close-mobile"
                  />
                </div>
                <div
                  className={cn(
                    'absolute top-3 z-10 hidden rounded-full bg-white sm:block dark:bg-zinc-900',
                    placement === 'right' ? '-left-12' : '-right-12'
                  )}
                >
                  <IconButton
                    type="Tertiary"
                    color="gray"
                    onClick={handleClose}
                    rounded
                    floating
                    icon={<FontAwesomeIcon icon={faXmark} />}
                    aria-label={formatMessage({
                      id: 'sidePanel.close',
                      defaultMessage: 'Close panel',
                    })}
                    data-testid="side-panel-close"
                  />
                </div>
              </div>
              <div className="flex h-screen flex-1 flex-col">
                <div className={cn('flex min-h-0 flex-1 flex-col border-l', 'border-zinc-200 dark:border-zinc-700')}>
                  {panelContent.length > 0 ? panelContent : children}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </SidePanelContext.Provider>
  );
};

export const SidePanel = Object.assign(SidePanelRoot, {
  Trigger: SidePanelTrigger,
  Header: SidePanelHeader,
  Body: SidePanelBody,
  Footer: SidePanelFooter,
});

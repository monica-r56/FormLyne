import React, { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import { Loader } from '@components/Loader';
import { Button } from '@components/Button';
import clsx from 'clsx';
import { useModalContext } from './index';
import { FooterBtnConfig } from './ModalTypes';

export const ModalHeader: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={clsx('flex items-center justify-between', className)}>
    <h2 id="modal-title" className="text-xl leading-7 font-medium text-gray-900 dark:text-white">
      {children}
    </h2>
  </div>
);

export const ModalBody: FC<PropsWithChildren<{ loading?: boolean; className?: string }>> = ({
  children,
  loading,
  className,
}) => {
  const { initialLoading, setContentLoading } = useModalContext();
  const isLoading = loading || initialLoading;

  useEffect(() => {
    if (loading !== undefined) {
      setContentLoading(loading);
    }
  }, [loading, setContentLoading]);

  return isLoading ? (
    <div className={clsx('flex h-24 items-center justify-center', className)}>
      <Loader size="md" color="blue" />
    </div>
  ) : (
    <div className={className}>{children}</div>
  );
};

export const ModalFooter: FC<{
  primaryBtnConfig?: FooterBtnConfig;
  secondaryBtnConfig?: FooterBtnConfig;
  className?: string;
}> = ({ primaryBtnConfig, secondaryBtnConfig, className }) => {
  const { initialLoading, contentLoading, clickedButton, setClickedButton } = useModalContext();

  const handleClick = (btn: 'primary' | 'secondary', action?: () => void) => {
    setClickedButton(btn);
    action?.();
  };

  return (
    <div
      data-testid="modal-footer"
      className={clsx('flex h-full items-center justify-end gap-3', initialLoading && 'opacity-0', className)}
    >
      {secondaryBtnConfig && (
        <Button
          type="button"
          color="gray"
          {...secondaryBtnConfig}
          onClick={() => handleClick('secondary', secondaryBtnConfig.onClick)}
        />
      )}
      {primaryBtnConfig && (
        <div className={clsx(clickedButton === 'primary' && contentLoading && 'opacity-50')}>
          <Button
            type="button"
            color="blue"
            {...primaryBtnConfig}
            disabled={primaryBtnConfig.disabled || contentLoading}
            onClick={() => handleClick('primary', primaryBtnConfig.onClick)}
          />
        </div>
      )}
    </div>
  );
};

export const ModalTrigger: FC<{ children: ReactElement<{ onClick?: () => void }> }> = ({ children }) => {
  const { setOpen } = useModalContext();

  return React.cloneElement(children, {
    onClick: () => {
      children.props.onClick?.();
      setOpen(true);
    },
  });
};

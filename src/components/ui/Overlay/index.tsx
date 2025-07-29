import React from 'react';

export interface OverlayProps {
  children?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-900/75">{children}</div>;
};

export default Overlay;

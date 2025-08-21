import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import clsx from 'clsx';

export interface NavbarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ left, right, className }) => {
  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
      >
        <div className="flex h-16 items-center justify-between pr-2">
          {/* Left Container */}
          <div className="flex items-center space-x-4">
            {left}
          </div>

          {/* Right Container */}
          <div className="flex items-center space-x-2">
            {right}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

Navbar.displayName = 'Navbar';

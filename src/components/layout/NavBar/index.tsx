// src/components/layout/Navbar.tsx
import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import clsx from 'clsx';

export interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-foreground">FormLyne</h1>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">{children}</div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

Navbar.displayName = 'Navbar';
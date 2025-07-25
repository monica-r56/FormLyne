import React, { type ReactNode } from 'react';
import { type RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react';
import { LanguageProvider } from '@contexts/LanguageContext';
import { MemoryRouter } from 'react-router';

interface ExtendedRenderOptions extends RenderOptions {
  initialPath?: string;
  route?: string[];
}

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

function render(ui: React.ReactNode, options?: ExtendedRenderOptions): RenderResult {
  const Wrapper = (props: { children: ReactNode }) => (
    <MemoryRouter initialEntries={options?.route || ['/']}>
      <LanguageProvider>{props.children}</LanguageProvider>
    </MemoryRouter>
  );

  return { ...rtlRender(ui, { wrapper: Wrapper, ...options }) };
}

export * from '@testing-library/react';

export { render };

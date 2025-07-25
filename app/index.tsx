import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import './index.css';
import App from './containers/App';
import { LanguageProvider } from '@contexts/LanguageContext';

console.log('App version: ', process.env.VERSION);
console.log('Created at: ', process.env.CREATED_AT);

const rootElement = document.getElementById('root');
let root: Root;
if (rootElement) {
  root = createRoot(rootElement);
}

const renderApp = () => {
  if (root && root.render) {
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </React.StrictMode>
    );
  } else {
    console.error('Root element with id "root" not found in the document.');
  }
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
//Dev env deployment update
renderApp();

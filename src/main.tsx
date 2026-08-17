
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import GuideLanding from './components/GuideLanding';
import { SiteProvider } from './context/SiteContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

const GUIDE_SLUGS = [
  'come-arrivare-da-lamezia-terme-a-scalea',
  'jak-dojechac-z-lamezia-terme-do-scalei',
  'scalea-senza-auto',
  'scalea-bez-samochodu',
];

const RouteAwareApp: React.FC = () => {
  const { pathname } = useLocation();
  const isGuideLanding = GUIDE_SLUGS.some((slug) => pathname.includes(`/${slug}`));
  return isGuideLanding ? <GuideLanding /> : <App />;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SiteProvider>
          <RouteAwareApp />
        </SiteProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

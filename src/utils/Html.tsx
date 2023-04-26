import React from 'react';
import { PreloadedState } from '@reduxjs/toolkit';

import { RootState } from '../store/store';

const Html = (props: { children: React.ReactNode; preloadedState?: PreloadedState<RootState> }) => (
  <html lang="en">
    <head>
      <title>Search App</title>
      <link rel="icon" type="image/svg+xml" sizes="any" href="search.svg" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div id="root">
        <React.StrictMode>{props.children}</React.StrictMode>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
          import RefreshRuntime from "http://localhost:3042/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
          ${
            props.preloadedState &&
            `window.__PRELOADED_STATE__ = ${JSON.stringify(props.preloadedState).replace(
              /</g,
              '\\u003c'
            )}`
          };`,
        }}
      />
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
);

export default Html;

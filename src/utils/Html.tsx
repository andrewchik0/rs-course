import React from "react"
import { PreloadedState } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

const Html = (props: {children: React.ReactNode, preloadedState?: PreloadedState<RootState>}) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" sizes="any" href="search.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Search App</title>
    </head>
    <body>
      <div id="root">
        <React.StrictMode>
          {props.children}
        </React.StrictMode>
      </div>
      {/* <script type="module" src="/src/main.tsx"></script> */}
      <script type="module" dangerouslySetInnerHTML={{
        __html: `
          import RefreshRuntime from "http://localhost:3042/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
          ${props.preloadedState && `window.__PRELOADED_STATE__ = ${JSON.stringify(props.preloadedState).replace(
          /</g,
          '\\u003c'
        )}`};`
      }}/>
    </body>
  </html>
)

export default Html;

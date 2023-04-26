import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

import Html from '../src/utils/Html';
import { Provider } from 'react-redux';
import AppRoutes from '../src/components/AppRoutes/AppRoutes';
import { setupStore } from '../src/store/store';
import { StaticRouter } from 'react-router-dom/server';
import photoAPI from '../src/services/PhotoService';

async function createServer() {
  const app = express();
  const port = parseInt(process.env.port || '') || 3042;

  const DEV_ENV = 'development';
  let vite;

  if (process.env.NODE_ENV == DEV_ENV) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static('./dist'));
  }

  app.use(express.static('./public'));

  app.get('*', async (req, res) => {
    const store = setupStore();
    store.dispatch(
      photoAPI.endpoints.fetchByText.initiate(store.getState().searchInputReducer.value)
    );
    await Promise.all(store.dispatch(photoAPI.util.getRunningQueriesThunk()));

    const { pipe } = renderToPipeableStream(
      <Html preloadedState={store.getState()}>
        <StaticRouter location={req.originalUrl}>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </StaticRouter>
      </Html>,
      {
        bootstrapModules: ['./src/main.tsx'],
        onShellReady() {
          res.set('Content-Type', 'text/html');
          pipe(res);
        },
      }
    );
  });

  app.listen(port, () => {
    console.log(`Server listening on port \x1b[32m${port}\x1b[0m`);
  });
}

createServer();

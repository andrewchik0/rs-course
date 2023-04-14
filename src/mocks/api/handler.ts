import { rest } from 'msw';
import photos from '../../assets/photos.json';

export const handlers = [
  rest.get('https://api.unsplash.com/search/photos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos), ctx.delay(30));
  }),
  rest.get('https://api.unsplash.com/photos/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos.results[0]), ctx.delay(30));
  }),
];

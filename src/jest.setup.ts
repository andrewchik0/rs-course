import '@testing-library/jest-dom';

import { server } from './mocks/api/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

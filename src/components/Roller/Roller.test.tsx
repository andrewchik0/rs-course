import React from 'react';

import Roller from './Roller';
import { renderWithProviders } from '../../utils/TestUtils';

it('renders roller', () => {
  const { getByTestId } = renderWithProviders(<Roller scale={1} x={0} y={0} />);

  expect(getByTestId(/roller/i)).toBeInTheDocument();
});

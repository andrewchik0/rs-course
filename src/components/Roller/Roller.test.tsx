import React from 'react';
import { render } from '@testing-library/react';

import Roller from './Roller';

it('renders roller', () => {
  const { getByTestId } = render(<Roller scale={1} x={0} y={0} />);

  expect(getByTestId(/roller/i)).toBeInTheDocument();
});

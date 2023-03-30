import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CreateCardPage from './CreateCardPage';

describe('create card works', () => {
  global.URL.createObjectURL = jest.fn();

  it('shows alerts', async () => {
    render(<CreateCardPage />);

    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('\u26A0 Image required')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Select gender')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Select breed')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Enter a valid birthday')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Enter name of the cat')).toBeInTheDocument();
    });
  });

  it('creates card', async () => {
    render(<CreateCardPage />);

    const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Cat name' } });
    fireEvent.change(screen.getByLabelText(/cat birthday/i), { target: { value: '2022-02-20' } });
    fireEvent.change(screen.getByLabelText(/breed/i), { target: { value: 'Sphynx' } });
    fireEvent.click(screen.getByLabelText(/female/i));
    fireEvent.change(screen.getByLabelText(/image/i), { target: { files: [file] } });
    fireEvent.click(screen.getByLabelText(/microchipped/i));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Cat name')).toBeInTheDocument();
      expect(screen.getAllByText('Microchipped')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Sphynx')[1]).toBeInTheDocument();
      expect(screen.getByText(/20.02.2022/)).toBeInTheDocument();
      expect(screen.getAllByText('Female')[1]).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});

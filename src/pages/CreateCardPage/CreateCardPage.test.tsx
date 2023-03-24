import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CreateCardPage from './CreateCardPage';

describe('create card works', () => {
  global.URL.createObjectURL = jest.fn();

  it('shows alerts', () => {
    render(<CreateCardPage />);

    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('\u26A0 This is not an image')).toBeInTheDocument();
    expect(screen.getByText('\u26A0 Select gender')).toBeInTheDocument();
    expect(screen.getByText('\u26A0 Select breed')).toBeInTheDocument();
    expect(screen.getByText('\u26A0 Enter valid birthday')).toBeInTheDocument();
    expect(screen.getByText('\u26A0 Enter name of the cat')).toBeInTheDocument();
  });

  it('creates card', () => {
    render(<CreateCardPage />);

    const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Cat name' } });
    fireEvent.change(screen.getByLabelText(/cat birthday/i), { target: { value: '2022-02-20' } });
    fireEvent.change(screen.getByLabelText(/breed/i), { target: { value: 'Sphynx' } });
    fireEvent.change(screen.getByLabelText(/female/i), { target: { checked: true } });
    fireEvent.change(screen.getByLabelText(/image/i), { target: { files: [file] } });
    fireEvent.change(screen.getByLabelText(/microchipped/i), { target: { checked: true } });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Cat name')).toBeInTheDocument();
    expect(screen.getAllByText('Microchipped')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Sphynx')[1]).toBeInTheDocument();
    expect(screen.getByText(/20.02.2022/)).toBeInTheDocument();
    expect(screen.getAllByText('Female')[1]).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});

import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import CreateCardPage from './CreateCardPage';
import { renderWithProviders } from '../../utils/TestUtils';

const getStringMoreThan4Mb = () => {
  let res = '';
  for (let i = 0; i < 1024 * 1024; i++) {
    res += 'abcde';
  }
  return res;
};

describe('create card works', () => {
  global.URL.createObjectURL = jest.fn();
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  it('shows alerts', async () => {
    renderWithProviders(<CreateCardPage />);

    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('\u26A0 Image required')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Select gender')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Select breed')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Enter a valid birthday')).toBeInTheDocument();
      expect(screen.getByText('\u26A0 Enter name of the cat')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/cat birthday/i), {
      target: {
        value: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth() + 1,
          new Date().getDate() + 1
        )
          .toISOString()
          .substring(0, 10),
      },
    });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(
        screen.getByText('\u26A0 Date should be less than today\x27s date')
      ).toBeInTheDocument();
    });
    fireEvent.change(screen.getByLabelText(/cat birthday/i), {
      target: { value: new Date('1960').toISOString().substring(0, 10) },
    });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('\u26A0 Enter a valid date')).toBeInTheDocument();
    });

    const file = new File(['(⌐□_□)'], 'image.png', { type: 'blob' });
    fireEvent.change(screen.getByLabelText(/image/i), { target: { files: [file] } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('\u26A0 Only PNG, JPEG or JPG files accepted')).toBeInTheDocument();
    });

    const bigFile = new File([getStringMoreThan4Mb()], 'image.png', { type: 'blob' });
    fireEvent.change(screen.getByLabelText(/image/i), { target: { files: [bigFile] } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('\u26A0 Max size is 4MB')).toBeInTheDocument();
    });
  });

  it('creates card', async () => {
    renderWithProviders(<CreateCardPage />);

    const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Cat name' } });
    fireEvent.change(screen.getByLabelText(/cat birthday/i), { target: { value: '2022-02-20' } });
    fireEvent.change(screen.getByLabelText(/breed/i), { target: { value: 'Sphynx' } });
    fireEvent.click(screen.getByLabelText(/female/i));
    fireEvent.change(screen.getByLabelText(/image/i), { target: { files: [file] } });
    fireEvent.click(screen.getByLabelText(/microchipped/i));

    await act(() => fireEvent.click(screen.getByText('Submit')));

    act(() => jest.runAllTimers());
    expect(setTimeout).toHaveBeenCalled();
    expect(screen.getByText('Cat name')).toBeInTheDocument();
    expect(screen.getAllByText('Microchipped')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Sphynx')[1]).toBeInTheDocument();
    expect(screen.getByText(/20.02.2022/)).toBeInTheDocument();
    expect(screen.getAllByText('Female')[1]).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});

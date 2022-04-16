import ReactDOM from 'react-dom';
import { waitFor, render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import renderwithredux from '../../../renderWithRedux'

afterEach(() => cleanup);

describe('It is a Navbar section', () => {
  test('rendering properly (no crashing)', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });
});

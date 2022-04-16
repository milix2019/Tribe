import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

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

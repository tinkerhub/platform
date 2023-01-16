import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../pages/404';

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);
    const heading = screen.getByText(/Looks Like You&apos;re Lost/);
    expect(heading).toBeInTheDocument();
  });
});

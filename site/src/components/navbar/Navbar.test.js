import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('checks if the navbar has the correct items', () => {
  render(<Navbar />)
  const about = screen.getByText(/about/i)
  const experience = screen.getByText(/experience/i)
  const projects = screen.getByText(/projects/i)
  const diplomas = screen.getByText(/education/i)
  const certifications = screen.getByText(/certifications/i)

  expect(about).toBeInTheDocument()
  expect(experience).toBeInTheDocument()
  expect(projects).toBeInTheDocument()
  expect(diplomas).toBeInTheDocument()
  expect(certifications).toBeInTheDocument()
});

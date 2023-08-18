import { render, screen } from '@testing-library/react';
import Login from './Login';
import {BrowserRouter} from 'react-router-dom'

test('checks if the description has the correct items', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const username = screen.getByTestId("login-username")
  const password = screen.getByTestId("login-password")
  const loginButton = screen.getByRole("button")

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

// login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/index'; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

describe('Login', () => {
  it('should redirect to /dashboard on successful login', async () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));

    render(<Login />);

    userEvent.type(screen.getByPlaceholderText('Username'), 'admin');
    userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    userEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('loggedIn', 'true', { expires: 1 });
      expect(push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should show error on invalid login', async () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));

    render(<Login />);

    userEvent.type(screen.getByPlaceholderText('Username'), 'invalid');
    userEvent.type(screen.getByPlaceholderText('Password'), 'credentials');
    userEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
      expect(push).not.toHaveBeenCalled();
    });
  });
});

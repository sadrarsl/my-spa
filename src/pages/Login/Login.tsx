import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

/**
 * Login component renders a login form and handles user authentication.
 * @component
 * @returns {JSX.Element} The rendered Login component.
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { t } = useTranslation();

  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/private');
    } else {
      setError(t('invalidCredentials'));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t('login')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label={t('username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="password"
            label={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        <Button type="submit" color="primary" variant="contained" fullWidth>
          {t('login')}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
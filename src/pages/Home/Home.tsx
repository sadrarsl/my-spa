import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Home component renders the Home page with a welcome message.
 * @component
 * @returns {JSX.Element} The rendered Home component.
 */
const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="body1">
        {t('welcomeDescription')}
      </Typography>
    </Container>
  );
};

export default Home;

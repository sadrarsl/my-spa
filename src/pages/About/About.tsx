import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Map from '../../components/Map';

import { useTranslation } from 'react-i18next';
import { contactInfo } from '../../config/contact';

/**
 * About component renders the About Us page with contact information and a map.
 * @component
 * @returns {JSX.Element} The rendered About component.
 */
const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {t('about')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('aboutDescription')}
      </Typography>
      <Typography variant="h6">{t('contact')}</Typography>
      <Typography variant="body1">{contactInfo.address}</Typography>
      <Typography variant="body1">{contactInfo.phone}</Typography>
      <Box mt={4}>
        <Map address={contactInfo.address} />
      </Box>
    </Container>
  );
};

export default About;

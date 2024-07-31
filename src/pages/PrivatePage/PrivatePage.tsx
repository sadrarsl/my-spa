import React from 'react';
import { Container, Typography } from '@mui/material';
import PaginatedTable from '../../components/PaginatedTable';
import { useTranslation } from 'react-i18next';

const PrivatePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {t('privatePage')}
      </Typography>
      <PaginatedTable />
    </Container>
  );
};

export default PrivatePage;
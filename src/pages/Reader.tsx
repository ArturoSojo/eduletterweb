import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import EpubReader from '@/features/reader/components/EpubReader';

export default function Reader() {
  const { id } = useParams();

  return (
    <Container component="main" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Lector EPUB
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Mostrando el libro con ID: {id}
      </Typography>
      <Box sx={{ height: 480, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
        <EpubReader url="/sample.epub" />
      </Box>
    </Container>
  );
}

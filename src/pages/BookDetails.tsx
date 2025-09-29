import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  return (
    <Container component="main" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Detalles del libro
      </Typography>
      <Typography variant="body1">ID del libro: {id}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        En esta vista mostraremos información completa, vista previa del lector y recomendaciones relacionadas.
      </Typography>
    </Container>
  );
}

import { Container, Typography } from '@mui/material';

export default function Catalog() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Catálogo de libros
      </Typography>
      <Typography variant="body1">
        Aquí podrás descubrir títulos destacados, recomendaciones personalizadas y filtros avanzados.
      </Typography>
    </Container>
  );
}

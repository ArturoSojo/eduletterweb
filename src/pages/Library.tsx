import { Container, Typography } from '@mui/material';

export default function Library() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tu biblioteca
      </Typography>
      <Typography variant="body1">
        Aquí aparecerán tus libros guardados, descargas offline y recomendaciones personalizadas.
      </Typography>
    </Container>
  );
}

import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a Eduletter
      </Typography>
      <Typography variant="body1">
        Explora una experiencia de lectura y escucha impulsada por IA pensada para lectores modernos.
      </Typography>
    </Container>
  );
}

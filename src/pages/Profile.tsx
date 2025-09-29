import { Container, Typography } from '@mui/material';

export default function Profile() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil y ajustes
      </Typography>
      <Typography variant="body1">
        Gestiona tu cuenta, preferencias de lectura y suscripciones desde esta sección.
      </Typography>
    </Container>
  );
}

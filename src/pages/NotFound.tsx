import { Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h3" component="h1">
          Página no encontrada
        </Typography>
        <Typography variant="body1">
          La ruta que intentas visitar no existe o ha sido movida.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Volver al inicio
        </Button>
      </Stack>
    </Container>
  );
}

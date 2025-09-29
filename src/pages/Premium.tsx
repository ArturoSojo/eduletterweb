import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function Premium() {
  return (
    <Container component="main" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Eduletter Premium
          </Typography>
          <Typography variant="body1">
            Accede a resúmenes con IA, voces naturales, descargas extendidas y cero anuncios.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Button variant="contained" size="large">
            Suscripción mensual · 7,25€
          </Button>
          <Button variant="outlined" size="large">
            Suscripción anual · 78€
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

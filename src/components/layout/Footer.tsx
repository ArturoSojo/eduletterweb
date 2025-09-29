import { Container, Divider, Stack, Typography } from '@mui/material';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <Container component="footer" sx={{ py: 4 }}>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={1}>
        <Typography variant="body2">© {year} Eduletter. Todos los derechos reservados.</Typography>
        <Typography variant="caption" color="text.secondary">
          Construido con foco en accesibilidad, rendimiento y experiencias inteligentes de lectura.
        </Typography>
      </Stack>
    </Container>
  );
}

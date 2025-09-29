import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const links = [
  { to: '/catalog', label: 'Catálogo' },
  { to: '/library', label: 'Biblioteca' },
  { to: '/premium', label: 'Premium' }
];

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
          >
            Eduletter
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {links.map((link) => (
              <Button key={link.to} component={RouterLink} to={link.to} color="inherit">
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

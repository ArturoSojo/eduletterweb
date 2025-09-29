import { Card, CardContent, Typography } from '@mui/material';

export default function AiPanel() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Centro IA
        </Typography>
        <Typography variant="body2">
          Aquí se integrarán resúmenes inteligentes, preguntas y mapas conceptuales sin spoilers.
        </Typography>
      </CardContent>
    </Card>
  );
}

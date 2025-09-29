import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AudioPlayer from '@/features/audio/components/AudioPlayer';

export default function Audio() {
  const { id } = useParams();

  return (
    <Container component="main" sx={{ py: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Audiolibro
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Reproduciendo libro con ID: {id}
      </Typography>
      <AudioPlayer src="/sample.mp3" />
    </Container>
  );
}

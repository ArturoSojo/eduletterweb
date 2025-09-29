import { useMemo } from 'react';

interface Props {
  src: string;
}

export default function AudioPlayer({ src }: Props) {
  const key = useMemo(() => src, [src]);

  return (
    <audio key={key} controls preload="metadata" style={{ width: '100%' }}>
      <source src={src} type="audio/mpeg" />
      Tu navegador no soporta la reproducción de audio embebido.
    </audio>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '@/components/AudioPlayer';
import { useLibraryExperience } from '@/features/library/store/useLibraryExperience';
import { toast } from 'sonner';

export default function Audio() {
  const navigate = useNavigate();
  const {
    selectedBook,
    setActiveView
  } = useLibraryExperience((state) => ({
    selectedBook: state.selectedBook,
    setActiveView: state.setActiveView
  }));

  useEffect(() => {
    setActiveView('audio');
  }, [setActiveView]);

  useEffect(() => {
    if (!selectedBook) {
      toast.error('Selecciona un libro desde tu biblioteca');
      navigate('/library');
      return;
    }

    if (!selectedBook.hasAudio) {
      toast.error('Este libro no tiene version de audio disponible');
      navigate('/library');
    }
  }, [selectedBook, navigate]);

  if (!selectedBook || !selectedBook.hasAudio) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AudioPlayer
        book={selectedBook}
        onClose={() => {
          setActiveView('library');
          navigate('/library');
        }}
        onOpenReader={() => {
          setActiveView('reader');
          navigate(`/reader/${selectedBook.id}`);
        }}
      />
    </div>
  );
}

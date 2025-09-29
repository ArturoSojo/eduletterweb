import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookReader from '@/components/BookReader';
import { useLibraryExperience } from '@/features/library/store/useLibraryExperience';
import { toast } from 'sonner';

export default function Reader() {
  const navigate = useNavigate();
  const {
    selectedBook,
    setActiveView
  } = useLibraryExperience((state) => ({
    selectedBook: state.selectedBook,
    setActiveView: state.setActiveView
  }));

  useEffect(() => {
    setActiveView('reader');
  }, [setActiveView]);

  useEffect(() => {
    if (!selectedBook) {
      toast.error('Selecciona un libro desde tu biblioteca');
      navigate('/library');
    }
  }, [selectedBook, navigate]);

  if (!selectedBook) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <BookReader
        book={selectedBook}
        onClose={() => {
          setActiveView('library');
          navigate('/library');
        }}
        onPlayAudio={selectedBook.hasAudio ? () => {
          setActiveView('audio');
          navigate(`/audio/${selectedBook.id}`);
        } : undefined}
      />
    </div>
  );
}

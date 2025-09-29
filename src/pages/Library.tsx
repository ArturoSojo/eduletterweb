// src/pages/Library.tsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookLibrary from '@/components/BookLibrary';
import AIPanel from '@/components/AIPanel';
import ReadingStats from '@/components/ReadingStats';
import { type Book, useLibraryExperience } from '@/features/library/store/useLibraryExperience';
import { toast } from 'sonner';

export default function Library() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState<'library' | 'ai' | 'stats'>('library');

  // 🚫 Evita devolver un objeto desde el selector (causa snapshots distintos)
  const isPremium         = useLibraryExperience((s) => s.isPremium);
  const setSelectedBook   = useLibraryExperience((s) => s.setSelectedBook);
  const openPremiumModal  = useLibraryExperience((s) => s.openPremiumModal);
  const setActiveView     = useLibraryExperience((s) => s.setActiveView);
  const selectedBook      = useLibraryExperience((s) => s.selectedBook);

  const handleBookSelect = useCallback((book: Book) => {
    if (book.isPremium && !isPremium) {
      openPremiumModal();
      toast.error('Este libro requiere suscripción Premium');
      return;
    }
    setSelectedBook(book);
    setActiveView('reader');         // solo actualiza estado si cambia internamente
    if (location.pathname !== `/reader/${book.id}`) {
      navigate(`/reader/${book.id}`);
    }
    toast.success(`Abriendo "${book.title}"`);
  }, [isPremium, openPremiumModal, setSelectedBook, setActiveView, navigate]);

  const handlePlayAudio = useCallback((book: Book) => {
    if (book.isPremium && !isPremium) {
      openPremiumModal();
      toast.error('El audio de este libro requiere suscripción Premium');
      return;
    }
    if (!book.hasAudio) {
      toast.error('Este libro no tiene versión de audio disponible');
      return;
    }
    setSelectedBook(book);
    setActiveView('audio');
    if (location.pathname !== `/audio/${book.id}`) {
      navigate(`/audio/${book.id}`);
    }
    toast.success(`Reproduciendo "${book.title}"`);
  }, [isPremium, openPremiumModal, setSelectedBook, setActiveView, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setPanel('ai')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                panel === 'ai' ? 'bg-eduletter-accent text-white' : 'hover:bg-muted'
              }`}
            >
              IA Premium
            </button>
            <button
              onClick={() => setPanel('stats')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                panel === 'stats' ? 'bg-eduletter-accent text-white' : 'hover:bg-muted'
              }`}
            >
              Estadísticas
            </button>
            <button
              onClick={() => setPanel('library')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                panel === 'library' ? 'bg-eduletter-brand text-white' : 'hover:bg-muted'
              }`}
            >
              Biblioteca
            </button>
          </div>
        </div>
      </div>

      <main className="relative">
        {panel === 'library' && (
          <BookLibrary
            onBookSelect={handleBookSelect}
            onPlayAudio={handlePlayAudio}
            isPremium={isPremium}
          />
        )}
        {panel === 'ai' && (
          <AIPanel
            currentBook={selectedBook ?? undefined}
            isPremium={isPremium}
            onUpgrade={openPremiumModal}
          />
        )}
        {panel === 'stats' && <ReadingStats isPremium={isPremium} />}
      </main>
    </div>
  );
}

// src/app/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import BookDetails from '@/pages/BookDetails';
import Reader from '@/pages/Reader';
import Audio from '@/pages/Audio';
import Library from '@/pages/Library';
import Profile from '@/pages/Profile';
import Premium from '@/pages/Premium';
import NotFound from '@/pages/NotFound';

import OnboardingFlow from '@/components/OnboardingFlow';
import PremiumModal from '@/components/PremiumModal';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import {
  type ExperienceView,
  type OnboardingPreferences,
  useLibraryExperience,
} from '@/features/library/store/useLibraryExperience';
import { useAppStore } from '@/store/app.store';

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // --- Selecciones separadas de Zustand (evita snapshots nuevos en cada render)
  const activeView         = useLibraryExperience((s) => s.activeView);
  const setActiveView      = useLibraryExperience((s) => s.setActiveView);
  const isPremium          = useLibraryExperience((s) => s.isPremium);
  const showPremiumModal   = useLibraryExperience((s) => s.showPremiumModal);
  const closePremiumModal  = useLibraryExperience((s) => s.closePremiumModal);
  const upgradeToPremium   = useLibraryExperience((s) => s.upgradeToPremium);
  const openPremiumModal   = useLibraryExperience((s) => s.openPremiumModal);
  const selectedBook       = useLibraryExperience((s) => s.selectedBook);
  const setUserPreferences = useLibraryExperience((s) => s.setUserPreferences);

  const setTheme = useAppStore((state) => state.setTheme);

  // Primera visita → Onboarding
  useEffect(() => {
    const hasVisited = localStorage.getItem('eduletter_visited');
    setShowOnboarding(!hasVisited);
  }, []);

  // URL -> estado (sin dependencia de activeView para evitar doble ejecución)
  useEffect(() => {
    const path = location.pathname;
    let derivedView: ExperienceView =
      path.startsWith('/reader')  ? 'reader'  :
      path.startsWith('/audio')   ? 'audio'   :
      path.startsWith('/profile') ? 'settings':
      path.startsWith('/library') ? 'library' :
      'library';

    setActiveView(derivedView);
  }, [location.pathname, setActiveView]);

  const handleOnboardingComplete = (preferences: OnboardingPreferences) => {
    setUserPreferences(preferences);
    setTheme(preferences.theme);
    localStorage.setItem('eduletter_visited', 'true');
    setShowOnboarding(false);

    document.documentElement.classList.toggle('dark', preferences.theme === 'dark');

    toast.success('¡Configuración guardada! Bienvenido a Eduletter 🎉');
    navigate('/library');
  };

  const handlePremiumClick = () => {
    if (isPremium) {
      toast.success('Ya eres usuario Premium');
    } else {
      openPremiumModal();
    }
  };

  // Navegación segura (no repite navegación al mismo path)
  const safeNav = (to: string) => {
    if (location.pathname !== to) navigate(to);
  };

  const handleViewChange = (view: ExperienceView) => {
    if (view === 'reader') {
      if (!selectedBook) {
        toast.error('Selecciona un libro desde tu biblioteca');
        return;
      }
      safeNav(`/reader/${selectedBook.id}`);
    } else if (view === 'audio') {
      if (!selectedBook || !selectedBook.hasAudio) {
        toast.error('Elige un libro con audio disponible');
        return;
      }
      safeNav(`/audio/${selectedBook.id}`);
    } else if (view === 'settings') {
      safeNav('/profile');
    } else {
      safeNav('/library');
    }

    setActiveView(view);
  };

  if (showOnboarding) {
    return (
      <>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <Header
        currentView={activeView}
        setCurrentView={handleViewChange}
        isPremium={isPremium}
        onPremiumClick={handlePremiumClick}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/reader/:id" element={<Reader />} />
        <Route path="/audio/:id" element={<Audio />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={closePremiumModal}
        onUpgrade={() => {
          upgradeToPremium();
          toast.success('¡Bienvenido a Eduletter Premium! 🎉');
        }}
      />

      <Toaster position="top-right" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </BrowserRouter>
  );
}

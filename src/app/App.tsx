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
import { ExperienceView, OnboardingPreferences, useLibraryExperience } from '@/features/library/store/useLibraryExperience';
import { useAppStore } from '@/store/app.store';

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const {
    activeView,
    setActiveView,
    isPremium,
    showPremiumModal,
    closePremiumModal,
    upgradeToPremium,
    openPremiumModal,
    selectedBook,
    setUserPreferences
  } = useLibraryExperience((state) => ({
    activeView: state.activeView,
    setActiveView: state.setActiveView,
    isPremium: state.isPremium,
    showPremiumModal: state.showPremiumModal,
    closePremiumModal: state.closePremiumModal,
    upgradeToPremium: state.upgradeToPremium,
    openPremiumModal: state.openPremiumModal,
    selectedBook: state.selectedBook,
    setUserPreferences: state.setUserPreferences
  }));
  const setTheme = useAppStore((state) => state.setTheme);

  useEffect(() => {
    const hasVisited = localStorage.getItem('eduletter_visited');
    setShowOnboarding(!hasVisited);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    let derivedView: ExperienceView = 'library';

    if (path.startsWith('/reader')) {
      derivedView = 'reader';
    } else if (path.startsWith('/audio')) {
      derivedView = 'audio';
    } else if (path.startsWith('/profile')) {
      derivedView = 'settings';
    } else if (path.startsWith('/library')) {
      derivedView = 'library';
    }

    if (derivedView !== activeView) {
      setActiveView(derivedView);
    }
  }, [location.pathname, activeView, setActiveView]);

  const handleOnboardingComplete = (preferences: OnboardingPreferences) => {
    setUserPreferences(preferences);
    setTheme(preferences.theme);
    localStorage.setItem('eduletter_visited', 'true');
    setShowOnboarding(false);

    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    toast.success('Configuracion guardada! Bienvenido a Eduletter!');
    navigate('/library');
  };

  const handlePremiumClick = () => {
    if (isPremium) {
      toast.success('Ya eres usuario Premium');
    } else {
      openPremiumModal();
    }
  };

  const handleViewChange = (view: ExperienceView) => {
    if (view === 'reader') {
      if (!selectedBook) {
        toast.error('Selecciona un libro desde tu biblioteca');
        return;
      }
      navigate(`/reader/${selectedBook.id}`);
    } else if (view === 'audio') {
      if (!selectedBook || !selectedBook.hasAudio) {
        toast.error('Elige un libro con audio disponible');
        return;
      }
      navigate(`/audio/${selectedBook.id}`);
    } else if (view === 'settings') {
      navigate('/profile');
    } else {
      navigate('/library');
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
          toast.success('Bienvenido a Eduletter Premium!');
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

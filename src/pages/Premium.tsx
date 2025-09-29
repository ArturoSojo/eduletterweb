import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibraryExperience } from '@/features/library/store/useLibraryExperience';

export default function Premium() {
  const navigate = useNavigate();
  const { openPremiumModal, isPremium } = useLibraryExperience((state) => ({
    openPremiumModal: state.openPremiumModal,
    isPremium: state.isPremium
  }));

  useEffect(() => {
    if (isPremium) {
      navigate('/library');
      return;
    }

    openPremiumModal();
  }, [openPremiumModal, isPremium, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">
        Explora los beneficios de Eduletter Premium en la ventana emergente.
      </p>
    </div>
  );
}

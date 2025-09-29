import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsPanel from '@/components/SettingsPanel';
import { useLibraryExperience } from '@/features/library/store/useLibraryExperience';

export default function Profile() {
  const navigate = useNavigate();
  const setActiveView = useLibraryExperience((state) => state.setActiveView);

  useEffect(() => {
    setActiveView('settings');
  }, [setActiveView]);

  return (
    <div className="min-h-screen bg-background">
      <SettingsPanel
        onClose={() => {
          setActiveView('library');
          navigate('/library');
        }}
      />
    </div>
  );
}

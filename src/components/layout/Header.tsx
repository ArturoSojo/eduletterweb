import { Search, User, Settings, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isPremium: boolean;
  onPremiumClick: () => void;
}

export default function Header({ currentView, setCurrentView, isPremium, onPremiumClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setCurrentView('library')}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-eduletter-brand rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-1 bg-white rounded-full mb-0.5 opacity-60" />
                    <div className="w-4 h-0.5 bg-eduletter-accent rounded-full" />
                    <div className="w-5 h-0.5 bg-eduletter-accent rounded-full mt-0.5" />
                    <div className="w-3 h-0.5 bg-eduletter-accent-orange rounded-full mt-0.5" />
                  </div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-eduletter-brand dark:text-white">eduletter</h1>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <Button
                variant={currentView === 'library' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('library')}
                className={currentView === 'library' ? 'bg-eduletter-brand text-white' : ''}
              >
                Biblioteca
              </Button>
              <Button
                variant={currentView === 'reader' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('reader')}
                className={currentView === 'reader' ? 'bg-eduletter-brand text-white' : ''}
              >
                Lector
              </Button>
              <Button
                variant={currentView === 'audio' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('audio')}
                className={currentView === 'audio' ? 'bg-eduletter-brand text-white' : ''}
              >
                Audio
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar libros..."
                className="pl-10 w-64"
              />
            </div>
            
            <Button
              variant={isPremium ? "default" : "outline"}
              size="sm"
              onClick={onPremiumClick}
              className={isPremium ? "bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange hover:opacity-90 text-white border-0" : "border-eduletter-brand text-eduletter-brand hover:bg-eduletter-brand hover:text-white"}
            >
              <Crown className="w-4 h-4 mr-2" />
              {isPremium ? 'Premium' : 'Upgrade'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
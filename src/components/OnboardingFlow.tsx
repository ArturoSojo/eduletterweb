import { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Headphones, Brain, Palette, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingFlowProps {
  onComplete: (preferences: OnboardingPreferences) => void;
}

interface OnboardingPreferences {
  theme: 'light' | 'dark' | 'sepia';
  language: string;
  interests: string[];
  readingGoal: 'casual' | 'moderate' | 'intensive';
  preferredFormat: 'text' | 'audio' | 'both';
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<OnboardingPreferences>({
    theme: 'light',
    language: 'es',
    interests: [],
    readingGoal: 'moderate',
    preferredFormat: 'both'
  });

  const steps = [
    {
      id: 'welcome',
      title: '¡Bienvenido a Eduletter!',
      subtitle: 'Tu nueva experiencia de lectura inteligente',
      icon: BookOpen
    },
    {
      id: 'theme',
      title: 'Elige tu tema',
      subtitle: 'Personaliza la apariencia según tus preferencias',
      icon: Palette
    },
    {
      id: 'language',
      title: 'Selecciona tu idioma',
      subtitle: 'Configura el idioma de la interfaz',
      icon: Globe
    },
    {
      id: 'interests',
      title: 'Tus intereses',
      subtitle: 'Ayúdanos a recomendarte el mejor contenido',
      icon: Brain
    },
    {
      id: 'goals',
      title: 'Tu meta de lectura',
      subtitle: '¿Con qué frecuencia planeas leer?',
      icon: BookOpen
    },
    {
      id: 'format',
      title: 'Formato preferido',
      subtitle: '¿Prefieres leer, escuchar o ambos?',
      icon: Headphones
    }
  ];

  const interests = [
    'Tecnología', 'Ciencia', 'Historia', 'Filosofía', 'Arte', 'Música',
    'Negocios', 'Salud', 'Cocina', 'Viajes', 'Deportes', 'Literatura',
    'Psicología', 'Desarrollo Personal', 'Educación', 'Medio Ambiente'
  ];

  const themes = [
    { id: 'light', name: 'Claro', preview: 'bg-white border-gray-200' },
    { id: 'dark', name: 'Oscuro', preview: 'bg-gray-900 border-gray-700' },
    { id: 'sepia', name: 'Sepia', preview: 'bg-amber-50 border-amber-200' }
  ];

  const languages = [
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const readingGoals = [
    { id: 'casual', name: 'Casual', description: '2-3 veces por semana', icon: '📚' },
    { id: 'moderate', name: 'Moderado', description: 'Diariamente, 30-60 min', icon: '📖' },
    { id: 'intensive', name: 'Intensivo', description: 'Varias horas al día', icon: '🎯' }
  ];

  const formats = [
    { id: 'text', name: 'Solo lectura', description: 'Prefiero leer texto', icon: BookOpen },
    { id: 'audio', name: 'Solo audio', description: 'Prefiero audiolibros', icon: Headphones },
    { id: 'both', name: 'Ambos formatos', description: 'Me gusta alternar', icon: Brain }
  ];

  const updatePreference = (key: keyof OnboardingPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canContinue = () => {
    switch (currentStep) {
      case 3: // interests
        return preferences.interests.length >= 3;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-eduletter-brand">¡Bienvenido a Eduletter!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Descubre una nueva forma de leer y escuchar libros con la ayuda de inteligencia artificial
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4">
                <BookOpen className="w-8 h-8 text-eduletter-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Lectura fluida</h3>
                <p className="text-sm text-muted-foreground">Experiencia inmersiva con animaciones realistas</p>
              </div>
              <div className="text-center p-4">
                <Headphones className="w-8 h-8 text-eduletter-accent-orange mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Audiolibros</h3>
                <p className="text-sm text-muted-foreground">Sincronización perfecta entre texto y audio</p>
              </div>
              <div className="text-center p-4">
                <Brain className="w-8 h-8 text-eduletter-brand mx-auto mb-2" />
                <h3 className="font-semibold mb-1">IA integrada</h3>
                <p className="text-sm text-muted-foreground">Resúmenes, mapas y recomendaciones</p>
              </div>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      preferences.theme === theme.id 
                        ? 'ring-2 ring-eduletter-accent' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => updatePreference('theme', theme.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-lg border-2 mx-auto mb-3 ${theme.preview}`} />
                      <h3 className="font-semibold">{theme.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((language) => (
                <motion.div
                  key={language.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      preferences.language === language.id 
                        ? 'ring-2 ring-eduletter-accent' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => updatePreference('language', language.id)}
                  >
                    <CardContent className="p-6 flex items-center space-x-4">
                      <span className="text-3xl">{language.flag}</span>
                      <h3 className="font-semibold text-lg">{language.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Selecciona al menos 3 temas que te interesen para recibir mejores recomendaciones
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map((interest) => (
                <motion.div
                  key={interest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={preferences.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer p-3 w-full justify-center transition-all ${
                      preferences.interests.includes(interest)
                        ? 'bg-eduletter-accent text-white hover:bg-eduletter-accent/90'
                        : 'hover:bg-eduletter-accent/10'
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                </motion.div>
              ))}
            </div>
            {preferences.interests.length > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {preferences.interests.length}/3+ seleccionados
              </p>
            )}
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {readingGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      preferences.readingGoal === goal.id 
                        ? 'ring-2 ring-eduletter-accent' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => updatePreference('readingGoal', goal.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{goal.icon}</div>
                      <h3 className="font-semibold mb-2">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'format':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formats.map((format) => (
                <motion.div
                  key={format.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      preferences.preferredFormat === format.id 
                        ? 'ring-2 ring-eduletter-accent' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => updatePreference('preferredFormat', format.id)}
                  >
                    <CardContent className="p-6 text-center">
                      {(() => {
                        const FormatIcon = format.icon;
                        return <FormatIcon className="w-12 h-12 text-eduletter-accent mx-auto mb-3" />;
                      })()}
                      <h3 className="font-semibold mb-2">{format.name}</h3>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  {(() => {
                    const StepIcon = steps[currentStep].icon;
                    return <StepIcon className="w-12 h-12 text-eduletter-accent mx-auto mb-4" />;
                  })()}
                  <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
                  <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
                </div>
                
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canContinue()}
            className="flex items-center space-x-2 bg-eduletter-accent hover:bg-eduletter-accent/90 text-white"
          >
            <span>{currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
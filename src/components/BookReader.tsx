import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Settings, Bookmark, Play, Sun, Moon, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './ui/badge';

interface Book {
  id: string;
  title: string;
  author: string;
  content?: string[];
}

interface ReaderSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'sepia';
  fontFamily: 'serif' | 'sans' | 'mono';
  lineHeight: number;
  margin: number;
}

interface BookReaderProps {
  book: Book | null;
  onClose: () => void;
  onPlayAudio?: () => void;
}

export default function BookReader({ book, onClose, onPlayAudio }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 16,
    theme: 'light',
    fontFamily: 'serif',
    lineHeight: 1.6,
    margin: 20
  });

  // Contenido de ejemplo para el libro
  const sampleContent = [
    "En el vasto universo digital de hoy, la estrategia y la táctica han evolucionado más allá de los campos de batalla tradicionales. Las empresas ahora luchan por la atención, los datos y la confianza del consumidor en un terreno que cambia constantemente.",
    "La primera ley de la guerra digital es conocer tu terreno. El paisaje digital no es solo internet; es un ecosistema complejo de plataformas, algoritmos, datos y comportamientos humanos que interactúan de maneras impredecibles.",
    "Las herramientas del guerrero digital moderno incluyen análisis de datos, inteligencia artificial, automatización y, lo más importante, la capacidad de adaptarse rápidamente a los cambios. La velocidad de decisión es ahora más crucial que nunca.",
    "La información es poder, pero la información procesada y aplicada inteligentemente es la verdadera ventaja competitiva. En esta era, quien controla los datos y sabe interpretarlos correctamente, controla el futuro.",
    "La defensa en el mundo digital requiere una mentalidad completamente nueva. No basta con construir muros altos; hay que crear sistemas que puedan evolucionar, aprender y responder a amenazas que aún no existen.",
    "El elemento humano sigue siendo el factor más impredecible y poderoso en cualquier estrategia digital. La tecnología amplifica las capacidades humanas, pero no puede reemplazar la intuición, la creatividad y la sabiduría."
  ];

  const content = book?.content || sampleContent;
  const totalPages = content.length;

  useEffect(() => {
    // Simular sonido de página
    if (isFlipping) {
      const audio = new Audio();
      // En un entorno real, aquí cargarías un archivo de sonido
      setTimeout(() => setIsFlipping(false), 600);
    }
  }, [isFlipping]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => setCurrentPage(currentPage + 1), 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => setCurrentPage(currentPage - 1), 300);
    }
  };

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getFontFamily = () => {
    switch (settings.fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-serif';
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Selecciona un libro para comenzar a leer</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Header del lector */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Biblioteca
              </Button>
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {currentPage + 1} / {totalPages}
              </Badge>
              
              {onPlayAudio && (
                <Button variant="outline" size="sm" onClick={onPlayAudio}>
                  <Play className="w-4 h-4 mr-2" />
                  Audio
                </Button>
              )}
              
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de configuración */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-16 z-40 bg-background border-b"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tamaño de fuente</label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, fontSize: value[0] }))}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <span className="text-xs text-muted-foreground">{settings.fontSize}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tema</label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={settings.theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                    >
                      <Sun className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={settings.theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                    >
                      <Moon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={settings.theme === 'sepia' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'sepia' }))}
                    >
                      Sepia
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tipografía</label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={settings.fontFamily === 'serif' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, fontFamily: 'serif' }))}
                    >
                      Serif
                    </Button>
                    <Button
                      size="sm"
                      variant={settings.fontFamily === 'sans' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, fontFamily: 'sans' }))}
                    >
                      Sans
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interlineado</label>
                  <Slider
                    value={[settings.lineHeight]}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, lineHeight: value[0] }))}
                    min={1.2}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <span className="text-xs text-muted-foreground">{settings.lineHeight.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ 
                  rotateY: flipDirection === 'next' ? 90 : -90,
                  opacity: 0 
                }}
                animate={{ 
                  rotateY: 0,
                  opacity: 1 
                }}
                exit={{ 
                  rotateY: flipDirection === 'next' ? -90 : 90,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="transform-style-preserve-3d"
              >
                <Card className={`min-h-[600px] ${getThemeClasses()} border-0 shadow-lg`}>
                  <CardContent 
                    className="p-12"
                    style={{ 
                      fontSize: `${settings.fontSize}px`,
                      lineHeight: settings.lineHeight,
                      margin: `${settings.margin}px`
                    }}
                  >
                    <div className={`${getFontFamily()} leading-relaxed`}>
                      <p className="mb-6 text-justify">
                        {content[currentPage]}
                      </p>
                      
                      {/* Número de página */}
                      <div className="absolute bottom-6 right-6 text-sm text-muted-foreground">
                        Página {currentPage + 1}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentPage + 1) / totalPages) * 100)}% completado
              </span>
            </div>

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center space-x-2"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
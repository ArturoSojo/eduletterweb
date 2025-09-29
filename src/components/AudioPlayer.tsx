import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
}

interface AudioPlayerProps {
  book: Book | null;
  onClose: () => void;
  onOpenReader?: () => void;
}

export default function AudioPlayer({ book, onClose, onOpenReader }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(3847); // Duración en segundos (ejemplo: 1h 4min)
  const [volume, setVolume] = useState([70]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentChapter, setCurrentChapter] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout>();

  const chapters = [
    { id: 1, title: "Introducción al Arte Digital", duration: 547 },
    { id: 2, title: "Principios Fundamentales", duration: 612 },
    { id: 3, title: "Estrategias Avanzadas", duration: 789 },
    { id: 4, title: "Implementación Práctica", duration: 634 },
    { id: 5, title: "Casos de Estudio", duration: 723 },
    { id: 6, title: "El Futuro Digital", duration: 542 }
  ];

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTime(prev => Math.min(prev + 30, duration));
  };

  const skipBackward = () => {
    setCurrentTime(prev => Math.max(prev - 30, 0));
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const currentChapterInfo = chapters.find(ch => ch.id === currentChapter);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Selecciona un audiolibro para comenzar a escuchar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Biblioteca
            </Button>
            <h3 className="font-semibold">Reproductor de Audio</h3>
            <div className="flex space-x-2">
              {onOpenReader && (
                <Button variant="outline" size="sm" onClick={onOpenReader}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Leer
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Cover Art */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="relative mx-auto w-80 h-80 mb-6">
              <ImageWithFallback
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              {/* Animación de ondas sonoras cuando está reproduciendo */}
              {isPlaying && (
                <div className="absolute inset-0 rounded-2xl border-4 border-eduletter-accent animate-pulse" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-muted-foreground mb-1">{book.author}</p>
            <Badge variant="outline">
              Capítulo {currentChapter}: {currentChapterInfo?.title}
            </Badge>
          </motion.div>

          {/* Player Controls */}
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleProgressChange}
                  max={duration}
                  step={1}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={skipBackward}
                  className="w-12 h-12"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange hover:opacity-90"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={skipForward}
                  className="w-12 h-12"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              {/* Secondary Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Volumen</label>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {volume[0]}%
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Velocidad</label>
                  <div className="flex space-x-1">
                    {speedOptions.map((speed) => (
                      <Button
                        key={speed}
                        variant={playbackSpeed === speed ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPlaybackSpeed(speed)}
                        className="text-xs"
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chapter List */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Capítulos</h3>
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <motion.div
                    key={chapter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={currentChapter === chapter.id ? "default" : "ghost"}
                      className="w-full justify-between h-auto p-3"
                      onClick={() => setCurrentChapter(chapter.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">
                          Capítulo {chapter.id}: {chapter.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(chapter.duration)}
                        </div>
                      </div>
                      {currentChapter === chapter.id && isPlaying && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-current animate-pulse" />
                          <div className="w-1 h-4 bg-current animate-pulse delay-100" />
                          <div className="w-1 h-4 bg-current animate-pulse delay-200" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
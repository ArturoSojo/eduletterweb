import { useState } from 'react';
import { Play, Download, Heart, Star, BookOpen, Users, Award, TrendingUp, Calendar, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  rating: number;
  isPremium: boolean;
  hasAudio: boolean;
  isDownloaded: boolean;
  isFavorite: boolean;
  genre: string;
  readCount?: number;
  isMonthlyPick?: boolean;
  isNewRelease?: boolean;
  publishedDate?: string;
}

interface BookLibraryProps {
  onBookSelect: (book: Book) => void;
  onPlayAudio: (book: Book) => void;
  isPremium: boolean;
}

export default function BookLibrary({ onBookSelect, onPlayAudio, isPremium }: BookLibraryProps) {
  const [activeTab, setActiveTab] = useState('inicio');

  const books: Book[] = [
    {
      id: '1',
      title: 'El Arte de la Guerra Digital',
      author: 'Marcus Chen',
      cover: 'https://images.unsplash.com/photo-1667281852305-4af0258748e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2slMjBjb3ZlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMTA1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 45,
      rating: 4.8,
      isPremium: true,
      hasAudio: true,
      isDownloaded: true,
      isFavorite: true,
      genre: 'Tecnología',
      readCount: 1245,
      isMonthlyPick: true
    },
    {
      id: '2',
      title: 'Mindfulness para Principiantes',
      author: 'Ana Sofía López',
      cover: 'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzJTIwbW9kZXJuJTIwbGlicmFyeXxlbnwxfHx8fDE3NTkxMTA1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 78,
      rating: 4.6,
      isPremium: false,
      hasAudio: true,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Bienestar',
      readCount: 890
    },
    {
      id: '3',
      title: 'Inteligencia Artificial Explicada',
      author: 'Dr. Roberto Martínez',
      cover: 'https://images.unsplash.com/photo-1612570328404-fc96e7ba6d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NTkxMDM5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 12,
      rating: 4.9,
      isPremium: true,
      hasAudio: false,
      isDownloaded: false,
      isFavorite: true,
      genre: 'Ciencia',
      readCount: 2134,
      isNewRelease: true
    },
    {
      id: '4',
      title: 'Historia del Futuro',
      author: 'Elena Rodríguez',
      cover: 'https://images.unsplash.com/photo-1681566715515-42b2aa04a0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMHZpbnRhZ2UlMjBjb3ZlcnxlbnwxfHx8fDE3NTkxMTA1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 0,
      rating: 4.7,
      isPremium: false,
      hasAudio: true,
      isDownloaded: true,
      isFavorite: false,
      genre: 'Historia',
      readCount: 567
    },
    {
      id: '5',
      title: 'Cocina Molecular Básica',
      author: 'Chef Gabriel Santos',
      cover: 'https://images.unsplash.com/photo-1578338705925-51b521fb2e3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9vayUyMGN1bGluYXJ5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1OTExMDU5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 33,
      rating: 4.5,
      isPremium: true,
      hasAudio: false,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Gastronomía',
      readCount: 423
    },
    {
      id: '6',
      title: 'Viajes en el Tiempo',
      author: 'Prof. David Kim',
      cover: 'https://images.unsplash.com/photo-1612570328404-fc96e7ba6d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NTkxMDM5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 67,
      rating: 4.8,
      isPremium: false,
      hasAudio: true,
      isDownloaded: true,
      isFavorite: true,
      genre: 'Física',
      readCount: 1876
    },
    {
      id: '7',
      title: 'La Revolución del Marketing',
      author: 'Marcus Chen',
      cover: 'https://images.unsplash.com/photo-1667281852305-4af0258748e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2slMjBjb3ZlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMTA1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 0,
      rating: 4.7,
      isPremium: true,
      hasAudio: true,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Negocios',
      readCount: 945
    },
    {
      id: '8',
      title: 'Secretos de la Mente',
      author: 'Dr. Roberto Martínez',
      cover: 'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzJTIwbW9kZXJuJTIwbGlicmFyeXxlbnwxfHx8fDE3NTkxMTA1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 0,
      rating: 4.9,
      isPremium: false,
      hasAudio: false,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Psicología',
      readCount: 1567
    },
    {
      id: '9',
      title: 'El Último Reino',
      author: 'Elena Rodríguez',
      cover: 'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3ZlbCUyMGZpY3Rpb24lMjBib29rJTIwY292ZXIlMjBhcnRpc3RpY3xlbnwxfHx8fDE3NTkxMTA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 0,
      rating: 4.6,
      isPremium: true,
      hasAudio: true,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Ficción',
      readCount: 789,
      isNewRelease: true
    },
    {
      id: '10',
      title: 'Yoga para la Vida',
      author: 'Ana Sofía López',
      cover: 'https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzJTIwbW9kZXJuJTIwbGlicmFyeXxlbnwxfHx8fDE3NTkxMTA1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 0,
      rating: 4.5,
      isPremium: false,
      hasAudio: true,
      isDownloaded: false,
      isFavorite: false,
      genre: 'Bienestar',
      readCount: 634
    }
  ];

  const categories = Array.from(new Set(books.map(book => book.genre)));
  const authors = Array.from(new Set(books.map(book => book.author)));

  const BookCard = ({ book, isCompact = false }: { book: Book; isCompact?: boolean }) => (
    <div className={`group cursor-pointer ${isCompact ? 'min-w-32' : ''}`}
      onClick={() => {
        if (book.isPremium && !isPremium) return;
        onBookSelect(book);
      }}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            <ImageWithFallback
              src={book.cover}
              alt={book.title}
              className={`w-full ${isCompact ? 'aspect-[2/3]' : 'aspect-[3/4]'} object-cover`}
            />
            
            {/* Premium overlay */}
            {book.isPremium && !isPremium && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge className="bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
            )}
            
            {/* Special badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {book.isMonthlyPick && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Selección del mes
                </Badge>
              )}
              {book.isNewRelease && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                  Nuevo
                </Badge>
              )}
            </div>
            
            {/* Hover overlay with controls */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" onClick={(e) => {
                  e.stopPropagation();
                  onBookSelect(book);
                }}>
                  Leer
                </Button>
                {book.hasAudio && (
                  <Button size="sm" variant="secondary" onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio(book);
                  }}>
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {book.isFavorite && (
                <Badge variant="secondary" className="w-fit">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </Badge>
              )}
              {book.isDownloaded && (
                <Badge variant="secondary" className="w-fit">
                  <Download className="w-3 h-3 text-green-500" />
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs">{book.rating}</span>
              </Badge>
            </div>

            {/* Progress bar */}
            {book.progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0">
                <Progress value={book.progress} className="h-1 rounded-none" />
              </div>
            )}
          </div>
          
          <div className="p-3">
            <h4 className={`font-semibold line-clamp-2 mb-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {book.title}
            </h4>
            <p className={`text-muted-foreground line-clamp-1 mb-1 ${isCompact ? 'text-xs' : 'text-xs'}`}>
              {book.author}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {book.genre}
              </Badge>
              {book.readCount && (
                <span className="text-xs text-muted-foreground">
                  {book.readCount} lectores
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BookSection = ({ title, books, icon }: { title: string; books: Book[]; icon?: React.ReactNode }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isCompact />
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const getTopRatedBooks = () => books.filter(book => book.rating >= 4.7).sort((a, b) => b.rating - a.rating);
  const getMostReadBooks = () => books.filter(book => book.readCount).sort((a, b) => (b.readCount || 0) - (a.readCount || 0));
  const getNewReleases = () => books.filter(book => book.isNewRelease);
  const getMonthlyPicks = () => books.filter(book => book.isMonthlyPick);
  const getContinueReading = () => books.filter(book => book.progress > 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Tu Biblioteca</h2>
        <p className="text-muted-foreground">Descubre y organiza tu colección de libros</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="inicio" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Inicio
          </TabsTrigger>
          <TabsTrigger value="categorias" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Categorías
          </TabsTrigger>
          <TabsTrigger value="autores" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Autores
          </TabsTrigger>
          <TabsTrigger value="biblioteca" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Mi Biblioteca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inicio" className="space-y-6">
          {/* Continuar leyendo */}
          {getContinueReading().length > 0 && (
            <BookSection 
              title="Continuar leyendo" 
              books={getContinueReading()}
              icon={<BookOpen className="w-5 h-5 text-eduletter-accent" />}
            />
          )}

          {/* Selección del mes */}
          {getMonthlyPicks().length > 0 && (
            <BookSection 
              title="Selección del mes" 
              books={getMonthlyPicks()}
              icon={<Award className="w-5 h-5 text-yellow-500" />}
            />
          )}

          {/* Más leídos */}
          <BookSection 
            title="Más leídos" 
            books={getMostReadBooks()}
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          />

          {/* Mejor valorados */}
          <BookSection 
            title="Mejor valorados" 
            books={getTopRatedBooks()}
            icon={<Star className="w-5 h-5 text-yellow-500" />}
          />

          {/* Novedades */}
          {getNewReleases().length > 0 && (
            <BookSection 
              title="Novedades" 
              books={getNewReleases()}
              icon={<Calendar className="w-5 h-5 text-blue-500" />}
            />
          )}
        </TabsContent>

        <TabsContent value="categorias" className="space-y-6">
          {categories.map(category => {
            const categoryBooks = books.filter(book => book.genre === category);
            return (
              <BookSection 
                key={category}
                title={category} 
                books={categoryBooks}
              />
            );
          })}
        </TabsContent>

        <TabsContent value="autores" className="space-y-6">
          {authors.map(author => {
            const authorBooks = books.filter(book => book.author === author);
            return (
              <BookSection 
                key={author}
                title={author} 
                books={authorBooks}
                icon={<Users className="w-5 h-5 text-eduletter-brand" />}
              />
            );
          })}
        </TabsContent>

        <TabsContent value="biblioteca">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
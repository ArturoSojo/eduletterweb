import { TrendingUp, Clock, BookOpen, Target, Award, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface ReadingStatsProps {
  isPremium: boolean;
}

export default function ReadingStats({ isPremium }: ReadingStatsProps) {
  const stats = {
    readingStreak: 7,
    booksCompleted: 23,
    totalMinutes: 2847,
    weeklyGoal: 150,
    weeklyProgress: 120,
    averageSpeed: 285,
    genres: [
      { name: 'Tecnología', count: 8, color: 'bg-eduletter-accent' },
      { name: 'Ciencia', count: 6, color: 'bg-eduletter-accent-orange' },
      { name: 'Historia', count: 5, color: 'bg-eduletter-brand' },
      { name: 'Bienestar', count: 4, color: 'bg-blue-500' }
    ]
  };

  const achievements = [
    { id: 1, name: 'Lector Constante', description: '7 días seguidos leyendo', icon: Zap, unlocked: true },
    { id: 2, name: 'Explorador', description: '5 géneros diferentes', icon: BookOpen, unlocked: true },
    { id: 3, name: 'Velocista', description: '300+ palabras por minuto', icon: TrendingUp, unlocked: false },
    { id: 4, name: 'Maratonista', description: '50 libros completados', icon: Target, unlocked: false }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Estadísticas de Lectura</h2>
          <p className="text-muted-foreground">Sigue tu progreso y mejora tus hábitos de lectura</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-eduletter-accent/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-eduletter-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Racha actual</p>
                    <p className="text-2xl font-bold">{stats.readingStreak} días</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-eduletter-accent-orange/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-eduletter-accent-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Libros completados</p>
                    <p className="text-2xl font-bold">{stats.booksCompleted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-eduletter-brand/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-eduletter-brand" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tiempo total</p>
                    <p className="text-2xl font-bold">{formatTime(stats.totalMinutes)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Velocidad promedio</p>
                    <p className="text-2xl font-bold">{stats.averageSpeed} <span className="text-sm font-normal">ppm</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meta semanal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-eduletter-accent" />
                <span>Meta Semanal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Progreso esta semana</span>
                  <span className="font-semibold">{stats.weeklyProgress}/{stats.weeklyGoal} min</span>
                </div>
                <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  ¡Vas genial! Te faltan solo {stats.weeklyGoal - stats.weeklyProgress} minutos para completar tu meta.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Géneros favoritos */}
          <Card>
            <CardHeader>
              <CardTitle>Géneros Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.genres.map((genre, index) => (
                  <motion.div
                    key={genre.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${genre.color}`} />
                      <span>{genre.name}</span>
                    </div>
                    <Badge variant="secondary">{genre.count} libros</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logros */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-eduletter-accent-orange" />
                <span>Logros</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-center space-x-3 p-4 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-eduletter-accent/5 border-eduletter-accent/20'
                        : 'bg-muted/30 border-muted'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-eduletter-accent text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {(() => {
                        const AchievementIcon = achievement.icon;
                        return <AchievementIcon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-eduletter-accent text-white border-0">
                        Desbloqueado
                      </Badge>
                    )}
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
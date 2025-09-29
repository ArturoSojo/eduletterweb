import { Crown, Check, X, Sparkles, Headphones, Brain, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { motion } from 'motion/react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  const features = [
    {
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      title: "Biblioteca Premium",
      description: "Acceso a libros exclusivos y lanzamientos tempranos"
    },
    {
      icon: <Headphones className="w-6 h-6 text-blue-500" />,
      title: "Voces Premium",
      description: "Narradores profesionales y voces sintéticas avanzadas"
    },
    {
      icon: <Download className="w-6 h-6 text-green-500" />,
      title: "Descargas Ilimitadas",
      description: "Descarga hasta 100 libros para lectura offline"
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "IA Avanzada",
      description: "Resúmenes automáticos, mapas conceptuales y recomendaciones personalizadas"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Funciones Exclusivas",
      description: "Modo inmersivo, temas personalizados y sincronización avanzada"
    }
  ];

  const plans = [
    {
      name: "Mensual",
      price: "€9.99",
      period: "/mes",
      popular: false,
      savings: null
    },
    {
      name: "Anual",
      price: "€79.99",
      period: "/año",
      popular: true,
      savings: "Ahorra 33%"
    },
    {
      name: "Familiar",
      price: "€129.99",
      period: "/año",
      popular: false,
      savings: "Hasta 6 cuentas"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2 text-2xl">
            <div className="w-8 h-8 bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange bg-clip-text text-transparent">
              Eduletter Premium
            </span>
          </DialogTitle>
          <DialogDescription>
            Desbloquea el potencial completo de tu experiencia de lectura con funciones Premium exclusivas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg text-muted-foreground mb-4">
                Desbloquea el potencial completo de tu experiencia de lectura
              </h3>
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sin anuncios</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Cancela cuando quieras</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>7 días gratis</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6">Elige tu plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`relative ${plan.popular ? 'border-2 border-gradient-to-r from-yellow-500 to-orange-500' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange px-3 py-1 text-white border-0">
                          Más Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                        {plan.savings && (
                          <Badge variant="secondary" className="text-xs">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange hover:opacity-90 text-white border-0' : 'border-eduletter-brand text-eduletter-brand hover:bg-eduletter-brand hover:text-white'}`}
                        onClick={onUpgrade}
                      >
                        {plan.popular ? 'Comenzar Prueba Gratis' : 'Seleccionar Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* IA Features Highlight */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold">Funciones de IA Avanzada</h3>
                  <p className="text-sm text-muted-foreground">Potencia tu experiencia de lectura con inteligencia artificial</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Resúmenes Inteligentes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Resúmenes automáticos por capítulo</li>
                    <li>• Puntos clave destacados</li>
                    <li>• Conceptos principales extraídos</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Mapas Conceptuales</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Visualización de relaciones entre ideas</li>
                    <li>• Navegación interactiva por temas</li>
                    <li>• Conexiones entre libros</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Comienza tu prueba gratuita de 7 días. Cancela en cualquier momento.
            </p>
            <p className="text-xs text-muted-foreground">
              Al continuar, aceptas los términos de servicio y política de privacidad.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
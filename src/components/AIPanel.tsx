import { useState } from 'react';
import { Brain, FileText, Map, Lightbulb, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Textarea } from './ui/textarea';

interface AIPanelProps {
  currentBook?: {
    id: string;
    title: string;
    author: string;
  };
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function AIPanel({ currentBook, isPremium, onUpgrade }: AIPanelProps) {
  const [selectedTab, setSelectedTab] = useState('summary');
  const [chatMessage, setChatMessage] = useState('');

  const summaries = [
    {
      chapter: 1,
      title: "Introducción al Arte Digital",
      summary: "El capítulo establece las bases del combate en el mundo digital, comparando las estrategias tradicionales con las nuevas realidades del ecosistema tecnológico. Se enfatiza la importancia de adaptarse rápidamente y conocer el terreno digital.",
      keyPoints: [
        "El terreno digital es un ecosistema complejo y cambiante",
        "La velocidad de adaptación es crucial para el éxito",
        "Las estrategias tradicionales deben evolucionar"
      ]
    },
    {
      chapter: 2,
      title: "Principios Fundamentales",
      summary: "Explora los principios básicos que rigen el éxito en el entorno digital, incluyendo la gestión de datos, la automatización y la toma de decisiones basada en información procesada inteligentemente.",
      keyPoints: [
        "Los datos son el nuevo petróleo del siglo XXI",
        "La automatización amplifica las capacidades humanas",
        "La información procesada es poder real"
      ]
    }
  ];

  const conceptMap = {
    mainConcepts: [
      { id: 1, name: "Guerra Digital", connections: [2, 3, 4] },
      { id: 2, name: "Datos e Información", connections: [1, 5] },
      { id: 3, name: "Automatización", connections: [1, 4] },
      { id: 4, name: "Adaptación Rápida", connections: [1, 3] },
      { id: 5, name: "Inteligencia Artificial", connections: [2, 3] }
    ],
    relationships: [
      "Guerra Digital se basa en Datos e Información",
      "La Automatización requiere Adaptación Rápida",
      "La Inteligencia Artificial procesa Datos e Información"
    ]
  };

  const recommendations = [
    {
      type: "similar",
      title: "Libros similares",
      items: [
        { title: "Estrategia Digital Avanzada", author: "Carmen Rivera", match: "92%" },
        { title: "El Futuro de los Negocios", author: "Alex Thompson", match: "89%" },
        { title: "Innovación Disruptiva", author: "María González", match: "85%" }
      ]
    },
    {
      type: "complementary",
      title: "Lecturas complementarias",
      items: [
        { title: "Psicología del Consumidor Digital", author: "Dr. Luis Morales", match: "78%" },
        { title: "Ética en la Era Digital", author: "Sofia Alonso", match: "74%" }
      ]
    }
  ];

  if (!isPremium) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">IA Premium</h2>
            <p className="text-muted-foreground mb-6">
              Desbloquea el poder de la inteligencia artificial para mejorar tu experiencia de lectura
            </p>
            <Button 
              onClick={onUpgrade}
              className="bg-gradient-to-r from-eduletter-accent to-eduletter-accent-orange hover:opacity-90 text-white border-0"
            >
              Actualizar a Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
            <Brain className="w-6 h-6 text-eduletter-accent" />
            <span>Panel de IA</span>
          </h2>
          <p className="text-muted-foreground">
            {currentBook ? `Análisis inteligente de "${currentBook.title}"` : 'Herramientas de inteligencia artificial para tu lectura'}
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Resúmenes</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="w-4 h-4" />
              <span>Mapa Conceptual</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Recomendaciones</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat IA</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid gap-4">
              {summaries.map((summary, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Capítulo {summary.chapter}: {summary.title}</span>
                        <Badge variant="secondary">IA Generado</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Resumen</h4>
                        <p className="text-muted-foreground">{summary.summary}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Puntos Clave</h4>
                        <ul className="space-y-1">
                          {summary.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mapa Conceptual Interactivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Conceptos Principales</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {conceptMap.mainConcepts.map((concept) => (
                        <motion.div
                          key={concept.id}
                          whileHover={{ scale: 1.05 }}
                          className="cursor-pointer"
                        >
                          <Card className="text-center p-4 hover:shadow-md transition-shadow">
                            <h5 className="font-medium">{concept.name}</h5>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {concept.connections.length} conexiones
                            </Badge>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Relaciones Identificadas</h4>
                    <div className="space-y-2">
                      {conceptMap.relationships.map((relationship, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                          <div className="w-2 h-2 bg-eduletter-accent rounded-full" />
                          <span className="text-sm">{relationship}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-6">
              {recommendations.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{item.match}</Badge>
                            <Button size="sm" variant="outline">Ver</Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chat con IA sobre el libro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 min-h-[300px]">
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-eduletter-accent rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm">
                          ¡Hola! Soy tu asistente de IA. Puedo ayudarte a entender mejor el contenido del libro, 
                          responder preguntas sobre los conceptos principales, o sugerir conexiones con otros temas. 
                          ¿En qué te gustaría que te ayude?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Pregúntame sobre el libro, conceptos específicos, o solicita explicaciones..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <Button 
                    className="self-end"
                    disabled={!chatMessage.trim()}
                  >
                    Enviar
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Explica el concepto principal
                  </Button>
                  <Button variant="outline" size="sm">
                    Compara con otros libros
                  </Button>
                  <Button variant="outline" size="sm">
                    Sugiere aplicaciones prácticas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
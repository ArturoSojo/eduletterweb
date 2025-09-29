import { useState } from 'react';
import { Sun, Moon, Palette, Type, Globe, Download, Bell, User, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'es',
    fontSize: 16,
    fontFamily: 'serif',
    lineHeight: 1.6,
    autoDownload: false,
    offlineMode: true,
    notifications: {
      newReleases: true,
      readingReminders: true,
      recommendations: false
    },
    privacy: {
      analytics: true,
      personalization: true,
      shareReadingData: false
    },
    audio: {
      autoplay: false,
      skipSilence: true,
      playbackSpeed: 1.0,
      equalizer: 'balanced'
    }
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateNestedSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Configuración</h2>
          <p className="text-muted-foreground">Personaliza tu experiencia de lectura</p>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            <TabsTrigger value="reading">Lectura</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Tema y Apariencia</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Tema de la aplicación</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <Button
                      variant={settings.theme === 'light' ? 'default' : 'outline'}
                      onClick={() => updateSetting('theme', 'light')}
                      className="flex items-center space-x-2"
                    >
                      <Sun className="w-4 h-4" />
                      <span>Claro</span>
                    </Button>
                    <Button
                      variant={settings.theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => updateSetting('theme', 'dark')}
                      className="flex items-center space-x-2"
                    >
                      <Moon className="w-4 h-4" />
                      <span>Oscuro</span>
                    </Button>
                    <Button
                      variant={settings.theme === 'system' ? 'default' : 'outline'}
                      onClick={() => updateSetting('theme', 'system')}
                      className="flex items-center space-x-2"
                    >
                      <span>Sistema</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Idioma</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="w-5 h-5" />
                  <span>Configuración de Lectura</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Tamaño de fuente</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSetting('fontSize', value[0])}
                      min={12}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>12px</span>
                      <span>{settings.fontSize}px</span>
                      <span>24px</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Familia de fuente</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serif">Serif (Georgia)</SelectItem>
                      <SelectItem value="sans">Sans-serif (Arial)</SelectItem>
                      <SelectItem value="mono">Monospace (Courier)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Interlineado</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.lineHeight]}
                      onValueChange={(value) => updateSetting('lineHeight', value[0])}
                      min={1.2}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1.2</span>
                      <span>{settings.lineHeight.toFixed(1)}</span>
                      <span>2.0</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Modo offline</Label>
                    <p className="text-xs text-muted-foreground">Permite leer libros sin conexión</p>
                  </div>
                  <Switch
                    checked={settings.offlineMode}
                    onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Descarga automática</Label>
                    <p className="text-xs text-muted-foreground">Descarga automáticamente libros en tu biblioteca</p>
                  </div>
                  <Switch
                    checked={settings.autoDownload}
                    onCheckedChange={(checked) => updateSetting('autoDownload', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Configuración de Audio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Velocidad de reproducción predeterminada</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.audio.playbackSpeed]}
                      onValueChange={(value) => updateNestedSetting('audio', 'playbackSpeed', value[0])}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.5x</span>
                      <span>{settings.audio.playbackSpeed.toFixed(1)}x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Ecualizador</Label>
                  <Select 
                    value={settings.audio.equalizer} 
                    onValueChange={(value) => updateNestedSetting('audio', 'equalizer', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanceado</SelectItem>
                      <SelectItem value="bass">Graves potenciados</SelectItem>
                      <SelectItem value="treble">Agudos potenciados</SelectItem>
                      <SelectItem value="voice">Optimizado para voz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Reproducción automática</Label>
                    <p className="text-xs text-muted-foreground">Continúa automáticamente al siguiente capítulo</p>
                  </div>
                  <Switch
                    checked={settings.audio.autoplay}
                    onCheckedChange={(checked) => updateNestedSetting('audio', 'autoplay', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Saltar silencios</Label>
                    <p className="text-xs text-muted-foreground">Reduce automáticamente las pausas largas</p>
                  </div>
                  <Switch
                    checked={settings.audio.skipSilence}
                    onCheckedChange={(checked) => updateNestedSetting('audio', 'skipSilence', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notificaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Nuevos lanzamientos</Label>
                    <p className="text-xs text-muted-foreground">Notificar sobre nuevos libros en géneros de interés</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newReleases}
                    onCheckedChange={(checked) => updateNestedSetting('notifications', 'newReleases', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Recordatorios de lectura</Label>
                    <p className="text-xs text-muted-foreground">Recordatorio diario para continuar leyendo</p>
                  </div>
                  <Switch
                    checked={settings.notifications.readingReminders}
                    onCheckedChange={(checked) => updateNestedSetting('notifications', 'readingReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Recomendaciones personalizadas</Label>
                    <p className="text-xs text-muted-foreground">Sugerencias basadas en tu historial de lectura</p>
                  </div>
                  <Switch
                    checked={settings.notifications.recommendations}
                    onCheckedChange={(checked) => updateNestedSetting('notifications', 'recommendations', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacidad y Datos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Análisis y estadísticas</Label>
                    <p className="text-xs text-muted-foreground">Ayuda a mejorar la aplicación</p>
                  </div>
                  <Switch
                    checked={settings.privacy.analytics}
                    onCheckedChange={(checked) => updateNestedSetting('privacy', 'analytics', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Personalización</Label>
                    <p className="text-xs text-muted-foreground">Usar datos de lectura para personalizar la experiencia</p>
                  </div>
                  <Switch
                    checked={settings.privacy.personalization}
                    onCheckedChange={(checked) => updateNestedSetting('privacy', 'personalization', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Compartir datos de lectura</Label>
                    <p className="text-xs text-muted-foreground">Permitir compartir progreso con otros usuarios</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareReadingData}
                    onCheckedChange={(checked) => updateNestedSetting('privacy', 'shareReadingData', checked)}
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="font-medium">Gestión de datos</h4>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar datos
                      </Button>
                      <Button variant="outline" size="sm">
                        Eliminar cuenta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
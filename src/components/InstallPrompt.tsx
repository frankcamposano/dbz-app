import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Verificar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 shadow-2xl border border-orange-500/30 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">¡Instala la App!</h3>
              <p className="text-orange-100 text-sm">Acceso rápido desde tu pantalla de inicio</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-orange-100 text-sm">
            <div className="w-2 h-2 bg-orange-300 rounded-full" />
            <span>Funciona sin internet</span>
          </div>
          <div className="flex items-center space-x-2 text-orange-100 text-sm">
            <div className="w-2 h-2 bg-orange-300 rounded-full" />
            <span>Carga más rápido</span>
          </div>
          <div className="flex items-center space-x-2 text-orange-100 text-sm">
            <div className="w-2 h-2 bg-orange-300 rounded-full" />
            <span>Experiencia nativa</span>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="w-full mt-4 bg-white text-orange-600 font-bold py-3 px-4 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Instalar App</span>
        </button>
      </div>
    </div>
  );
};
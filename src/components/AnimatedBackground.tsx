import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    // Crear estrellas
    const createStars = () => {
      const starsContainer = starsRef.current;
      if (!starsContainer) return;

      // Limpiar estrellas existentes
      starsContainer.innerHTML = '';

      // Crear estrellas normales
      const numberOfStars = 100;
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Tamaño aleatorio entre 1px y 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = star.style.width;
        
        // Retraso aleatorio en la animación
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        // Brillo aleatorio
        const brightness = Math.random() * 0.7 + 0.3;
        star.style.opacity = brightness.toString();
        
        starsContainer.appendChild(star);
      }

      // Crear estrella fugaz
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      starsContainer.appendChild(shootingStar);
    };

    createStars();

    // Recrear estrellas cada 8 segundos
    const interval = setInterval(createStars, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="animated-background">
      <div ref={starsRef} className="stars" />
    </div>
  );
};

export default AnimatedBackground; 
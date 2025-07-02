import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/Gamification';


interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose?: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onClose 
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!achievement) return;

    setShow(true);
      const timer = setTimeout(() => {
      setShow(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, 3000);

      return () => clearTimeout(timer);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 transform transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-yellow-400/50 flex items-center space-x-4 max-w-md">
        <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{achievement.icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg">¡Logro Desbloqueado!</h4>
          <p className="text-yellow-100 font-medium">{achievement.title}</p>
          <p className="text-yellow-200/80 text-sm">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
};
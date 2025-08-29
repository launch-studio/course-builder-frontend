import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import telegramWebApp from '../services/telegram/webapp';

export const useTelegramNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!telegramWebApp.isAvailable()) {
      return;
    }

    // Скрываем кнопку "Назад" на главной странице
    if (location.pathname === '/') {
      telegramWebApp.hideBackButton();
      // Показываем кнопку "Закрыть" на главной
      telegramWebApp.showMainButton('Закрыть', () => {
        telegramWebApp.close();
      });
    } else {
      // Показываем кнопку "Назад" на других страницах
      telegramWebApp.showBackButton(() => {
        navigate(-1);
        telegramWebApp.hapticImpact('light');
      });
      // Скрываем главную кнопку на других страницах
      telegramWebApp.hideMainButton();
    }

    // Очистка при размонтировании
    return () => {
      telegramWebApp.hideBackButton();
      telegramWebApp.hideMainButton();
    };
  }, [location.pathname, navigate]);

  return {
    close: telegramWebApp.close.bind(telegramWebApp),
    hapticImpact: telegramWebApp.hapticImpact.bind(telegramWebApp),
    hapticNotification: telegramWebApp.hapticNotification.bind(telegramWebApp),
    isAvailable: telegramWebApp.isAvailable()
  };
};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        close(): void;
        expand(): void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          onClick(fn: () => void): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
        };
        BackButton: {
          isVisible: boolean;
          onClick(fn: () => void): void;
          show(): void;
          hide(): void;
        };
        HapticFeedback: {
          impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
          notificationOccurred(type: 'error' | 'success' | 'warning'): void;
          selectionChanged(): void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
        colorScheme: 'light' | 'dark';
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: {
            id: number;
            is_bot?: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            added_to_attachment_menu?: boolean;
            allows_write_to_pm?: boolean;
            photo_url?: string;
          };
          receiver?: {
            id: number;
            is_bot?: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            added_to_attachment_menu?: boolean;
            allows_write_to_pm?: boolean;
            photo_url?: string;
          };
          chat?: {
            id: number;
            type: 'group' | 'supergroup' | 'channel';
            title: string;
            username?: string;
            photo_url?: string;
          };
          chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
          chat_instance?: string;
          start_param?: string;
          can_send_after?: number;
          auth_date: number;
          hash: string;
        };
      };
    };
  }
}

class TelegramWebAppService {
  private webApp?: typeof window.Telegram.WebApp;

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp;
      this.init();
    } else {
      console.warn('Telegram Web App не доступен');
    }
  }

  private init() {
    if (this.webApp) {
      this.webApp.ready();
      this.webApp.expand();
    }
  }

  // Основные методы
  close() {
    if (this.webApp) {
      this.webApp.close();
    }
  }

  expand() {
    if (this.webApp) {
      this.webApp.expand();
    }
  }

  // Работа с кнопкой "Назад"
  showBackButton(callback: () => void) {
    if (this.webApp) {
      this.webApp.BackButton.onClick(callback);
      this.webApp.BackButton.show();
    }
  }

  hideBackButton() {
    if (this.webApp) {
      this.webApp.BackButton.hide();
    }
  }

  // Работа с главной кнопкой
  showMainButton(text: string, callback: () => void) {
    if (this.webApp) {
      this.webApp.MainButton.setText(text);
      this.webApp.MainButton.onClick(callback);
      this.webApp.MainButton.show();
    }
  }

  hideMainButton() {
    if (this.webApp) {
      this.webApp.MainButton.hide();
    }
  }

  // Тактильная обратная связь
  hapticImpact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') {
    if (this.webApp) {
      this.webApp.HapticFeedback.impactOccurred(style);
    }
  }

  hapticNotification(type: 'error' | 'success' | 'warning' = 'success') {
    if (this.webApp) {
      this.webApp.HapticFeedback.notificationOccurred(type);
    }
  }

  // Получение данных пользователя
  getUser() {
    return this.webApp?.initDataUnsafe?.user;
  }

  getChat() {
    return this.webApp?.initDataUnsafe?.chat;
  }

  getThemeParams() {
    return this.webApp?.themeParams;
  }

  getColorScheme() {
    return this.webApp?.colorScheme;
  }

  // Проверка доступности
  isAvailable() {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
  }
}

const telegramWebAppService = new TelegramWebAppService();
export default telegramWebAppService;

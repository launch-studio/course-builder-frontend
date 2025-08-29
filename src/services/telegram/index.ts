import { TelegramMessage, TelegramUser, TelegramChat } from '../../types';

interface TelegramBotConfig {
  token: string;
  webhookUrl?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

class TelegramService {
  private token: string;
  private baseUrl: string;

  constructor(config: TelegramBotConfig) {
    this.token = config.token;
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
  }

  // Основные методы бота
  async sendMessage(chatId: number, text: string, options?: any): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          ...options
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      throw error;
    }
  }

  async sendKeyboard(chatId: number, text: string, keyboard: any): Promise<TelegramResponse> {
    return this.sendMessage(chatId, text, {
      reply_markup: {
        keyboard: keyboard,
        resize_keyboard: true,
        one_time_keyboard: false
      }
    });
  }

  async sendInlineKeyboard(chatId: number, text: string, inlineKeyboard: any): Promise<TelegramResponse> {
    return this.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: inlineKeyboard
      }
    });
  }

  async editMessage(chatId: number, messageId: number, text: string, options?: any): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/editMessageText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text,
          parse_mode: 'HTML',
          ...options
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка редактирования сообщения:', error);
      throw error;
    }
  }

  async deleteMessage(chatId: number, messageId: number): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/deleteMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка удаления сообщения:', error);
      throw error;
    }
  }

  // Методы для работы с файлами
  async sendDocument(chatId: number, document: File | string, caption?: string): Promise<TelegramResponse> {
    try {
      const formData = new FormData();
      formData.append('chat_id', chatId.toString());
      
      if (typeof document === 'string') {
        formData.append('document', document);
      } else {
        formData.append('document', document);
      }
      
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch(`${this.baseUrl}/sendDocument`, {
        method: 'POST',
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки документа:', error);
      throw error;
    }
  }

  async sendPhoto(chatId: number, photo: File | string, caption?: string): Promise<TelegramResponse> {
    try {
      const formData = new FormData();
      formData.append('chat_id', chatId.toString());
      
      if (typeof photo === 'string') {
        formData.append('photo', photo);
      } else {
        formData.append('photo', photo);
      }
      
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch(`${this.baseUrl}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки фото:', error);
      throw error;
    }
  }

  // Методы для получения информации
  async getMe(): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/getMe`);
      return await response.json();
    } catch (error) {
      console.error('Ошибка получения информации о боте:', error);
      throw error;
    }
  }

  async getUpdates(offset?: number, limit?: number): Promise<TelegramResponse> {
    try {
      const params = new URLSearchParams();
      if (offset) params.append('offset', offset.toString());
      if (limit) params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/getUpdates?${params}`);
      return await response.json();
    } catch (error) {
      console.error('Ошибка получения обновлений:', error);
      throw error;
    }
  }

  // Методы для настройки webhook
  async setWebhook(url: string, certificate?: File): Promise<TelegramResponse> {
    try {
      const formData = new FormData();
      formData.append('url', url);
      
      if (certificate) {
        formData.append('certificate', certificate);
      }

      const response = await fetch(`${this.baseUrl}/setWebhook`, {
        method: 'POST',
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка установки webhook:', error);
      throw error;
    }
  }

  async deleteWebhook(): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/deleteWebhook`, {
        method: 'POST',
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка удаления webhook:', error);
      throw error;
    }
  }

  // Утилиты для работы с сообщениями
  parseMessage(message: any): TelegramMessage | null {
    try {
      return {
        message_id: message.message_id,
        from: message.from,
        chat: message.chat,
        text: message.text,
        entities: message.entities
      };
    } catch (error) {
      console.error('Ошибка парсинга сообщения:', error);
      return null;
    }
  }

  // Клавиатуры для бота
  createMainMenu() {
    return [
      [
        { text: '🎯 Создать контент' },
        { text: '📁 Мои проекты' }
      ],
      [
        { text: '📊 Статистика' },
        { text: '⚙️ Настройки' }
      ],
      [
        { text: '❓ Помощь' }
      ]
    ];
  }

  createContentTypeMenu() {
    return [
      [
        { text: '📄 Лендинг' },
        { text: '📧 Email-рассылка' }
      ],
      [
        { text: '🎯 Лид-магнит' },
        { text: '📊 Презентация' }
      ],
      [
        { text: '🎮 Интерактив' },
        { text: '📱 Социальные сети' }
      ],
      [
        { text: '⚖️ Юридические документы' }
      ],
      [
        { text: '🔙 Назад' }
      ]
    ];
  }

  createNicheMenu() {
    return [
      [
        { text: '🎓 Образование' },
        { text: '💼 Бизнес' }
      ],
      [
        { text: '🏥 Здоровье' },
        { text: '💰 Финансы' }
      ],
      [
        { text: '🌟 Образ жизни' }
      ],
      [
        { text: '🔙 Назад' }
      ]
    ];
  }

  createInlineKeyboard(buttons: Array<Array<{ text: string; callback_data: string }>>) {
    return {
      inline_keyboard: buttons
    };
  }

  // Обработка callback запросов
  async answerCallbackQuery(callbackQueryId: string, text?: string, showAlert?: boolean): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/answerCallbackQuery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callback_query_id: callbackQueryId,
          text,
          show_alert: showAlert
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Ошибка ответа на callback:', error);
      throw error;
    }
  }
}

export default TelegramService;

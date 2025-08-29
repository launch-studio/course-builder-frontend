import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  UserProject, 
  ContentType, 
  ApiResponse,
  ConstructorState 
} from '../../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Интерцептор для добавления токена
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Интерцептор для обработки ошибок
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Аутентификация
  async login(telegramId: string, username?: string): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.api.post('/auth/login', {
        telegramId,
        username
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUser(): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/auth/user');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Проекты
  async getProjects(): Promise<ApiResponse<UserProject[]>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProject[]>> = await this.api.get('/projects');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProject(id: string): Promise<ApiResponse<UserProject>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProject>> = await this.api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createProject(project: Partial<UserProject>): Promise<ApiResponse<UserProject>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProject>> = await this.api.post('/projects', project);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProject(id: string, project: Partial<UserProject>): Promise<ApiResponse<UserProject>> {
    try {
      const response: AxiosResponse<ApiResponse<UserProject>> = await this.api.put(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Типы контента
  async getContentTypes(): Promise<ApiResponse<ContentType[]>> {
    try {
      const response: AxiosResponse<ApiResponse<ContentType[]>> = await this.api.get('/content-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getContentType(id: string): Promise<ApiResponse<ContentType>> {
    try {
      const response: AxiosResponse<ApiResponse<ContentType>> = await this.api.get(`/content-types/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Экспорт
  async exportProject(id: string, format: 'pdf' | 'docx' | 'html' | 'txt'): Promise<ApiResponse<{ url: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ url: string }>> = await this.api.post(`/projects/${id}/export`, {
        format
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // AI функции
  async generateContent(prompt: string, style: any): Promise<ApiResponse<{ content: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ content: string }>> = await this.api.post('/ai/generate', {
        prompt,
        style
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async improveContent(content: string, instructions: string): Promise<ApiResponse<{ content: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ content: string }>> = await this.api.post('/ai/improve', {
        content,
        instructions
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Сохранение состояния конструктора
  async saveConstructorState(state: ConstructorState): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.post('/constructor/save-state', state);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loadConstructorState(): Promise<ApiResponse<ConstructorState>> {
    try {
      const response: AxiosResponse<ApiResponse<ConstructorState>> = await this.api.get('/constructor/state');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Обработка ошибок
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.error || 'Произошла ошибка';
      return new Error(message);
    } else if (error.request) {
      return new Error('Нет соединения с сервером');
    } else {
      return new Error('Произошла неизвестная ошибка');
    }
  }
}

export const apiService = new ApiService();
export default apiService;

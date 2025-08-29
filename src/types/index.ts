// Основные типы контента
export interface ContentType {
  id: string;
  name: string;
  description: string;
  blocks: ContentBlock[];
  niches: string[];
  category: ContentCategory;
}

export type ContentCategory = 
  | 'lead-magnet'
  | 'landing'
  | 'email'
  | 'presentation'
  | 'interactive'
  | 'social'
  | 'legal';

// Блоки контента
export interface ContentBlock {
  id: string;
  name: string;
  type: BlockType;
  templates: BlockTemplate[];
  required: boolean;
  order: number;
  description: string;
}

export type BlockType = 
  | 'heading'
  | 'subheading'
  | 'offer'
  | 'benefits'
  | 'testimonials'
  | 'objections'
  | 'cta'
  | 'contact'
  | 'list'
  | 'text'
  | 'image'
  | 'video'
  | 'form';

// Шаблоны блоков
export interface BlockTemplate {
  id: string;
  name: string;
  content: string;
  variables: TemplateVariable[];
  niche: string;
  style: TemplateStyle;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'select';
  placeholder: string;
  options?: string[];
  required: boolean;
}

export interface TemplateStyle {
  tone: 'formal' | 'casual' | 'urgent' | 'friendly';
  length: 'short' | 'medium' | 'long';
  emotion: 'excitement' | 'fear' | 'trust' | 'curiosity';
}

// Проекты пользователей
export interface UserProject {
  id: string;
  userId: string;
  name: string;
  contentType: string; // Изменено с ContentType на string
  blocks: ProjectBlock[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  variables: Record<string, string>;
}

export interface ProjectBlock {
  id: string;
  blockId: string;
  templateId: string;
  content: string;
  variables: Record<string, string>;
  order: number;
}

// Ниши и целевые аудитории
export interface Niche {
  id: string;
  name: string;
  description: string;
  targetAudience: string[];
  popularTopics: string[];
}

// Пользователь
export interface User {
  id: string;
  telegramId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  projects: UserProject[];
  preferences: UserPreferences;
  subscription: Subscription;
}

export interface UserPreferences {
  defaultNiche?: string;
  preferredTone: TemplateStyle['tone'];
  preferredLength: TemplateStyle['length'];
  language: 'ru' | 'en';
}

export interface Subscription {
  type: 'free' | 'premium' | 'enterprise';
  expiresAt?: Date;
  features: string[];
}

// Telegram Bot типы
export interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: TelegramChat;
  text?: string;
  entities?: TelegramEntity[];
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
}

export interface TelegramEntity {
  type: string;
  offset: number;
  length: number;
}

// API ответы
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Состояние конструктора
export interface ConstructorState {
  currentProject: UserProject | null;
  selectedContentType: ContentType | null;
  selectedBlocks: ContentBlock[];
  currentStep: number;
  isGenerating: boolean;
}

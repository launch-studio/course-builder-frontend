import { ContentType, BlockTemplate } from '../types';

// Универсальные шаблоны для разных блоков
const universalTemplates: Record<string, BlockTemplate[]> = {
  heading: [
    {
      id: 'h1-universal-1',
      name: 'Универсальный заголовок 1',
      content: '{{main_benefit}} для {{target_audience}}',
      variables: [
        { name: 'main_benefit', type: 'text', placeholder: 'Основная выгода', required: true },
        { name: 'target_audience', type: 'text', placeholder: 'Целевая аудитория', required: true }
      ],
      niche: 'universal',
      style: { tone: 'casual', length: 'short', emotion: 'excitement' }
    },
    {
      id: 'h1-universal-2',
      name: 'Универсальный заголовок 2',
      content: 'Как {{action}} и {{result}} за {{timeframe}}',
      variables: [
        { name: 'action', type: 'text', placeholder: 'Действие', required: true },
        { name: 'result', type: 'text', placeholder: 'Результат', required: true },
        { name: 'timeframe', type: 'text', placeholder: 'Временные рамки', required: true }
      ],
      niche: 'universal',
      style: { tone: 'casual', length: 'short', emotion: 'curiosity' }
    }
  ],
  subheading: [
    {
      id: 'h2-universal-1',
      name: 'Универсальный подзаголовок 1',
      content: '{{description}} без {{pain_point}}',
      variables: [
        { name: 'description', type: 'text', placeholder: 'Описание', required: true },
        { name: 'pain_point', type: 'text', placeholder: 'Болевая точка', required: true }
      ],
      niche: 'universal',
      style: { tone: 'casual', length: 'short', emotion: 'fear' }
    }
  ],
  offer: [
    {
      id: 'offer-universal-1',
      name: 'Универсальное предложение 1',
      content: 'Получите {{product}} стоимостью {{value}} БЕСПЛАТНО',
      variables: [
        { name: 'product', type: 'text', placeholder: 'Продукт', required: true },
        { name: 'value', type: 'text', placeholder: 'Стоимость', required: true }
      ],
      niche: 'universal',
      style: { tone: 'urgent', length: 'short', emotion: 'excitement' }
    }
  ],
  cta: [
    {
      id: 'cta-universal-1',
      name: 'Универсальный CTA 1',
      content: '{{action}} СЕЙЧАС и получите {{bonus}}',
      variables: [
        { name: 'action', type: 'text', placeholder: 'Действие', required: true },
        { name: 'bonus', type: 'text', placeholder: 'Бонус', required: true }
      ],
      niche: 'universal',
      style: { tone: 'urgent', length: 'short', emotion: 'excitement' }
    }
  ]
};

// Создание типов контента
export const contentTypes: ContentType[] = [
  {
    id: 'lead-magnet',
    name: 'Лид-магнит',
    description: 'Бесплатный материал для привлечения подписчиков',
    category: 'lead-magnet',
    niches: ['education', 'business', 'health', 'finance', 'lifestyle'],
    blocks: [
      {
        id: 'lm-heading',
        name: 'Заголовок',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Привлекающий заголовок лид-магнита',
        templates: universalTemplates.heading
      },
      {
        id: 'lm-description',
        name: 'Описание',
        type: 'text',
        required: true,
        order: 2,
        description: 'Краткое описание что получит пользователь',
        templates: [
          {
            id: 'lm-desc-1',
            name: 'Описание лид-магнита 1',
            content: '{{description}} который поможет вам {{benefit}}',
            variables: [
              { name: 'description', type: 'text', placeholder: 'Описание материала', required: true },
              { name: 'benefit', type: 'text', placeholder: 'Выгода', required: true }
            ],
            niche: 'universal',
            style: { tone: 'friendly', length: 'short', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'lm-cta',
        name: 'Призыв к действию',
        type: 'cta',
        required: true,
        order: 3,
        description: 'Кнопка для скачивания/получения',
        templates: universalTemplates.cta
      }
    ]
  },
  {
    id: 'landing-sales',
    name: 'Лендинг продающего сайта',
    description: 'Одностраничный сайт для продажи продукта',
    category: 'landing',
    niches: ['education', 'business', 'health', 'finance', 'lifestyle'],
    blocks: [
      {
        id: 'ls-heading',
        name: 'Главный заголовок',
        type: 'heading',
        required: true,
        order: 1,
        description: 'H1 заголовок страницы',
        templates: universalTemplates.heading
      },
      {
        id: 'ls-subheading',
        name: 'Подзаголовок',
        type: 'subheading',
        required: true,
        order: 2,
        description: 'H2 подзаголовок',
        templates: universalTemplates.subheading
      },
      {
        id: 'ls-offer',
        name: 'Оффер',
        type: 'offer',
        required: true,
        order: 3,
        description: 'Что получит клиент',
        templates: universalTemplates.offer
      },
      {
        id: 'ls-benefits',
        name: 'Преимущества',
        type: 'benefits',
        required: true,
        order: 4,
        description: 'Список преимуществ продукта',
        templates: [
          {
            id: 'ls-benefits-1',
            name: 'Преимущества 1',
            content: '✅ {{benefit_1}}\n✅ {{benefit_2}}\n✅ {{benefit_3}}',
            variables: [
              { name: 'benefit_1', type: 'text', placeholder: 'Преимущество 1', required: true },
              { name: 'benefit_2', type: 'text', placeholder: 'Преимущество 2', required: true },
              { name: 'benefit_3', type: 'text', placeholder: 'Преимущество 3', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'medium', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'ls-testimonials',
        name: 'Отзывы',
        type: 'testimonials',
        required: false,
        order: 5,
        description: 'Отзывы клиентов',
        templates: [
          {
            id: 'ls-testimonials-1',
            name: 'Отзыв 1',
            content: '"{{quote}}" - {{author}}',
            variables: [
              { name: 'quote', type: 'text', placeholder: 'Цитата', required: true },
              { name: 'author', type: 'text', placeholder: 'Автор', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'short', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'ls-cta',
        name: 'Призыв к действию',
        type: 'cta',
        required: true,
        order: 6,
        description: 'Кнопка покупки',
        templates: universalTemplates.cta
      }
    ]
  },
  {
    id: 'landing-webinar',
    name: 'Лендинг вебинара',
    description: 'Страница для регистрации на вебинар',
    category: 'landing',
    niches: ['education', 'business', 'health', 'finance'],
    blocks: [
      {
        id: 'lw-heading',
        name: 'Заголовок вебинара',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Название вебинара',
        templates: [
          {
            id: 'lw-heading-1',
            name: 'Заголовок вебинара 1',
            content: '{{topic}}: {{promise}}',
            variables: [
              { name: 'topic', type: 'text', placeholder: 'Тема вебинара', required: true },
              { name: 'promise', type: 'text', placeholder: 'Обещание', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'short', emotion: 'excitement' }
          }
        ]
      },
      {
        id: 'lw-description',
        name: 'Описание вебинара',
        type: 'text',
        required: true,
        order: 2,
        description: 'Что будет на вебинаре',
        templates: [
          {
            id: 'lw-desc-1',
            name: 'Описание вебинара 1',
            content: 'На вебинаре вы узнаете:\n• {{point_1}}\n• {{point_2}}\n• {{point_3}}',
            variables: [
              { name: 'point_1', type: 'text', placeholder: 'Пункт 1', required: true },
              { name: 'point_2', type: 'text', placeholder: 'Пункт 2', required: true },
              { name: 'point_3', type: 'text', placeholder: 'Пункт 3', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'medium', emotion: 'curiosity' }
          }
        ]
      },
      {
        id: 'lw-cta',
        name: 'Регистрация',
        type: 'cta',
        required: true,
        order: 3,
        description: 'Кнопка регистрации',
        templates: [
          {
            id: 'lw-cta-1',
            name: 'Регистрация на вебинар',
            content: 'ЗАПИСАТЬСЯ НА ВЕБИНАР',
            variables: [],
            niche: 'universal',
            style: { tone: 'urgent', length: 'short', emotion: 'excitement' }
          }
        ]
      }
    ]
  },
  {
    id: 'email-payment',
    name: 'Письма после оплат',
    description: 'Email-рассылки для клиентов после покупки',
    category: 'email',
    niches: ['education', 'business', 'health', 'finance', 'lifestyle'],
    blocks: [
      {
        id: 'ep-subject',
        name: 'Тема письма',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Заголовок email',
        templates: [
          {
            id: 'ep-subject-1',
            name: 'Тема письма 1',
            content: 'Добро пожаловать! Ваш {{product}} готов',
            variables: [
              { name: 'product', type: 'text', placeholder: 'Название продукта', required: true }
            ],
            niche: 'universal',
            style: { tone: 'friendly', length: 'short', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'ep-greeting',
        name: 'Приветствие',
        type: 'text',
        required: true,
        order: 2,
        description: 'Персональное приветствие',
        templates: [
          {
            id: 'ep-greeting-1',
            name: 'Приветствие 1',
            content: 'Привет, {{name}}! 👋\n\nСпасибо за покупку {{product}}!',
            variables: [
              { name: 'name', type: 'text', placeholder: 'Имя клиента', required: true },
              { name: 'product', type: 'text', placeholder: 'Название продукта', required: true }
            ],
            niche: 'universal',
            style: { tone: 'friendly', length: 'short', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'ep-content',
        name: 'Основной контент',
        type: 'text',
        required: true,
        order: 3,
        description: 'Информация о продукте',
        templates: [
          {
            id: 'ep-content-1',
            name: 'Основной контент 1',
            content: 'Ваш {{product}} содержит:\n\n{{content_points}}\n\nНачните изучение прямо сейчас!',
            variables: [
              { name: 'product', type: 'text', placeholder: 'Название продукта', required: true },
              { name: 'content_points', type: 'text', placeholder: 'Пункты содержания', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'medium', emotion: 'excitement' }
          }
        ]
      },
      {
        id: 'ep-cta',
        name: 'Призыв к действию',
        type: 'cta',
        required: true,
        order: 4,
        description: 'Ссылка на продукт',
        templates: [
          {
            id: 'ep-cta-1',
            name: 'CTA для письма',
            content: 'ПЕРЕЙТИ К МАТЕРИАЛАМ',
            variables: [],
            niche: 'universal',
            style: { tone: 'casual', length: 'short', emotion: 'excitement' }
          }
        ]
      }
    ]
  },
  {
    id: 'presentation-product',
    name: 'Презентация продукта',
    description: 'Слайды для презентации продукта или услуги',
    category: 'presentation',
    niches: ['education', 'business', 'health', 'finance'],
    blocks: [
      {
        id: 'pp-title',
        name: 'Титульный слайд',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Заголовок презентации',
        templates: [
          {
            id: 'pp-title-1',
            name: 'Титульный слайд 1',
            content: '{{product_name}}\n{{tagline}}',
            variables: [
              { name: 'product_name', type: 'text', placeholder: 'Название продукта', required: true },
              { name: 'tagline', type: 'text', placeholder: 'Слоган', required: true }
            ],
            niche: 'universal',
            style: { tone: 'formal', length: 'short', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'pp-problem',
        name: 'Проблема',
        type: 'text',
        required: true,
        order: 2,
        description: 'Описание проблемы',
        templates: [
          {
            id: 'pp-problem-1',
            name: 'Проблема 1',
            content: 'ПРОБЛЕМА:\n{{problem_description}}',
            variables: [
              { name: 'problem_description', type: 'text', placeholder: 'Описание проблемы', required: true }
            ],
            niche: 'universal',
            style: { tone: 'formal', length: 'medium', emotion: 'fear' }
          }
        ]
      },
      {
        id: 'pp-solution',
        name: 'Решение',
        type: 'text',
        required: true,
        order: 3,
        description: 'Представление решения',
        templates: [
          {
            id: 'pp-solution-1',
            name: 'Решение 1',
            content: 'РЕШЕНИЕ:\n{{solution_description}}',
            variables: [
              { name: 'solution_description', type: 'text', placeholder: 'Описание решения', required: true }
            ],
            niche: 'universal',
            style: { tone: 'formal', length: 'medium', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'pp-benefits',
        name: 'Преимущества',
        type: 'benefits',
        required: true,
        order: 4,
        description: 'Ключевые преимущества',
        templates: [
          {
            id: 'pp-benefits-1',
            name: 'Преимущества презентации',
            content: 'ПРЕИМУЩЕСТВА:\n• {{benefit_1}}\n• {{benefit_2}}\n• {{benefit_3}}',
            variables: [
              { name: 'benefit_1', type: 'text', placeholder: 'Преимущество 1', required: true },
              { name: 'benefit_2', type: 'text', placeholder: 'Преимущество 2', required: true },
              { name: 'benefit_3', type: 'text', placeholder: 'Преимущество 3', required: true }
            ],
            niche: 'universal',
            style: { tone: 'formal', length: 'medium', emotion: 'trust' }
          }
        ]
      },
      {
        id: 'pp-cta',
        name: 'Призыв к действию',
        type: 'cta',
        required: true,
        order: 5,
        description: 'Финальный призыв',
        templates: universalTemplates.cta
      }
    ]
  }
];

// Добавление остальных типов контента (сокращенно для примера)
export const additionalContentTypes: ContentType[] = [
  {
    id: 'interactive-test',
    name: 'Интерактив - тесты, чеклисты, рабочие тетради',
    description: 'Интерактивные материалы для вовлечения аудитории',
    category: 'interactive',
    niches: ['education', 'business', 'health', 'lifestyle'],
    blocks: [
      {
        id: 'it-title',
        name: 'Название',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Заголовок интерактива',
        templates: universalTemplates.heading
      },
      {
        id: 'it-description',
        name: 'Описание',
        type: 'text',
        required: true,
        order: 2,
        description: 'Описание задания',
        templates: [
          {
            id: 'it-desc-1',
            name: 'Описание интерактива',
            content: '{{description}}\n\nВремя выполнения: {{duration}}',
            variables: [
              { name: 'description', type: 'text', placeholder: 'Описание', required: true },
              { name: 'duration', type: 'text', placeholder: 'Время выполнения', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'medium', emotion: 'curiosity' }
          }
        ]
      }
    ]
  },
  {
    id: 'sales-post',
    name: 'Продающие посты',
    description: 'Посты для социальных сетей с призывом к покупке',
    category: 'social',
    niches: ['education', 'business', 'health', 'finance', 'lifestyle'],
    blocks: [
      {
        id: 'sp-hook',
        name: 'Хук',
        type: 'heading',
        required: true,
        order: 1,
        description: 'Зацепляющее начало поста',
        templates: [
          {
            id: 'sp-hook-1',
            name: 'Хук 1',
            content: '{{hook_question}}',
            variables: [
              { name: 'hook_question', type: 'text', placeholder: 'Зацепляющий вопрос', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'short', emotion: 'curiosity' }
          }
        ]
      },
      {
        id: 'sp-content',
        name: 'Основной контент',
        type: 'text',
        required: true,
        order: 2,
        description: 'Основная часть поста',
        templates: [
          {
            id: 'sp-content-1',
            name: 'Контент поста',
            content: '{{main_content}}\n\n{{benefit}}',
            variables: [
              { name: 'main_content', type: 'text', placeholder: 'Основной контент', required: true },
              { name: 'benefit', type: 'text', placeholder: 'Выгода', required: true }
            ],
            niche: 'universal',
            style: { tone: 'casual', length: 'medium', emotion: 'excitement' }
          }
        ]
      },
      {
        id: 'sp-cta',
        name: 'Призыв к действию',
        type: 'cta',
        required: true,
        order: 3,
        description: 'Кнопка покупки',
        templates: universalTemplates.cta
      }
    ]
  }
];

// Объединение всех типов контента
export const allContentTypes = [...contentTypes, ...additionalContentTypes];

// Ниши
export const niches = [
  {
    id: 'education',
    name: 'Образование',
    description: 'Курсы, тренинги, обучение',
    targetAudience: ['студенты', 'профессионалы', 'предприниматели'],
    popularTopics: ['онлайн-курсы', 'вебинары', 'тренинги', 'коучинг']
  },
  {
    id: 'business',
    name: 'Бизнес',
    description: 'Предпринимательство, маркетинг, продажи',
    targetAudience: ['предприниматели', 'менеджеры', 'маркетологи'],
    popularTopics: ['маркетинг', 'продажи', 'управление', 'стартапы']
  },
  {
    id: 'health',
    name: 'Здоровье',
    description: 'Фитнес, питание, медицина',
    targetAudience: ['спортсмены', 'люди, следящие за здоровьем', 'врачи'],
    popularTopics: ['фитнес', 'питание', 'медицина', 'психология']
  },
  {
    id: 'finance',
    name: 'Финансы',
    description: 'Инвестиции, личные финансы, трейдинг',
    targetAudience: ['инвесторы', 'трейдеры', 'люди, планирующие бюджет'],
    popularTopics: ['инвестиции', 'трейдинг', 'личные финансы', 'криптовалюты']
  },
  {
    id: 'lifestyle',
    name: 'Образ жизни',
    description: 'Путешествия, хобби, личностное развитие',
    targetAudience: ['путешественники', 'творческие люди', 'люди, ищущие себя'],
    popularTopics: ['путешествия', 'творчество', 'саморазвитие', 'хобби']
  }
];

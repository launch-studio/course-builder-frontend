import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProject } from '../../types';

const mockProjects: UserProject[] = [
    {
        id: '1',
        userId: 'user1',
        name: 'Лендинг для онлайн-курса',
        contentType: 'landing',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        blocks: [],
        variables: {}
    },
    {
        id: '2',
        userId: 'user1',
        name: 'Email-рассылка для запуска',
        contentType: 'email',
        status: 'draft',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
        blocks: [],
        variables: {}
    },
    {
        id: '3',
        userId: 'user1',
        name: 'Презентация продукта',
        contentType: 'presentation',
        status: 'archived',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-08'),
        blocks: [],
        variables: {}
    },
    {
        id: '4',
        userId: 'user1',
        name: 'Лид-магнит "Чек-лист"',
        contentType: 'lead-magnet',
        status: 'published',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-03'),
        blocks: [],
        variables: {}
    }
];

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const [projects] = useState<UserProject[]>(mockProjects);
    const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        return project.status === filter;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            draft: { label: 'Черновик', className: 'badge-warning' },
            published: { label: 'Опубликован', className: 'badge-success' },
            archived: { label: 'Архив', className: 'badge-danger' }
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
            <span className={config.className}>
                {config.label}
            </span>
        );
    };

    const getCategoryIcon = (category: string): string => {
        const icons: Record<string, string> = {
            'lead-magnet': '🎯',
            'landing': '📄',
            'email': '📧',
            'presentation': '📊',
            'interactive': '🎮',
            'social': '📱',
            'legal': '⚖️'
        };
        return icons[category] || '📝';
    };

    const handleEditProject = (project: UserProject) => {
        navigate('/constructor', {
            state: {
                project,
                isEditing: true
            }
        });
    };

    const handleDeleteProject = (projectId: string) => {
        console.log('Удаление проекта:', projectId);
    };

    const handleExportProject = (project: UserProject) => {
        console.log('Экспорт проекта:', project);
    };

    const stats = {
        total: projects.length,
        draft: projects.filter(p => p.status === 'draft').length,
        published: projects.filter(p => p.status === 'published').length,
        archived: projects.filter(p => p.status === 'archived').length
    };

    return (
        <div className="min-h-screen">
            {/* Фоновые элементы */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 px-4 py-6">
                {/* Заголовок */}
                <div className="mb-6 fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-white mb-1">
                                Мои проекты
                            </h1>
                            <p className="text-white/60 text-sm">
                                Управляйте проектами
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="button-primary text-sm"
                        >
                            ➕ Создать
                        </button>
                    </div>
                </div>

                {/* Быстрая статистика */}
                <div className="mb-6 slide-up">
                    <div className="grid grid-cols-4 gap-3">
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{stats.total}</div>
                            <div className="text-xs text-white/60">Всего</div>
                        </div>
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{stats.draft}</div>
                            <div className="text-xs text-white/60">Черновики</div>
                        </div>
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{stats.published}</div>
                            <div className="text-xs text-white/60">Опубликовано</div>
                        </div>
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{stats.archived}</div>
                            <div className="text-xs text-white/60">Архив</div>
                        </div>
                    </div>
                </div>

                {/* Фильтры */}
                <div className="mb-6 slide-up">
                    <div className="glass-card p-4">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'Все', count: stats.total },
                                { key: 'draft', label: 'Черновики', count: stats.draft },
                                { key: 'published', label: 'Опубликованные', count: stats.published },
                                { key: 'archived', label: 'Архив', count: stats.archived }
                            ].map((filterOption) => (
                                <button
                                    key={filterOption.key}
                                    onClick={() => setFilter(filterOption.key as any)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${filter === filterOption.key
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                >
                                    {filterOption.label}
                                    <span className="ml-1 badge-primary text-xs">
                                        {filterOption.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Список проектов */}
                <div className="space-y-3">
                    {filteredProjects.slice(0, 10).map((project, index) => (
                        <div
                            key={project.id}
                            className="glass-card p-4 hover-lift card-hover bounce-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm mr-3">
                                        {getCategoryIcon(project.contentType)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-sm">
                                            {project.name}
                                        </h3>
                                        <p className="text-white/60 text-xs">
                                            {project.contentType} • {project.createdAt.toLocaleDateString('ru-RU')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getStatusBadge(project.status)}
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleEditProject(project)}
                                            className="button-secondary text-xs px-2 py-1"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleExportProject(project)}
                                            className="button-secondary text-xs px-2 py-1"
                                        >
                                            📤
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors text-xs"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Показать больше */}
                {filteredProjects.length > 10 && (
                    <div className="mt-6 text-center">
                        <button className="button-secondary text-sm">
                            Показать еще {filteredProjects.length - 10}
                        </button>
                    </div>
                )}

                {/* Пустое состояние */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 fade-in">
                        <div className="text-6xl mb-4">📁</div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Проекты не найдены
                        </h3>
                        <p className="text-white/60 text-sm mb-4">
                            {filter === 'all'
                                ? 'У вас пока нет проектов. Создайте первый!'
                                : `У вас нет проектов со статусом "${filter}"`
                            }
                        </p>
                        {filter !== 'all' && (
                            <button
                                onClick={() => setFilter('all')}
                                className="button-primary text-sm mr-3"
                            >
                                Показать все
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/')}
                            className="button-primary text-sm"
                        >
                            Создать проект
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allContentTypes, niches } from '../../data/contentTypes';
import { ContentType } from '../../types';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [selectedNiche, setSelectedNiche] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const categories = [
        { id: 'lead-magnet', name: 'Лид-магниты', icon: '🎯', color: 'from-red-500 to-pink-500' },
        { id: 'landing', name: 'Лендинги', icon: '📄', color: 'from-blue-500 to-cyan-500' },
        { id: 'email', name: 'Email-рассылки', icon: '📧', color: 'from-green-500 to-emerald-500' },
        { id: 'presentation', name: 'Презентации', icon: '📊', color: 'from-purple-500 to-violet-500' },
        { id: 'interactive', name: 'Интерактив', icon: '🎮', color: 'from-orange-500 to-red-500' },
        { id: 'social', name: 'Социальные сети', icon: '📱', color: 'from-indigo-500 to-purple-500' },
        { id: 'legal', name: 'Юридические документы', icon: '⚖️', color: 'from-gray-500 to-slate-500' }
    ];

    const filteredContentTypes = allContentTypes.filter(type => {
        if (selectedCategory && type.category !== selectedCategory) return false;
        if (selectedNiche && !type.niches.includes(selectedNiche)) return false;
        return true;
    });

    const handleContentTypeSelect = (contentType: ContentType) => {
        navigate('/constructor', {
            state: {
                contentType,
                selectedNiche,
                selectedCategory
            }
        });
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
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Конструктор
                    </h1>
                    <p className="text-white/60 text-sm">
                        Создавайте контент быстро
                    </p>
                </div>

                {/* Быстрая статистика */}
                <div className="mb-6 slide-up">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{allContentTypes.length}</div>
                            <div className="text-xs text-white/60">Типов</div>
                        </div>
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">{niches.length}</div>
                            <div className="text-xs text-white/60">Ниш</div>
                        </div>
                        <div className="glass-card p-3 text-center">
                            <div className="text-lg font-bold text-white">50+</div>
                            <div className="text-xs text-white/60">Шаблонов</div>
                        </div>
                    </div>
                </div>

                {/* Фильтры */}
                <div className="mb-6 slide-up">
                    <div className="glass-card p-4">
                        <div className="flex gap-3">
                            <select
                                value={selectedNiche}
                                onChange={(e) => setSelectedNiche(e.target.value)}
                                className="select-styled flex-1 text-sm"
                            >
                                <option value="">Все ниши</option>
                                {niches.map((niche) => (
                                    <option key={niche.id} value={niche.id}>
                                        {niche.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="select-styled flex-1 text-sm"
                            >
                                <option value="">Все категории</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Список типов контента */}
                <div className="space-y-3">
                    {filteredContentTypes.slice(0, 8).map((contentType, index) => {
                        const category = categories.find(c => c.id === contentType.category);
                        return (
                            <div
                                key={contentType.id}
                                onClick={() => handleContentTypeSelect(contentType)}
                                className="glass-card p-4 cursor-pointer hover-lift card-hover bounce-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category?.color} flex items-center justify-center text-lg mr-3`}>
                                            {category?.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-sm">
                                                {contentType.name}
                                            </h3>
                                            <p className="text-white/60 text-xs">
                                                {contentType.blocks.length} блоков
                                            </p>
                                        </div>
                                    </div>
                                    <button className="button-secondary text-xs px-3 py-1">
                                        Создать
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Показать больше */}
                {filteredContentTypes.length > 8 && (
                    <div className="mt-6 text-center">
                        <button className="button-secondary text-sm">
                            Показать еще {filteredContentTypes.length - 8}
                        </button>
                    </div>
                )}

                {/* Пустое состояние */}
                {filteredContentTypes.length === 0 && (
                    <div className="text-center py-12 fade-in">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Ничего не найдено
                        </h3>
                        <p className="text-white/60 text-sm mb-4">
                            Попробуйте изменить фильтры
                        </p>
                        <button
                            onClick={() => {
                                setSelectedNiche('');
                                setSelectedCategory('');
                            }}
                            className="button-primary text-sm"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

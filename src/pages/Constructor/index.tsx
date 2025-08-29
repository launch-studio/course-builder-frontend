import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentType, ContentBlock, BlockTemplate, ProjectBlock } from '../../types';

interface ConstructorState {
    contentType: ContentType | null;
    selectedBlocks: ProjectBlock[];
    currentStep: number;
    projectName: string;
}

const Constructor: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [state, setState] = useState<ConstructorState>({
        contentType: null,
        selectedBlocks: [],
        currentStep: 1,
        projectName: ''
    });

    useEffect(() => {
        if (location.state?.contentType) {
            setState(prev => ({
                ...prev,
                contentType: location.state.contentType
            }));
        }
    }, [location.state]);

    const handleBlockSelect = (block: ContentBlock, template: BlockTemplate) => {
        const newBlock: ProjectBlock = {
            id: `${block.id}-${Date.now()}`,
            blockId: block.id,
            templateId: template.id,
            content: template.content,
            variables: {},
            order: block.order
        };

        setState(prev => ({
            ...prev,
            selectedBlocks: [...prev.selectedBlocks.filter(b => b.blockId !== block.id), newBlock]
        }));
    };

    const handleVariableChange = (blockId: string, variableName: string, value: string) => {
        setState(prev => ({
            ...prev,
            selectedBlocks: prev.selectedBlocks.map(block =>
                block.id === blockId
                    ? { ...block, variables: { ...block.variables, [variableName]: value } }
                    : block
            )
        }));
    };

    const generateContent = (block: ProjectBlock): string => {
        let content = block.content;
        Object.entries(block.variables).forEach(([key, value]) => {
            content = content.replace(new RegExp(`{{${key}}}`, 'g'), value || `{{${key}}}`);
        });
        return content;
    };

    const handleSaveProject = () => {
        console.log('Сохранение проекта:', state);
        navigate('/projects');
    };

    if (!state.contentType) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-6 text-center">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Тип контента не выбран
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="button-primary"
                    >
                        Вернуться к выбору
                    </button>
                </div>
            </div>
        );
    }

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
                                {state.contentType.name}
                            </h1>
                            <p className="text-white/60 text-sm">
                                {state.contentType.description}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="button-secondary text-sm"
                        >
                            ← Назад
                        </button>
                    </div>
                </div>

                {/* Название проекта */}
                <div className="mb-6 slide-up">
                    <div className="glass-card p-4">
                        <label className="block text-sm font-semibold text-white mb-2">
                            📝 Название проекта
                        </label>
                        <input
                            type="text"
                            value={state.projectName}
                            onChange={(e) => setState(prev => ({ ...prev, projectName: e.target.value }))}
                            placeholder="Введите название проекта"
                            className="input-styled w-full"
                        />
                    </div>
                </div>

                {/* Основной контент */}
                <div className="space-y-6">
                    {/* Выбор блоков */}
                    <div className="glass-card p-4 slide-up">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                            🧩 Выберите блоки
                            <span className="ml-2 badge-primary text-xs">
                                {state.contentType.blocks.length} доступно
                            </span>
                        </h2>

                        <div className="space-y-4">
                            {state.contentType.blocks.slice(0, 5).map((block) => (
                                <div key={block.id} className="glass-card p-3 card-hover">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-white font-semibold text-sm">
                                            {block.name}
                                        </h3>
                                        {block.required && (
                                            <span className="badge-danger text-xs">
                                                Обязательный
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-white/70 text-xs mb-3">{block.description}</p>

                                    <div className="space-y-2">
                                        {block.templates.slice(0, 3).map((template) => (
                                            <div
                                                key={template.id}
                                                className="glass-card p-2 cursor-pointer card-hover"
                                                onClick={() => handleBlockSelect(block, template)}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium text-white text-xs">
                                                        {template.name}
                                                    </span>
                                                    <div className="flex space-x-1">
                                                        <span className="badge-primary text-xs">
                                                            {template.style.tone}
                                                        </span>
                                                        <span className="badge-success text-xs">
                                                            {template.style.length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-white/60">
                                                    {template.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Предварительный просмотр */}
                    <div className="glass-card p-4 slide-up">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                            👁️ Предварительный просмотр
                            <span className="ml-2 badge-success text-xs">
                                {state.selectedBlocks.length} выбрано
                            </span>
                        </h2>

                        {state.selectedBlocks.length === 0 ? (
                            <div className="text-center py-8 text-white/60">
                                <div className="text-4xl mb-3">📝</div>
                                <p className="text-sm">Выберите блоки для создания контента</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.selectedBlocks
                                    .sort((a, b) => a.order - b.order)
                                    .slice(0, 3)
                                    .map((block) => {
                                        const blockConfig = state.contentType!.blocks.find(b => b.id === block.blockId);
                                        const template = blockConfig?.templates.find(t => t.id === block.templateId);

                                        return (
                                            <div key={block.id} className="glass-card p-3">
                                                <h3 className="font-semibold text-white mb-2 flex items-center text-sm">
                                                    {blockConfig?.name}
                                                    <span className="ml-2 badge-primary text-xs">
                                                        {block.order}
                                                    </span>
                                                </h3>

                                                {/* Переменные */}
                                                {template && template.variables.length > 0 && (
                                                    <div className="mb-3 space-y-2">
                                                        {template.variables.slice(0, 2).map((variable) => (
                                                            <div key={variable.name}>
                                                                <label className="block text-xs font-medium text-white/80 mb-1">
                                                                    {variable.placeholder}
                                                                    {variable.required && <span className="text-red-400 ml-1">*</span>}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={block.variables[variable.name] || ''}
                                                                    onChange={(e) => handleVariableChange(block.id, variable.name, e.target.value)}
                                                                    placeholder={variable.placeholder}
                                                                    className="input-styled w-full text-sm"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Сгенерированный контент */}
                                                <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
                                                    <pre className="whitespace-pre-wrap text-xs text-white/90 font-mono">
                                                        {generateContent(block)}
                                                    </pre>
                                                </div>
                                            </div>
                                        );
                                    })}

                                {/* Кнопка сохранения */}
                                <div className="pt-4 border-t border-white/20">
                                    <button
                                        onClick={handleSaveProject}
                                        disabled={!state.projectName || state.selectedBlocks.length === 0}
                                        className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        💾 Сохранить проект
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Constructor;

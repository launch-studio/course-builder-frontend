import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Главная', icon: '🏠' },
        { path: '/constructor', label: 'Создать', icon: '➕' },
        { path: '/projects', label: 'Проекты', icon: '📁' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${location.pathname === item.path
                                ? 'text-purple-400'
                                : 'text-white/60 hover:text-white/80'
                            }`}
                    >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavigation;

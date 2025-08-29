import React, { useEffect } from 'react';

interface NotificationProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
    type,
    message,
    isVisible,
    onClose,
    duration = 5000
}) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-green-500/20 border-green-500/30';
            case 'error': return 'bg-red-500/20 border-red-500/30';
            case 'warning': return 'bg-yellow-500/20 border-yellow-500/30';
            case 'info': return 'bg-blue-500/20 border-blue-500/30';
            default: return 'bg-blue-500/20 border-blue-500/30';
        }
    };

    return (
        <div className="fixed top-20 right-4 z-50 slide-up">
            <div className={`glass-card p-4 border ${getBgColor()} max-w-sm`}>
                <div className="flex items-start space-x-3">
                    <span className="text-xl flex-shrink-0">
                        {getIcon()}
                    </span>
                    <div className="flex-1">
                        <p className="text-white font-medium">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors flex-shrink-0"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;

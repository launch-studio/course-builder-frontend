import React from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, trend }) => {
    return (
        <div className="glass-card p-6 hover-lift">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/60 text-sm font-medium mb-1">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {value}
                    </p>
                    {trend && (
                        <div className="flex items-center mt-2">
                            <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                            </span>
                            <span className="text-white/40 text-xs ml-1">
                                с прошлого месяца
                            </span>
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl shadow-lg`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;

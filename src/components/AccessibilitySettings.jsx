import React, { useState, useRef, useEffect } from 'react';
import { Eye, Check, Sun, Moon, Type, RefreshCw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AccessibilitySettings = () => {
    const { theme, changeTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themes = [
        { id: 'default', name: 'Mặc định', icon: <Sun size={16} /> },
        { id: 'dark', name: 'Chế độ Tối', icon: <Moon size={16} /> },
        { id: 'high-contrast-light', name: 'Tương phản cao - Sáng', icon: <Eye size={16} /> },
        { id: 'high-contrast-dark', name: 'Tương phản cao - Tối', icon: <Eye size={16} className="text-yellow-400" /> },
        { id: 'grayscale', name: 'Thang xám', icon: <RefreshCw size={16} /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentTheme = themes.find(t => t.id === theme) || themes[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium"
                title="Chế độ hiển thị"
            >
                <Eye size={16} />
                <span className="hidden md:inline">{currentTheme.name}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-[300] overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-800 text-sm">Chế độ hiển thị</h3>
                        <p className="text-[11px] text-gray-500 mt-0.5">Tùy chỉnh giao diện phù hợp với thị giác</p>
                    </div>
                    <div className="py-2">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    changeTheme(t.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-blue-50 transition-colors ${theme === t.id ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={theme === t.id ? 'text-blue-600' : 'text-gray-400'}>
                                        {t.icon}
                                    </span>
                                    <span className="text-sm font-medium">{t.name}</span>
                                </div>
                                {theme === t.id && <Check size={14} className="text-blue-600" />}
                            </button>
                        ))}
                    </div>
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 italic text-[10px] text-gray-400 text-center">
                        Thiết lập được lưu tự động cho lần sau
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccessibilitySettings;

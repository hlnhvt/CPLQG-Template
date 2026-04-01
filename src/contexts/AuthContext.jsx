import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Mock users database
const MOCK_USERS = [
    { cccd: '001234567890', password: '123456', name: 'Hoàng Lương Nhân', email: 'nhanlh@example.com', phone: '0912 345 678', avatar: null },
    { cccd: '012345678901', password: 'password', name: 'Nguyễn Anh Quân', email: 'anvan@example.com', phone: '0987 654 321', avatar: null },
    { cccd: '098765432109', password: 'password', name: 'Nguyễn Tuấn Minh', email: 'newuser@example.com', phone: '', avatar: null, isNewUser: true },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (cccd, password) => {
        const found = MOCK_USERS.find(u => u.cccd === cccd && u.password === password);
        if (found) {
            const userData = { name: found.name, email: found.email, phone: found.phone || '', cccd: found.cccd, avatar: found.avatar, isNewUser: found.isNewUser };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, message: 'Số định danh cá nhân hoặc mật khẩu không chính xác.' };
    };

    const updateUser = (newData) => {
        setUser(prev => {
            const updated = { ...prev, ...newData };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

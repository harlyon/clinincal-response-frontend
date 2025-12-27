import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
export const useAuth = () => {
    const navigate = useNavigate();
    const login = useCallback((userData: any) => {
        localStorage.setItem('clinicalUser', JSON.stringify(userData));
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem('clinicalUser');
        navigate('/', { replace: true });
    }, [navigate]);
    const getUser = useCallback((): any | null => {
        const user = localStorage.getItem('clinicalUser');
        return user ? JSON.parse(user) : null;
    }, []);
    return { login, logout, getUser };
};
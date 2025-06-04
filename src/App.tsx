import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import './lang/config';
import AuthLayout from './components/AuthLayout.tsx';
import userStore from './store/userStore.ts';
import { GET_TENANCY_PATH, PUBLIC_PATHS } from './constants';
import useAxiosInterceptor from './hooks/useAxiosInterceptor.ts';

const App: FC = () => {
    const { gatewayAuthToken, authToken } = userStore();
    const navigate = useNavigate();
    const location = useLocation();

    const { registerInterceptors, axiosInterceptor } =
        useAxiosInterceptor(navigate);

    useEffect(() => {
        if (!registerInterceptors) {
            axiosInterceptor();
        }
    }, [registerInterceptors, axiosInterceptor]);

    useEffect(() => {
        if (authToken && location.pathname === GET_TENANCY_PATH) {
        } else if (
            gatewayAuthToken &&
            PUBLIC_PATHS.includes(location.pathname)
        ) {
            navigate('/');
        } else if (
            !gatewayAuthToken &&
            !PUBLIC_PATHS.includes(location.pathname)
        ) {
            navigate('/select-login');
        }
    }, [authToken, gatewayAuthToken, location.pathname, navigate]);

    if (!registerInterceptors) {
        return <div />;
    }

    if (
        !gatewayAuthToken &&
        !(authToken && location.pathname === GET_TENANCY_PATH)
    ) {
        return <AuthLayout />;
    }

    return <MainLayout />;
};

export default App;

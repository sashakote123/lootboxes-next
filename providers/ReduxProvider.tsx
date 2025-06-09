'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { initTelegramWebApp } from '@/lib/telegram';

export default function ReduxProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const tgData = initTelegramWebApp();
        console.log('Telegram User Data:', tgData.user);
        // Здесь можно добавить логику проверки/создания пользователя в БД
    }, []);



    return <Provider store={store}>{children}</Provider>;
}
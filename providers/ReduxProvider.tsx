'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk';
import { mockLaunchParams } from '@/mock/launchParams';

export default function ReduxProvider({ children }: { children: ReactNode }) {
    const launchParams = isTMA() ? retrieveLaunchParams() : mockLaunchParams
    fetch('/api/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userData: launchParams.tgWebAppData?.user,
        })
    })


    return <Provider store={store}>{children}</Provider>;
}
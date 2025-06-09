'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useLaunchParams } from '@telegram-apps/sdk-react';

export default function ReduxProvider({ children }: { children: ReactNode }) {
    console.log(useLaunchParams(false));


    return <Provider store={store}>{children}</Provider>;
}
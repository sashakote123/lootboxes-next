import { NextResponse } from 'next/server';
import { verifyInitData, getInitDataFromRequest } from '@/lib/telegram';

export async function GET(request: Request) {
    try {
        const initDataRaw = getInitDataFromRequest(request);
        const initData = verifyInitData(initDataRaw);

        const userId = initData.user?.id;
        const firstName = initData.user?.first_name;

        return NextResponse.json({
            success: true,
            userId,
            firstName,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Authorization failed' },
            { status: 401 }
        );
    }
}
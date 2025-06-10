import { db } from '@/lib/firebase';
import { ref, get } from "firebase/database";
import { NextResponse } from 'next/server';

export async function GET(request: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);

        const snapshot = await get(ref(db, `users/${userId}`));

        if (!snapshot.exists()) {
            return NextResponse.json(
                { error: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: userId,
            ...snapshot.val()
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: `Ошибка сервера: ${errorMessage}` },
            { status: 500 }
        );
    }
}
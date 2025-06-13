import { db } from '@/lib/firebase';
import { ref, get } from "firebase/database";
import { NextResponse } from 'next/server';


export async function GET(request: Request, props: { params: Promise<{ taskId: string, userId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);
        const taskId = String(params.taskId);

        const eventRef = ref(db, `users/user${userId}/events/tasks/${taskId}`)
        const eventSnapshot = await get(eventRef);

        if (eventSnapshot.exists()) {
            const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
            const TELEGRAM_CHANNEL_ID = eventSnapshot.val().channelId;

            const url = new URL(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember`);
            url.searchParams.append('chat_id', TELEGRAM_CHANNEL_ID);
            url.searchParams.append('user_id', userId as string);
            const response = await fetch(url.toString());
            const data = await response.json();

            return NextResponse.json({
                success: true,
                item: data
            });
        }


        return NextResponse.json({
            success: false
        });
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}

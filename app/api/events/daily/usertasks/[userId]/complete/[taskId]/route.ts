import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";
import { NextResponse } from 'next/server';


export async function POST(request: Request, props: { params: Promise<{ userId: string, taskId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);
        const taskId = String(params.taskId);

        //const userRef = ref(db, `users/${userId}/events/daily`);
        //const userSnapshot = await get(userRef);

        const eventRef = ref(db, `users/${userId}/events/daily/${taskId}`)
        const eventSnapshot = await get(eventRef);
        if (eventSnapshot.exists() && !eventSnapshot.val().isComplete) {
            console.log(eventSnapshot.val().cooldown);
            await update(eventRef, {
                ...eventSnapshot.val(),
                isComplete: true,
                timer: new Date(Date.now() + eventSnapshot.val().cooldown)
            });
        }
        console.log(eventSnapshot.val());


        return NextResponse.json({
            success: true,
            item: {
                isComplete: true,
                timer: new Date(Date.now() + eventSnapshot.val().cooldown)
            }
        });
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}

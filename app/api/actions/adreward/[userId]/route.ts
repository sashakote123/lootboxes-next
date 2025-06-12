import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";
import { NextResponse } from 'next/server';


export async function POST(request: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);

        const eventSnapshot = await get(ref(db, `events/daily/event3`));
        const userRef = ref(db, `users/${userId}/`)
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
            await update(userRef, {
                ...userSnapshot.val(),
                coins: userSnapshot.val().coins + eventSnapshot.val().reward,
            });
        }


        return NextResponse.json({
            success: true,
            item: {
                ...userSnapshot.val(),
                coins: userSnapshot.val().coins + eventSnapshot.val().reward,
            }

        });
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}

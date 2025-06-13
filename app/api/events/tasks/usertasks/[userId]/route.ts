import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";


export async function GET(request: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);

        const userRef = ref(db, `users/${userId}/events/tasks`);
        const userSnapshot = await get(userRef);

        const eventsSnapshot = await get(ref(db, 'events/tasks'));
        if (!userSnapshot.val()) {

            await update(userRef, eventsSnapshot.val());
        }

        const updatedUserSnapshot = await get(userRef);
        return Response.json(updatedUserSnapshot.val());
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}

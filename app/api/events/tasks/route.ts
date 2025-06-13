import { db } from '@/lib/firebase';
import { ref, get } from "firebase/database";

export async function GET() {
    try {
        const snapshot = await get(ref(db, 'events/tasks'));
        return Response.json(snapshot.val());
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}
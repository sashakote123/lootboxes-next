import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";
import { NextResponse } from 'next/server';

// interface IUser {
//     id: number
// }

export async function POST(request: Request) {
    try {
        const { userData } = await request.json();
        const usersSnapshot = await get(ref(db, `users/user${userData.id}`));
        //const usersData: IUser = usersSnapshot.val();

        if (!usersSnapshot.exists()) {
            await update(ref(db, `users/user${userData.id}`), {
                id: userData.id,
                name: userData.first_name,
                lastname: userData.last_name,
                photo: userData.photo_url,
                coins: 10000,
                inventory: [],
                history: []
            });
        }

        const userSnapshot = await get(ref(db, `users/user${userData.id}`));

        return NextResponse.json({
            success: true,
            item: userSnapshot.val()
        });



    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}




import { db } from '@/lib/firebase';
import { ref, get, update } from "firebase/database";


export async function GET(request: Request, props: { params: Promise<{ userId: string }> }) {
    const params = await props.params;
    try {
        const userId = String(params.userId);

        const userRef = ref(db, `users/${userId}/events/daily`);
        const userSnapshot = await get(userRef);

        const eventsSnapshot = await get(ref(db, 'events/daily'));
        console.log('events: ', userSnapshot.val());
        // setEvents(eventsSnapshot.val())
        if (!userSnapshot.val()) {

            console.log('events: ', Object.values(eventsSnapshot.val()));
            await update(userRef, eventsSnapshot.val());
        }


        return Response.json(userSnapshot.val());
    } catch (error) {
        return Response.json({ error: `Database error: ${error}` }, { status: 500 });
    }
}

// interface IDailies {
//     image: string,
//     name: string,
//     description: string,

//     isComplete?: boolean,
//     reward?: number,
//     timer?: string
// }


// type IDailies = {
//     [key: string]: {
//         // Пример структуры исходного объекта
//         image: string;
//         name: string;
//         description: string,

//         isComplete?: boolean,
//         reward?: number,
//         timer?: number
//     };
// };

// const setEvents = (object: IDailies) => {
//     const resObj: IDailies = {}
//     for (const key in object) {
//         resObj[key] = {
//             ...object[key],
//             isComplete: false,
//             reward: 100,
//             timer: 1000
//         }
//     }
//     return resObj
// }
// import { validate, parse } from '@telegram-apps/init-data-node';

// const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

// if (!BOT_TOKEN) {
//     throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables');
// }

// /**
//  * Проверяет и парсит initData из Telegram Mini Apps
//  */
// export function verifyInitData(initDataRaw: string) {
//     validate(initDataRaw, BOT_TOKEN, { expiresIn: 3600 });
//     return parse(initDataRaw);
// }

// /**
//  * Извлекает initData из заголовка Authorization
//  */
// export function getInitDataFromRequest(request: Request): string {
//     const authHeader = request.headers.get('authorization') || '';
//     const [authType, authData = ''] = authHeader.split(' ');

//     if (authType !== 'tma') {
//         throw new Error('Invalid authorization type');
//     }

//     return authData;
// }
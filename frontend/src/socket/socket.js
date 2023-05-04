import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4444';

export const socket = io( URL, { autoConnect: false, query: { userName: 'userName', role: 'role' }, auth: {token: 'token'} } )

// hooks/useSocket.ts
import { useEffect } from 'react';
import socket from '../services/socket';

export default function useSocket(userId?: number) {
  useEffect(() => {
    if (!userId) return;                

    socket.auth = { userId };          
    socket.connect();

   
    return () => socket.disconnect();
  }, [userId]);

  return socket;               
}

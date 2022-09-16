import { useContext } from 'react';
import { AuthCtx } from '../context';

export const useAuthCtx = () => useContext(AuthCtx);

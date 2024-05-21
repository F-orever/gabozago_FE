import { atom } from 'recoil';

export const createTravelState = atom<'create' | 'edit' | 'add'>({
    key: 'createTravelState',
    default: 'create',
});
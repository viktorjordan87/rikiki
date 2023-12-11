import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'players', // this key is using to store data in local storage
	storage: localStorage, // configure which storage will be used to store the data
});

const playersAtom = atom({
	key: 'playersAtomKey',
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export { playersAtom };

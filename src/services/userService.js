import {storageService} from './storageService.js';

export const userService = {
  getUser,
  signup,
  addMove,
};

const USER_KEY = 'users';

function getUser() {
  let user = storageService.load(USER_KEY);
  return user;
}

function signup(name) {
  let currUser = storageService.load(USER_KEY);
  if (currUser && currUser.name === name) return currUser;
  const user = {
    name,
    coins: 100,
    moves: [],
  };
  storageService.store(USER_KEY, user);
  return user;
}

function addMove(contact, amount) {
  let user = storageService.load(USER_KEY);
  if (!user) return null; //check if good
  const {_id, name} = contact;
  let move = {
    toId: _id,
    to: name,
    at: Date.now(),
    amount,
  };
  user.moves.unshift(move);
  user.coins < amount ? console.log('cannot tramsfer') : (user.coins -= amount);
  storageService.store(USER_KEY, user);
  console.log('added move');
  return user;
}

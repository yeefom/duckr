import {usersDucksExpirationLength, userExpirationLength} from 'config/constants';

export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid
  };
}

export function formatDuck(text, {name, avatar, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now()
  };
}

export function formatTimestamp(time) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getMS(timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime();
}

export function staleDucks (timestamp) {
  return getMS(timestamp) > usersDucksExpirationLength;
}

export function staleUser(timestamp) {
  return getMS(timestamp) > userExpirationLength;
}

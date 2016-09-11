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

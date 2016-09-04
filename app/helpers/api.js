import {ref} from 'config/constants';

function saveToDucks(duck) {
  const duckId = ref.child('ducks').push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId});

  return {
    duckId,
    duckPromise
  };
}

function saveToUsersDucks(duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`).set({...duck, duckId});
}

function saveLikeCount(duckId) {
  return ref.child(`likeCount/${duckId}`).set(0);
}

export function saveDuck(duck) {
  const {duckId, duckPromise} = saveToDucks(duck);

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({...duck, duckId}));
}

export function listenToFeed(cb, errorCb) {
  // 'value', get change response as a whole
  // https://www.firebase.com/docs/web/api/query/on.html
  ref.child('ducks').on('value', snapshot => {
    const feed = snapshot.val() || {};
    const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp);
    cb(feed, sortedIds);
  }, errorCb);
}

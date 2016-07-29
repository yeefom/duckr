export default function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Yifeng',
        uid: 'yifeng'
      });
    }, 2000);
  });
}

export function checkIfAuthed(store) {
  // TODO check with Firebase
  return store.getState().isAuthed;
}

export function logout() {
  console.log('log out!!!');
}

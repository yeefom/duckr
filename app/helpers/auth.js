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

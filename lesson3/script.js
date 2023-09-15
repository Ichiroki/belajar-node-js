// Synchronous
// const getUser = (id) => {
//    const nama = id === 1 ? "Fahrezi" : "Rizqiawan";
//    return {id, nama}
// }

// const getFirstUser = getUser(1);
// console.log(getFirstUser)

// const getSecondUser = getUser(2);
// console.log(getSecondUser);

// const halo = "Hello World";
// console.log(halo);

// Asynchronous
const getUser = (id, cb) => {
   const time = id === 1 ? 3000 : 2000
   setTimeout(() => {
      const nama = id === 1 ? "Fahrezi" : "Rizqiawan"
      cb({ id, nama })
   }, time);
}

const getFirstUser = getUser(1, (hasil) => {
   console.log(hasil)
});

const getSecondUser = getUser(2, (hasil) => {
   console.log(hasil)
});

const halo = "Hello World";
console.log(halo);
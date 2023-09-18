// Core Module
// File System
const fs = require('fs');

// Menuliskan file secara synchronous
// try {
//    fs.writeFile('test.txt', 'Hello World secara synchronous') 
// } catch(e) {
//    console.log(e)
// }

// Menuliskan file secara asynchronous
// fs.writeFile('test.txt', 'Hello world secara asynchronous', (err) => {
//    console.log(err);
// })

// Membaca isi file secara synchronous
// const data = fs.readFileSync('test.txt', 'utf-8')

// console.log(data)

// Membaca isi file secara asynchronous
// const data = fs.readFile('test.txt', 'utf-8', (e, d) => {
//    if(e) throw e
//    console.log(d)
// })

// console.log(data)

// Membua folder secara synchronous
// fs.mkdirSync('data', {recursive: true})

// Readline
const readline = require('readline');
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
})

rl.question("Masukkan nama anda : ", (nama) => {
   rl.question("Masukkan umur anda : ", (umur) => {
      rl.question("Masukkan nomor HP anda : ", (nomor) => {

         // buat variabelnya
         const contact = {nama, umur, nomor}
         const file = fs.readFileSync('data/contacts.json', 'utf-8')
         const folder = 'data/contacts.json'
         const contacts = JSON.parse(file);
         
         contacts.push(contact)

         fs.writeFileSync(folder, JSON.stringify(contacts), 'utf-8')

         rl.close()
      })
   })
})


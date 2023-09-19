const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
})


// Membuat folder data (jika belum ada)
const dirPath = './data'
const dataPath = './data/contacts.json'
if(!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

// Membuat file contacts.json (jika belum ada)
if(!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const questionContact = (quest) => {
   return new Promise((resolve, reject) => {
      rl.question('Masukkan ' + quest + ' anda : ', (cb) => {
         resolve(cb);
      })
   })
}

const saveContact = (nama, umur, nomor) => {

   const contact = {nama, umur, nomor}
   const file = fs.readFileSync('data/contacts.json', 'utf-8')
   const folder = 'data/contacts.json'
   const contacts = JSON.parse(file);
         
   contacts.push(contact)

   fs.writeFileSync(folder, JSON.stringify(contacts, null, 3), 'utf-8')

   rl.close()
}

module.exports = { saveContact, questionContact };
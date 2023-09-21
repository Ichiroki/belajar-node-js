const fs = require('fs')
// const validator = require('validator')

// Membuat folder data (jika belum ada)
const dirPath = './data'
const dataPath = './data/contacts.json'
if(!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath)
}

// Membuat file contacts.json (jika belum ada)
if(!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
   const file = fs.readFileSync('./data/contacts.json', 'utf-8')
   const contacts = JSON.parse(file)
   return contacts
}

const findContact = (nama) => {
   const contacts = loadContact()
   const contact = contacts.find(c => c.nama == nama)
   return contact
}

module.exports = { loadContact, findContact }
const fs = require('fs')

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

const saveContact = (contacts) => {
   fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

const addContact = (contact) => {

   const contacts = loadContact()
   contacts.push(contact)
   saveContact(contacts) 
         
   contacts.push(contact)

   return contacts
}

// Check duplicate
const checkDuplicate = (nama) => {
   const contacts = loadContact()
   return contacts.find((c) => c.nama === nama)
}

module.exports = { loadContact, findContact, addContact, checkDuplicate }
var fs = require('fs')
var chalk = require('chalk')
var validator = require('validator')

// chalk
const error = chalk.bgRed.bold
const success = chalk.bgGreen.bold

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
   const file = fs.readFileSync('data/contacts.json', 'utf-8')
   const contacts = JSON.parse(file)
   return contacts
}

const saveContact = (nama, umur, nomor) => {

   const contact = {nama, umur, nomor}
   const folder = 'data/contacts.json'

   const nameDuplicate = contacts.find((contact) => contact.nama === nama)
   if(nameDuplicate) {
      console.log(
         error('This name was already exist !')
         )
      return false;
   }
   
   if(nomor) {
      if(!validator.isMobilePhone(nomor, 'id-ID')) {
         console.log(
            error('This number phone are not valid')
            )
         return false
      }
   }
         
   contacts.push(contact)

   fs.writeFileSync(folder, JSON.stringify(contacts, null, 3), 'utf-8')
}


const listContact = () => {
   const contacts = loadContact()
   contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama}`)
   })
}

const detailContact = (nama) => {
   const contacts = loadContact()
   const contact = contacts.find((contact) => 
      contact.nama.toLowerCase() === nama.toLowerCase()
   )

   if(!contact) {
      console.log(error(`${nama} did not found`))
      return false
   }

   console.log(success(contact.nama))
   console.log(success(contact.umur))
   console.log(success(contact.nomor))
}

const deleteContact = (nama) => {
   const contacts = loadContact()
   const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

   if(contacts.length === newContacts.length) {
      console.log(error(`${nama} did not found or was been deleted`));
   }

   fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

   console.log(success('This name has been deleted'))
}

module.exports = { saveContact, listContact, detailContact, deleteContact }
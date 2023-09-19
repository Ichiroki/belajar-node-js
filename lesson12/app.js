const { saveContact, listContact, detailContact, deleteContact } = require('./contacts')
const yargs = require('yargs')

yargs.command({
   command: 'add',
   describe: 'Menambahkan contact baru',
   builder: {
      nama : {
         describe: 'Nama Lengkap',
         demandOption: true,
         type: 'string'
      },
      umur: {
         describe: 'Umur',
         demandOption: true,
         type: 'string'
      },
      nomor_telepon: {
         describe: 'Nomor Telepon',
         demandOption: true,
         type: 'string'
      },
   },
   handler(argv) {
      saveContact(argv.nama, argv.umur, argv.nomor_telepon)
   }
}).demandCommand()

yargs.command({
   command: 'list',
   describe: 'Menampilkan list contact',
   handler() {
      listContact()
   }
})

// Menampilkan detail dari sebuah contact
yargs.command({
   command: 'detail',
   describe: 'Menampilkan detail contact',
   builder: {
      nama : {
         describe: 'Nama Lengkap',
         demandOption: true,
         type: 'string'
      }
   },
   handler(argv) {
      detailContact(argv.nama)
   }
})

// Menghapus user dari sebuah contact
yargs.command({
   command: 'delete',
   describe: 'Menghapus user dari contact',
   builder: {
      nama : {
         describe: 'Nama Lengkap',
         demandOption: true,
         type: 'string'
      }
   },
   handler(argv) {
      deleteContact(argv.nama)
   }
})

yargs.parse()
const yargs = require('yargs')
const { saveContact, listContact } = require('./contacts')

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

// Menampilkan daftar semua nama & no hp contact
yargs.command({
   command: 'add',
   describe: 'Menampilkan semua nama contact',
   handler() {
      listContact()
   }
})

yargs.parse()
const { saveContact, questionContact } = require('./contacts');

const main = async () => {
   // buat variabelnya
   const nama = await questionContact("nama")
   const umur = await questionContact("umur")
   const nomor = await questionContact("nomor telepon")

   saveContact(nama, umur, nomor)
}

main()

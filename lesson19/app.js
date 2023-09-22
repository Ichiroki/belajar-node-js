const express = require('express')
const compression = require('compression')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const { loadContact, findContact, addContact, deleteContact, updateContact, checkDuplicate } = require('./utils/contacts')

const app = express()
const port = 3000

// EJS
app.set('view engine', 'ejs')
app.use(compression())

// Third party middleware
app.use(expressLayouts)

// Konfigurasi Flash Message
app.use(cookieParser('secret')) // Flash
app.use(
   session({
      cookie: { maxAge: 6000 },
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}))
app.use(flash())

// Built-in middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.render('index', {
      title: "Home", 
      active: "home", 
      layout: 'layouts/main',})
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: "About", 
      active: "about", 
      layout: 'layouts/main',})
})

// Menampilkan isi kontak
app.get('/contact', (req, res, next) => {
   try {
   const contacts = loadContact()
   res.render('contact', {
      layout: 'layouts/main',   
      title: "Contact", 
      active: "contact", 
      msg: req.flash('msg'),
      contacts
   })
   } catch(err) {
      res.send(err);
   }
   next();
})

// Menambahkan kontak
app.get('/contact/add', (req, res) => {
   res.render('./contact/add', {
      layout: 'layouts/main',
      title: "Halaman Tambah Contact",
      active: 'contact',
   })
})

// Validasi data dari form AddContact
app.post('/contact', [
   // Periksa duplikasi nama input dengan nama yang disimpan di dalam data
   body('nama').custom((value) => {
      const duplicate = checkDuplicate(value);
      if(duplicate) {
         throw new Error('This name was already exist')
      }
      return true;
   }),
   // Periksa apakah umur sesuai dengan aturan minimal dan maksimal
   check('umur', 'This age are not expected from criteria')
   .isInt({min: 18, max: 99}),
   // Periksa apakah nomor telepon tersebut merupakan nomor telepon dari indonesia
   check('nomor', 'This number are not from Indonesia').isMobilePhone('id-ID'), 
   ], (req, res) => {
   // Validasi hasil menggunakan express-validation
   const err = validationResult(req);
   // Cek pengkondisian apakah variabel err kosong
   if(!err.isEmpty()) {
      // jika iya, lakukan hal dibawah
      res.render('./contact/add', {
         title: "Form Tambah Data Contact",
         layout: "layouts/main",
         active: "contact",
         errors: err.array() 
      })
   } else {
      // jika tidak, lakukan hal dibawah
      addContact(req.body)
      // Flash Message
      req.flash('msg', 'Data Successfully added !')
      res.redirect('/contact')
   }
})

// Menambahkan kontak
app.get('/contact/edit/:nama', (req, res) => {
   const contacts = findContact(req.params.nama)

   res.render('./contact/edit', {
      layout: 'layouts/main',
      title: "Halaman Tambah Contact",
      active: 'contact',
      contacts
   })
})

app.post('/contact/update', [
   // Periksa duplikasi nama input dengan nama yang disimpan di dalam data
   body('nama').custom((value, { req }) => {
      const duplicate = checkDuplicate(value);
      if(value !== req.body.oldNama && duplicate) {
         throw new Error('This name was already exist')
      }
      return true;
   }),
   // Periksa apakah umur sesuai dengan aturan minimal dan maksimal
   check('umur', 'This age are not expected from criteria')
   .isInt({min: 18, max: 99}),
   // Periksa apakah nomor telepon tersebut merupakan nomor telepon dari indonesia
   check('nomor', 'This number are not from Indonesia').isMobilePhone('id-ID'), 
   ], (req, res) => {
   // Validasi hasil menggunakan express-validation
   const err = validationResult(req);
   // Cek pengkondisian apakah variabel err kosong
   if(!err.isEmpty()) {
      // jika iya, lakukan hal dibawah
      res.render('./contact/edit', {
         title: "Form Edit Data Contact",
         layout: "layouts/main",
         active: "contact",
         errors: err.array(),
         contacts: req.body
      })
   } else {
      // jika tidak, lakukan hal dibawah
      updateContact(req.body)
      // Flash Message
      req.flash('msg', 'Data Successfully edited !')
      res.redirect('/contact')
   }
})

// Proses delete kontak
app.get('/contact/delete/:nama', (req, res) => {
   try {
      const contact = findContact(req.params.nama)

      if(!contact) {
         res.status(404)
         res.send('<h1>404</h1>')
      } else {
         deleteContact(req.params.nama)
         req.flash('msg', 'Data Successfully deleted !')
         res.redirect('/contact')
      }
   } catch(err) {
      console.log(err)
   }
})


app.get('/contact/:nama', (req, res) => {
   try {
      const contact = findContact(req.params.nama)

   res.render('detail', {
      layout: 'layouts/main',   
      title: "Halaman Detail Contact", 
      active: "contact", 
      contact}
      )
   } catch(err) {
      res.send(err);
   }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

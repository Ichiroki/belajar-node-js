const express = require('express')
const compression = require('compression')
const expressLayouts = require('express-ejs-layouts')

const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

// EJS
app.set('view engine', 'ejs')
app.use(compression())

// Third party middleware
app.use(expressLayouts)

// Built-in middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
   res.render('index', {
      nama: "Fahrezi", 
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

app.get('/contact', (req, res, next) => {
   try {
   const contacts = loadContact()
   console.log(contacts)
   res.render('contact', {
      layout: 'layouts/main',   
      title: "Contact", 
      active: "contact", 
      contacts}
      )
   } catch(err) {
      res.send(err);
   }
   next();
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

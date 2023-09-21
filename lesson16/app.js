const express = require('express')
const compression = require('compression')
const expressLayouts = require('express-ejs-layouts')

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
      content: 'index',
      layout: 'layouts/main',})
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: "About", 
      active: "home", 
      content: 'about',
      layout: 'layouts/main',})
})

app.get('/contact', (req, res, next) => {
   try {
   const contact = [
      {
         nama: "Fahrezi",
         umur: 21,
      },
      {
         nama: "Ichiroki",
         umur: 22,
      }
   ]
   res.render('contact', {
      content: 'contact',
      layout: 'layouts/main',   
      title: "Contact", 
      active: "home", 
      contact}
      )
   } catch(err) {
      res.send(err);
   }
   next();
})

app.get('/product/:id', (req, res) => {
   res.send(`Product ID :  ${req.params.id} <br> Category ID : ${req.query.category}`)
})

app.use('/', (req, res) => {
   res.status(404)
   res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
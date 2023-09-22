const express = require('express')
const layouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const blog = require('./model/blog')

const app = express()
const port = 3000;

// EJS
app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secret')) // Flash
app.use(
   session({
      cookie: { maxAge: 6000 },
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}))
app.use(flash())

// Home
app.get('/', (req, res) => {
   res.render('index', {
      title: "Home", 
      active: "home", 
      layout: 'layouts/main',
   })
})

// Contact
app.get('/contact', async (req, res, next) => {
   try {
   const contacts = await blog.find()
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

app.get('/contact/:nama', async (req, res) => {
   try {
   const blog = await blog.findOne({ slug: req.params.slug })

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
   console.log(`Mongo Contact App | Listening to http://localhost:${port}`)
})
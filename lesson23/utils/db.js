const mongoose = require('mongoose');
const blog = require('../model/blog')
mongoose.connect('mongodb://127.0.0.1:27017/blog');

// Menambah 1 Data
// const blog1 = new blog({
//    judul: "blog Kelima",
//    tag: "programming",
//    slug: "blog-kelima"
// })

// Simpan ke collection
// blog1.save().then((result) => {
//    console.log(result)
// }).catch(err => console.log(err))
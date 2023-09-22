const mongoose = require('mongoose');
const blog = mongoose.model('Blog', {
   judul: {
      type: String,
      required: true,
   },
   tag: {
      type: String,
      required: true,
   },
   slug: {
      type: String,
      required: true,
   }
})

module.exports = blog
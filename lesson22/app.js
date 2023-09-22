const { MongoClient, ObjectId } = require("mongodb")
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
  try {
   // pilih database
   const database = client.db('blog')
   const blogs = database.collection('blogs')

   // Menambahkan satu blog
   // blogs.insertOne({
   //    judul: 'Blog kelima',
   //    tag: 'programming',
   //    slug: 'blog-kelima'
   // }, (err, result) => {
   //    if(err) {
   //       return console.log('gagal menambahkan blog')
   //    }
   //    console.log(result)
   // })

   // menampilkan isi dari blogs
   // const findIt = await blogs.find({slug: 'blog-pertama-saya'}).toArray((err, res) => {
   //    console.log(res)
   // })
   // console.log(findIt)

   // Mengubah data berdasarkan id
   // const update = await blogs.updateOne({
   //    slug: 'blog-ketiga',
   // }, {
   //    $set: {
   //       tag: 'teknologi',
   //    }
   // })

   // console.log(update)
   // blogs.updateMany({
      
   // })

   // Menghapus data berdasarkan id
   const del = await blogs.deleteOne({
      slug: 'blog-saya-yang-keempat'
   }).then((res) => {
      console.log(res)
   }).catch((err) => {
      console.log(err)
   })

   console.log(del)
  } catch(err) {
    // memastikan bahwa aplikasi yang berjalan yang diakses oleh user dimatikan
   console.log(err)
  }
}

run()
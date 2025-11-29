import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URL)
const dbName = process.env.DB_NAME || 'after_school'

async function run() {
  await client.connect()
  const db = client.db(dbName)
  const lessons = db.collection('lessons')

  await lessons.deleteMany({})

  await lessons.insertMany([
    { topic: 'Maths',   subject: 'Maths',   location: 'Hendon',       price: 100, space: 5, spaces: 5, icon: '📘' },
    { topic: 'English', subject: 'English', location: 'Colindale',    price: 90,  space: 5, spaces: 5, icon: '📗' },
    { topic: 'Science', subject: 'Science', location: 'Brent Cross',  price: 110, space: 5, spaces: 5, icon: '🔬' },
    { topic: 'History', subject: 'History', location: 'Golders Green',price: 80,  space: 5, spaces: 5, icon: '📜' },
    { topic: 'Coding',  subject: 'Coding',  location: 'Hendon',       price: 120, space: 5, spaces: 5, icon: '💻' },
    { topic: 'Art',     subject: 'Art',     location: 'Colindale',    price: 70,  space: 5, spaces: 5, icon: '🎨' },
    { topic: 'Music',   subject: 'Music',   location: 'Brent Cross',  price: 95,  space: 5, spaces: 5, icon: '🎵' },
    { topic: 'Drama',   subject: 'Drama',   location: 'Golders Green',price: 85,  space: 5, spaces: 5, icon: '🎭' },
    { topic: 'Robotics',subject: 'Robotics',location: 'Hendon',       price: 130, space: 5, spaces: 5, icon: '🤖' },
    { topic: 'Sports',  subject: 'Sports',  location: 'Colindale',    price: 75,  space: 5, spaces: 5, icon: '🏅' }
  ])

  await client.close()
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})

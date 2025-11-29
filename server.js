import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
const port = process.env.PORT || 4000

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'after_school'

console.log('MONGO_URL value:', mongoUrl)

let db

app.use(cors())
app.use(express.json())

async function start() {
  const client = new MongoClient(mongoUrl)
  await client.connect()
  db = client.db(dbName)

  app.listen(port, () => {
    console.log('Server listening on port', port)
  })
}

app.get('/lessons', async (req, res) => {
  try {
    const lessons = await db.collection('lessons').find({}).toArray()
    res.json(lessons)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load lessons' })
  }
})

app.get('/orders', async (req, res) => {
  try {
    const orders = await db.collection('orders').find({}).toArray()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load orders' })
  }
})


app.post('/orders', async (req, res) => {
  try {
    const order = req.body

    if (!order.customerName || !order.customerPhone || !order.items) {
      res.status(400).json({ error: 'Invalid order data' })
      return
    }

    const result = await db.collection('orders').insertOne(order)
    res.status(201).json({ insertedId: result.insertedId })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' })
  }
})


app.put('/lessons/:id/spaces', async (req, res) => {
  try {
    const id = req.params.id
    const change = req.body.change
    const result = await db.collection('lessons').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { spaces: change } },
      { returnDocument: 'after' }
    )
    res.json(result.value)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update spaces' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})


start().catch(err => {
  console.error(err)
  process.exit(1)
})

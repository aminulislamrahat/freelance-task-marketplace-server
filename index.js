const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kwuhcc0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function run () {
  try {
    // await client.connect()

    /* projects curd start*/
    const projectCollection = client.db('marketPlaceDB').collection('projects')

    // create
    app.post('/create-project', async (req, res) => {
      const newProject = req.body
      newProject.deadline = new Date(newProject.deadline)
      const result = await projectCollection.insertOne(newProject)
      res.send(result)
    })
    // get all
    app.get('/get/all/projects', async (req, res) => {
      const result = await projectCollection.find().toArray()
      res.send(result)
    })
    // get recent
    app.get('/get/recent/projects', async (req, res) => {
      const result = await projectCollection
        .find()
        .sort({ deadline: 1 })
        .limit(8)
        .toArray()
      res.send(result)
    })
    // get project by user id
    app.get('/get/project/by/:id', async (req, res) => {
      const id = req.params.id

      const result = await projectCollection
        .find({
          createdByUserID: id
        })
        .sort({ deadline: 1 })
        .toArray()
      res.send(result)
    })
    // get project by projectId
    app.get('/get/project/by/projectId/:id', async (req, res) => {
      const id = req.params.id
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' })
      }
      const query = { _id: new ObjectId(id) }
      const result = await projectCollection.findOne(query)
      if (!result) {
        return res.status(404).json({ message: 'Task not found' })
      }
      res.send(result)
    })
    // delete project
    app.delete('/delete/project/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }

      const result = await projectCollection.deleteOne(query)

      res.send(result)
    })
    // update project
    app.put('/edit/project/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedProject = req.body
      updatedProject.deadline = new Date(updatedProject.deadline)
      const updatedDoc = {
        $set: updatedProject
      }
      const result = await projectCollection.updateOne(
        filter,
        updatedDoc,
        options
      )

      res.send(result)
    })

    //update bid
    app.patch('/project/bid/:id', async (req, res) => {
      const { currentBid } = req.body
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          currentBid: currentBid
        }
      }

      const result = await projectCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    /* projects curd end*/

    // await client.db('admin').command({ ping: 1 })
    // console.log(
    //   'Pinged your deployment. You successfully connected to MongoDB!'
    // )
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

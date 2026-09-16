import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let users = [
  { id: 1, name: 'Panda' },
  { id: 2, name: 'Koala' }
]

app.get('/', (req, res) => {
  res.status(200).send('Hello Express')
})

app.get('/api/users', (req, res) => {
  res.status(200).json(users)
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json(
      { message: 'User not found' }
    )
  }

  res.status(200).json(user)
})

app.post('/api/users', (req, res) => {
  const name = req.body.name

  if (!name) {
    return res.status(400).json(
      { message: 'Name is required' }
    )
  }

  const newUser = {
    id: users.length ? Math.max(...users.map(user => user.id)) + 1 : 1,
    name
  }

  users.push(newUser);
  res.status(201).json(newUser)
})

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json(
      { message: 'User not found' }
    )
  }
  if (!name) {
    return res.status(400).json(
      { message: 'Name is required' }
    )
  }

  user.name = name
  res.status(200).json(user)
})

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = users.findIndex(user => user.id === id)

  if (index === -1) {
    return res.status(404).json(
      { message: 'User not found' }
    )
  }

  const deletedUser = users[index]
  users.splice(index, 1)

  res.status(200).json({
    message: 'User deleted',
    user: deletedUser
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let users = [
  { id: 1, name: 'Panda' },
  { id: 2, name: 'Koala' }
]

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const newUser = req.body
  res.status(201).json({
    message: 'User created',
    user: newUser
  })
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  }

  users.push(newUser);
  res.status(201).json(newUser)
})

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name = req.body.name
  res.json(user)
})

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = users.findIndex(user => user.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' })
  }

  const deletedUser = users[index]
  users.splice(index, 1)

  res.json({
    message: 'User deleted',
    user: deletedUser
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
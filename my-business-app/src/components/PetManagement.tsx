import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Stack
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type Pet = {
  id: number
  name: string
  type: string
  age: string
}

function PetManagement() {
  const [pets, setPets] = useState<Pet[]>([])
  const [form, setForm] = useState<Omit<Pet, 'id'>>({ name: '', type: '', age: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  // Simulate fetching pets on mount (replace with real API call)
  React.useEffect(() => {
    setPets([
      { id: 1, name: 'Buddy', type: 'Dog', age: '5' },
      { id: 2, name: 'Whiskers', type: 'Cat', age: '3' }
    ])
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setPets(pets.map(p => p.id === editingId ? { ...p, ...form } : p))
      setMessage('Pet updated!')
      setEditingId(null)
    } else {
      const newId = pets.length ? Math.max(...pets.map(p => p.id)) + 1 : 1
      setPets([...pets, { id: newId, ...form }])
      setMessage('Pet added!')
    }
    setForm({ name: '', type: '', age: '' })
  }

  const handleEdit = (pet: Pet) => {
    setForm({ name: pet.name, type: pet.type, age: pet.age })
    setEditingId(pet.id)
  }

  const handleDelete = async (id: number) => {
    setPets(pets.filter(p => p.id !== id))
    setMessage('Pet deleted.')
    if (editingId === id) {
      setEditingId(null)
      setForm({ name: '', type: '', age: '' })
    }
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Manage Pets
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Pet Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="type"
            label="Type (e.g., Dog, Cat)"
            value={form.type}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="age"
            type="number"
            label="Age"
            value={form.age}
            onChange={handleChange}
            required
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              {editingId !== null ? 'Update' : 'Add'} Pet
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: '', type: '', age: '' })
                }}
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Typography variant="h6" gutterBottom>
        Your Pets
      </Typography>
      <List>
        {pets.map((p) => (
          <ListItem key={p.id} divider>
            <ListItemText
              primary={`${p.name} (${p.type})`}
              secondary={`Age: ${p.age}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(p)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(p.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default PetManagement
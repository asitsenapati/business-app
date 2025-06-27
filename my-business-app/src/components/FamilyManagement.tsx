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

type FamilyMember = {
  id: number
  name: string
  age: string
  relation: string
}

function FamilyManagement() {
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [form, setForm] = useState<Omit<FamilyMember, 'id'>>({ name: '', age: '', relation: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  // Simulate fetching members on mount (replace with real API call)
  React.useEffect(() => {
    setMembers([
      { id: 1, name: 'Alice', age: '35', relation: 'Spouse' },
      { id: 2, name: 'Bob', age: '10', relation: 'Child' }
    ])
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setMembers(members.map(m => m.id === editingId ? { ...m, ...form } : m))
      setMessage('Family member updated!')
      setEditingId(null)
    } else {
      const newId = members.length ? Math.max(...members.map(m => m.id)) + 1 : 1
      setMembers([...members, { id: newId, ...form }])
      setMessage('Family member added!')
    }
    setForm({ name: '', age: '', relation: '' })
  }

  const handleEdit = (member: FamilyMember) => {
    setForm({ name: member.name, age: member.age, relation: member.relation })
    setEditingId(member.id)
  }

  const handleDelete = async (id: number) => {
    setMembers(members.filter(m => m.id !== id))
    setMessage('Family member deleted.')
    if (editingId === id) {
      setEditingId(null)
      setForm({ name: '', age: '', relation: '' })
    }
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Manage Family Members
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={form.name}
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
          <TextField
            name="relation"
            label="Relation"
            value={form.relation}
            onChange={handleChange}
            required
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              {editingId !== null ? 'Update' : 'Add'} Family Member
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditingId(null)
                  setForm({ name: '', age: '', relation: '' })
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
        Family Members
      </Typography>
      <List>
        {members.map((m) => (
          <ListItem key={m.id} divider>
            <ListItemText
              primary={`${m.name} (${m.relation})`}
              secondary={`Age: ${m.age}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(m)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(m.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FamilyManagement
import React, { useState, useEffect } from 'react'
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
  IconButton,
  Stack,
  Divider,
  Avatar,
  Grid,
  Container
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'

type FamilyMember = {
  id: number
  name: string
  age: string
  relation: string
}

function FamilyManagement() {
  const [user] = useState(() => {
    const userString = localStorage.getItem('user')
    return userString ? JSON.parse(userString) : null
  })
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [form, setForm] = useState<Omit<FamilyMember, 'id'>>({ userId: user.id, name: '', age: '', relation: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; age?: string; relation?: string }>({})

  
  // Fetch family members from API on mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('http://localhost:5000/family/list/'+user.id)
        if (res.ok) {
          const data = await res.json()
          setMembers(data.members)
        }
      } catch {
        setMessage('Failed to load family members.')
      }
    }
    fetchMembers()
  }, [user.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.age.trim()) {
      newErrors.age = 'Age is required'
    } else if (isNaN(Number(form.age)) || Number(form.age) < 0) {
      newErrors.age = 'Age must be a valid number'
    }
    if (!form.relation.trim()) newErrors.relation = 'Relation is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      if (editingId !== null) {
        // Update member via API
        const res = await fetch(`http://localhost:5000/family/update/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const updated = await res.json()
          setMembers(members.map(m => m.id === editingId ? updated.member : m))
          setMessage('Family member updated!')
        } else {
          setMessage('Failed to update member.')
        }
        setEditingId(null)
      } else {
        // Add member via API, include userId
        const res = await fetch('http://localhost:5000/family/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, userId: user.id }),
        })
        if (res.ok) {
          const added = await res.json()
          setMembers([...members, added.member])
          setMessage('Family member added!')
        } else {
          setMessage('Failed to add member.')
        }
      }
    } catch {
      setMessage('Failed to save member.')
    }
    setForm({ name: '', age: '', relation: '' })
    setShowForm(false)
    setErrors({})
  }

  const handleEdit = (member: FamilyMember) => {
    setForm({ name: member.name, age: member.age, relation: member.relation })
    setEditingId(member.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/family/delete/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMembers(members.filter(m => m.id !== id))
        setMessage('Family member deleted.')
      } else {
        setMessage('Failed to delete member.')
      }
    } catch {
      setMessage('Failed to delete member.')
    }
    if (editingId === id) {
      setEditingId(null)
      setForm({ name: '', age: '', relation: '' })
      setShowForm(false)
    }
  }

  const handleAddClick = () => {
    setForm({ name: '', age: '', relation: '' })
    setEditingId(null)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setForm({ name: '', age: '', relation: '' })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        px: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
        backgroundImage: 'url("https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 1, md: 4 } }}>
        <Paper
          elevation={10}
          sx={{
            width: '100%',
            mx: 'auto',
            p: { xs: 2, sm: 4, md: 6 },
            borderRadius: 5,
            background: 'rgba(255,255,255,0.97)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
          }}
        >
          <Grid container spacing={6} alignItems="flex-start">
            {/* Family List */}
            <Grid item xs={12} md={7} lg={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 60, height: 60, boxShadow: 3 }}>
                  <FamilyRestroomIcon fontSize="large" />
                </Avatar>
                <Typography variant="h3" component="h2" fontWeight={900} color="primary.dark">
                  Family Members
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  fontSize: '1.15rem',
                  borderRadius: 3,
                  boxShadow: 2,
                  letterSpacing: 1
                }}
                onClick={handleAddClick}
              >
                Add Family Member
              </Button>
              {message && (
                <Alert severity="info" sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}>
                  {message}
                </Alert>
              )}
              <List sx={{ width: '100%' }}>
                {members.map((m) => (
                  <ListItem
                    key={m.id}
                    divider={false}
                    sx={{
                      bgcolor: '#f5f7fa',
                      borderRadius: 3,
                      mb: 2,
                      boxShadow: 2,
                      alignItems: 'flex-start',
                      px: 2,
                      py: 2,
                      '&:hover': { boxShadow: 6, bgcolor: '#e3f2fd' },
                      transition: 'all 0.2s'
                    }}
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(m)} sx={{ mr: 1 }}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(m.id)} sx={{ mr: 2 }}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    }
                    disableGutters
                  >
                    <Avatar sx={{ bgcolor: 'secondary.light', mr: 2, width: 48, height: 48, boxShadow: 1 }}>
                      <FamilyRestroomIcon fontSize="medium" />
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={700} fontSize="1.18rem" sx={{ mb: 0.2, wordBreak: 'break-word', color: 'primary.main' }}>
                        {m.name} <span style={{ color: '#888', fontWeight: 400 }}>({m.relation})</span>
                      </Typography>
                      <Typography fontSize="1.05rem" color="text.secondary">
                        Age: {m.age}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
                {members.length === 0 && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                    No family members added yet.
                  </Typography>
                )}
              </List>
            </Grid>
            {/* Form */}
            <Grid item xs={12} md={5} lg={4}>
              {showForm && (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    mb: 3,
                    bgcolor: '#f5f7fa',
                    borderRadius: 3,
                    boxShadow: 2,
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography variant="h5" fontWeight={800} color="primary" sx={{ mb: 2 }}>
                    {editingId !== null ? 'Edit Family Member' : 'Add Family Member'}
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      name="name"
                      label="Name"
                      value={form.name}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                    <TextField
                      name="age"
                      type="number"
                      label="Age"
                      value={form.age}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      error={!!errors.age}
                      helperText={errors.age}
                    />
                    <TextField
                      name="relation"
                      label="Relation"
                      value={form.relation}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.relation}
                      helperText={errors.relation}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
                        {editingId !== null ? 'Update' : 'Add'} Member
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{ fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default FamilyManagement
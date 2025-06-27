import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  MenuItem,
  Stack,
  List,
  ListItem,
  ListItemText
} from '@mui/material'

type ScheduleType = 'family' | 'pet'

type ScheduleItem = {
  id: number
  type: ScheduleType
  name: string
  pickup: string
  dropoff: string
}

function Scheduling() {
  const [items, setItems] = useState<ScheduleItem[]>([])
  const [form, setForm] = useState<Omit<ScheduleItem, 'id'>>({
    type: 'family',
    name: '',
    pickup: '',
    dropoff: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
    setItems([...items, { id: newId, ...form }])
    setMessage('Schedule saved!')
    setForm({ type: 'family', name: '', pickup: '', dropoff: '' })
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Schedule Pick-Up & Drop-Off
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            select
            name="type"
            label="Type"
            value={form.type}
            onChange={handleChange}
            required
            fullWidth
          >
            <MenuItem value="family">Family Member</MenuItem>
            <MenuItem value="pet">Pet</MenuItem>
          </TextField>
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="pickup"
            label="Pick-Up Time"
            type="datetime-local"
            value={form.pickup}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="dropoff"
            label="Drop-Off Time"
            type="datetime-local"
            value={form.dropoff}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Schedule
          </Button>
        </Stack>
      </Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Typography variant="h6" gutterBottom>
        Scheduled Items
      </Typography>
      <List>
        {items.map(item => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={`[${item.type === 'family' ? 'Family' : 'Pet'}] ${item.name}`}
              secondary={`Pick-Up at ${item.pickup}, Drop-Off at ${item.dropoff}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Scheduling
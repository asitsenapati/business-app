import React, { useState, useEffect } from 'react'
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
  Avatar,
  Divider,
  Container
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import PetsIcon from '@mui/icons-material/Pets'

type ScheduleType = 'family' | 'pet'

type ScheduleItem = {
  id: number
  type: ScheduleType
  memberId: string
  pickup: string
  dropoff: string
}

function Scheduling() {
  const [items, setItems] = useState<ScheduleItem[]>([])
  const [form, setForm] = useState<Omit<ScheduleItem, 'id' | 'name'> & { memberId: string }>({
    type: 'family',
    memberId: '',
    pickup: '',
    dropoff: '',
  })
  const [message, setMessage] = useState('')
  const [nameOptions, setNameOptions] = useState<{ id: number; name: string }[]>([])
  const [user] = useState(() => {
    const userString = localStorage.getItem('user')
    return userString ? JSON.parse(userString) : null
  })
  const [errors, setErrors] = useState<{ memberId?: string; pickup?: string; dropoff?: string }>({})

  // Fetch names when type or user changes
  useEffect(() => {
    if (!user) return
    const fetchNames = async () => {
      let url = ''
      if (form.type === 'family') {
        url = `http://localhost:5000/family/list/${user.id}`
      } else if (form.type === 'pet') {
        url = `http://localhost:5000/pets/list/${user.id}`
      }
      try {
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          if (form.type === 'family') {
            setNameOptions(data.members?.map((m: any) => ({ id: m.id, name: m.name })) || [])
          } else {
            setNameOptions(data.pets?.map((p: any) => ({ id: p.id, name: p.name })) || [])
          }
        } else {
          setNameOptions([])
        }
      } catch {
        setNameOptions([])
      }
    }
    fetchNames()
    setForm(f => ({ ...f, memberId: '' })) // Reset memberId when type changes
    // eslint-disable-next-line
  }, [form.type, user])

  // Fetch scheduled items from API on mount and after add
  useEffect(() => {
    if (!user) return
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`http://localhost:5000/schedule/list/${user.id}`)
        if (res.ok) {
          const data = await res.json()
          setItems(data.schedules || [])
        } else {
          setItems([])
        }
      } catch {
        setItems([])
      }
    }
    fetchSchedules()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Validation function
  const validate = () => {
    const newErrors: typeof errors = {}
    if (!form.memberId) newErrors.memberId = 'Please select a name'
    if (!form.pickup) newErrors.pickup = 'Pick-Up time is required'
    if (!form.dropoff) newErrors.dropoff = 'Drop-Off time is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const res = await fetch('http://localhost:5000/schedule/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          userId: user.id,
        }),
      })
      if (res.ok) {
        setMessage('Schedule saved!')
        // Refresh the schedule list from API
        const listRes = await fetch(`http://localhost:5000/schedule/list/${user.id}`)
        if (listRes.ok) {
          const listData = await listRes.json()
          setItems(listData.schedules || [])
        }
      } else {
        setMessage('Failed to save schedule.')
      }
    } catch {
      setMessage('Failed to save schedule.')
    }
    setForm({ type: 'family', memberId: '', pickup: '', dropoff: '' })
    setTimeout(() => setMessage(''), 2000)
    setErrors({})
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
        py: { xs: 4, md: 8 },
        px: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 1, md: 4 } }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mr: 2,
                width: 56,
                height: 56,
                boxShadow: 2,
              }}
            >
              <AccessTimeIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" fontWeight={900} color="primary.dark" sx={{ letterSpacing: 1 }}>
              Schedule Pick-Up & Drop-Off
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <Stack spacing={2}>
              <TextField
                select
                name="type"
                label="Type"
                value={form.type}
                onChange={handleChange}
                fullWidth
                sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
              >
                <MenuItem value="family">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FamilyRestroomIcon sx={{ mr: 1 }} fontSize="small" />
                    Family Member
                  </Box>
                </MenuItem>
                <MenuItem value="pet">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PetsIcon sx={{ mr: 1 }} fontSize="small" />
                    Pet
                  </Box>
                </MenuItem>
              </TextField>
              <TextField
                select
                name="memberId"
                label={form.type === 'family' ? 'Family Member Name' : 'Pet Name'}
                value={form.memberId}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                disabled={nameOptions.length === 0}
                error={!!errors.memberId}
                helperText={errors.memberId}
                sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
              >
                {nameOptions.length === 0 ? (
                  <MenuItem value="">
                    {form.type === 'family' ? 'No family members found' : 'No pets found'}
                  </MenuItem>
                ) : (
                  nameOptions.map((n) => (
                    <MenuItem key={n.id} value={n.id}>
                      {n.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
              <TextField
                name="pickup"
                label="Pick-Up Time"
                type="datetime-local"
                value={form.pickup}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.pickup}
                helperText={errors.pickup}
                sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
              />
              <TextField
                name="dropoff"
                label="Drop-Off Time"
                type="datetime-local"
                value={form.dropoff}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.dropoff}
                helperText={errors.dropoff}
                sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: 2,
                  letterSpacing: 1
                }}
              >
                Save Schedule
              </Button>
            </Stack>
          </Box>
          {message && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}>
              {message}
            </Alert>
          )}
          <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mt: 4, letterSpacing: 1 }}>
            Scheduled Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ width: '100%', px: 0 }}>
            {items.map(item => {
              const displayName = nameOptions.find(n => String(n.id) === String(item.memberId))?.name || item.memberId
              return (
                <ListItem
                  key={item.id}
                  sx={{
                    bgcolor: '#f5f7fa',
                    borderRadius: 3,
                    mb: 2,
                    boxShadow: 2,
                    alignItems: 'flex-start',
                    px: 2,
                    py: 2,
                    '&:hover': { boxShadow: 4, bgcolor: '#e3f2fd' },
                    transition: 'all 0.2s'
                  }}
                  disableGutters
                >
                  <Avatar sx={{ bgcolor: item.type === 'family' ? 'primary.light' : 'secondary.light', mr: 2, mt: 0.5, width: 44, height: 44 }}>
                    {item.type === 'family' ? <FamilyRestroomIcon /> : <PetsIcon />}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} fontSize="1.1rem" sx={{ mb: 0.2 }}>
                      [{item.type === 'family' ? 'Family' : 'Pet'}] {displayName}
                    </Typography>
                    <Typography fontSize="0.98rem" color="text.secondary">
                      Pick-Up: {item.pickup ? new Date(item.pickup).toLocaleString() : '-'}
                    </Typography>
                    <Typography fontSize="0.98rem" color="text.secondary">
                      Drop-Off: {item.dropoff ? new Date(item.dropoff).toLocaleString() : '-'}
                    </Typography>
                  </Box>
                </ListItem>
              )
            })}
            {items.length === 0 && (
              <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
                No scheduled items yet.
              </Typography>
            )}
          </List>
        </Paper>
      </Container>
    </Box>
  )

}

export default Scheduling
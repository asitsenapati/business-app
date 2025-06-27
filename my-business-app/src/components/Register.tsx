import React, { useState } from 'react'
// Add Material UI imports
import { Box, Button, TextField, Typography, Alert, Grid } from '@mui/material'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with your API endpoint
    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setMessage('Registration successful!')
      setSuccess(true)
      setForm({ name: '', email: '', password: '' })
    } else {
      setMessage('Registration failed.')
      setSuccess(false)
    }
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        minHeight: '100vh',
        mx: 0,
        mt: 0,
        boxShadow: 0,
        borderRadius: 0,
        overflow: 'hidden',
        flexWrap: { xs: 'wrap', md: 'nowrap' }
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'stretch',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1976d2 60%, #43a047 100%)',
          p: 0,
          minHeight: '100vh'
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <img
            src="https://st.depositphotos.com/1743476/2446/i/450/depositphotos_24462049-stock-photo-happy-business-in-meeting.jpg"
            alt="Register"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,
              boxShadow: 'none'
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#fff',
          p: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </Box>
          {message && (
            <Alert severity={success ? 'success' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Register
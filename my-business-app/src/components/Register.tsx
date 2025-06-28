import React, { useState } from 'react'
// Add Material UI imports
import { Box, Button, TextField, Typography, Alert, Grid } from '@mui/material'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState<boolean | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setSuccess(null)
    if (!validate()) return
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
          width: '100%',
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
          background: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
          p: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            mx: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 6,
            p: { xs: 2, sm: 4 },
            opacity: 0.97,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 1, mb: 3 }}
          >
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
              error={!!errors.name}
              helperText={errors.name}
              sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
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
              error={!!errors.email}
              helperText={errors.email}
              sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
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
              error={!!errors.password}
              helperText={errors.password}
              sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 2,
                letterSpacing: 1
              }}
            >
              Register
            </Button>
          </Box>
          {message && (
            <Alert severity={success ? 'success' : 'error'} sx={{ mt: 3, fontWeight: 600, textAlign: 'center' }}>
              {message}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Register
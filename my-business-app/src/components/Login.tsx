import React, { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
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
    if (!validate()) return
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data.user))
        setMessage('Login successful!')
        navigate('/services');
      } else {
        setMessage('Login failed. Please check your credentials.')
      }
    } catch (error) {
      setMessage('Login failed. Please try again later.')
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
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
            alt="Login"
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
            gutterBottom
            align="center"
            sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 1, mb: 3 }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ bgcolor: '#f7fbfc', borderRadius: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
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
              Login
            </Button>
          </form>
          {message && (
            <Typography
              color={message.startsWith('Login successful') ? 'success.main' : 'error.main'}
              sx={{
                mt: 3,
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: 0.5,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
  TextField,
  Link,
  List,
  ListItem,
  Rating,
  Grid,
  Divider
} from '@mui/material'
import Container from '@mui/material/Container'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'

function FeedbackSupport() {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number | null>(5)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    if (!feedback.trim()) {
      setError('Feedback is required.')
      return
    }
    if (!rating || rating < 1) {
      setError('Please provide a rating.')
      return
    }
    try {
      const res = await fetch('http://localhost:5000/support/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, rating }),
      })
      if (res.ok) {
        setMessage('Thank you for your feedback!')
        setFeedback('')
        setRating(5)
      } else {
        setError('Failed to send feedback. Please try again.')
      }
    } catch {
      setError('Failed to send feedback. Please try again.')
    }
  }

  return (
    <Box
      sx={{
        bgcolor: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
        minHeight: '100vh',
        py: 8,
        px: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            mx: 'auto',
            mt: 6,
            p: { xs: 2, sm: 4 },
            borderRadius: 5,
            background: 'rgba(255,255,255,0.96)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          }}
        >
          <Grid container spacing={4} alignItems="stretch">
            {/* Contact Info Left */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                borderRight: { md: '1px solid #e0e0e0' },
                pr: { md: 4 },
                mb: { xs: 4, md: 0 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', md: 'flex-start' },
                bgcolor: { xs: 'transparent', md: 'transparent' },
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 1 }}>
                Contact Us
              </Typography>
              <Divider sx={{ width: '60px', mb: 2, borderColor: 'primary.main' }} />
              <List sx={{ width: '100%' }}>
                <ListItem sx={{ px: 0, mb: 1 }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Link href="mailto:support@mybusiness.com" underline="hover" sx={{ fontWeight: 500 }}>
                    support@mybusiness.com
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 1 }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Link href="tel:+1234567890" underline="hover" sx={{ fontWeight: 500 }}>
                    +1 234 567 890
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0, mb: 1 }}>
                  <ChatIcon color="primary" sx={{ mr: 2 }} />
                  <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
                    Live Chat
                  </Link>
                </ListItem>
              </List>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
                Our support team is available <b>24/7</b> to help you.
              </Typography>
            </Grid>
            {/* Support Form Right */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 1 }}>
                  Feedback & Support
                </Typography>
                <Divider sx={{ width: '60px', mb: 2, borderColor: 'primary.main' }} />
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography component="legend" sx={{ mb: 1, fontWeight: 600 }}>
                        Rate our service:
                      </Typography>
                      <Rating
                        name="rating"
                        value={rating}
                        onChange={(_, value) => setRating(value)}
                        max={5}
                        size="large"
                      />
                    </Box>
                    <TextField
                      label="Your feedback"
                      placeholder="Share your experience or suggestions..."
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      multiline
                      rows={4}
                      fullWidth
                      error={!!error && !feedback.trim()}
                      helperText={!!error && !feedback.trim() ? error : ''}
                      sx={{ bgcolor: '#f5f7fa', borderRadius: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
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
                      Submit Feedback
                    </Button>
                  </Stack>
                </Box>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {message}
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default FeedbackSupport
import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  Stack,
  MenuItem,
  TextField,
  Link,
  List,
  ListItem,
  Rating
} from '@mui/material'

function FeedbackSupport() {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number | null>(5)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with real API call to submit feedback
    // await fetch('/api/feedback', { method: 'POST', ... })
    setMessage('Thank you for your feedback!')
    setFeedback('')
    setRating(5)
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Feedback & Support
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography component="legend" sx={{ mb: 1 }}>
              Rate our service:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(_, value) => setRating(value)}
              max={5}
            />
          </Box>
          <TextField
            label="Your feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
            multiline
            rows={4}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
        </Stack>
      </Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Typography variant="h6" gutterBottom>
        Need Support?
      </Typography>
      <List>
        <ListItem>
          <Link href="mailto:support@mybusiness.com" underline="hover">
            Email: support@mybusiness.com
          </Link>
        </ListItem>
        <ListItem>
          <Link href="tel:+1234567890" underline="hover">
            Phone: +1 234 567 890
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/chat-support" underline="hover">
            Live Chat
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default FeedbackSupport
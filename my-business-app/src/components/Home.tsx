import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

const services = [
  { name: 'Consulting', description: 'Expert advice for your business.' },
  { name: 'Support', description: '24/7 customer support.' },
  { name: 'Analytics', description: 'Data-driven insights.' },
]

const usps = [
  'Fast and reliable service',
  'Affordable pricing',
  'Trusted by hundreds of customers',
]

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Welcome to My Business App</Typography>
      <Typography variant="h6" gutterBottom>Our Services</Typography>
      <List>
        {services.map(service => (
          <ListItem key={service.name}>
            <Typography>
              <strong>{service.name}</strong>: {service.description}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>Why Choose Us?</Typography>
      <List>
        {usps.map((usp, i) => (
          <ListItem key={i}>
            <Typography>{usp}</Typography>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" component={RouterLink} to="/register">Register</Button>
        <Button variant="outlined" component={RouterLink} to="/services">Explore Services</Button>
      </Stack>
    </Container>
  )
}

export default Home
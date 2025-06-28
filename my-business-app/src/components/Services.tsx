import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import GroupIcon from '@mui/icons-material/Group'
import PetsIcon from '@mui/icons-material/Pets'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { Link as RouterLink } from 'react-router-dom'

const services = [
  {
    name: 'Family Member Management',
    description: 'Easily manage your family members and their details.',
    icon: <GroupIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />,
    link: '/family-management',
  },
  {
    name: 'Pet Management',
    description: 'Keep track of your pets and their needs.',
    icon: <PetsIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />,
    link: '/pet-management',
  },
  {
    name: 'Pick-Up and Drop-Off',
    description: 'Convenient pick-up and drop-off scheduling.',
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />,
    link: '/schedule',
  },
  {
    name: 'Payment',
    description: 'Secure and easy payment options.',
    icon: <PaymentIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />,
    link: '/services/payment',
  },
  {
    name: 'Support',
    description: '24/7 customer support for all your needs.',
    icon: <SupportAgentIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />,
    link: '/support',
  },
]

function Services() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
        py: 8,
        px: 1,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          fontWeight={700}
          align="center"
          gutterBottom
          color="primary"
          sx={{ letterSpacing: '-1px', mb: 2 }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Discover what we offer to help your family and pets thrive.
        </Typography>
        <Grid
          container
          spacing={6} // Increased spacing for more space between boxes
          justifyContent="center"
        >
          {services.map((service) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={service.name}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                component={RouterLink}
                to={service.link}
                rel="noopener"
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  height: '100%',
                  minHeight: 280,
                  width: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: 'linear-gradient(120deg, #fff 70%, #e3f2fd 100%)',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-8px) scale(1.04)',
                  },
                  p: 2,
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 1,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ mb: 1, color: 'primary.main', letterSpacing: '-0.5px' }}
                  >
                    {service.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '1rem', mb: 1 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Services
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

const services = [
  { name: 'Consulting', description: 'Expert advice for your business.', icon: <BusinessCenterIcon color="primary" sx={{ mr: 1 }} /> },
  { name: 'Support', description: '24/7 customer support.', icon: <SupportAgentIcon color="primary" sx={{ mr: 1 }} /> },
  { name: 'Analytics', description: 'Data-driven insights.', icon: <AnalyticsIcon color="primary" sx={{ mr: 1 }} /> },
]

const usps = [
  'Fast and reliable service',
  'Affordable pricing',
  'Trusted by hundreds of customers',
]

const sliderImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
]

function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  }

  const navigate = useNavigate()

  // Handler for Get Started and Register Now buttons
  const handleGetStarted = () => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/services')
    } else {
      navigate('/register')
    }
  }

  // Handler for Explore Services button
  const handleExploreServices = () => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/services')
    } else {
      navigate('/login')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)',
        py: 6,
      }}
    >
      {/* Image Slider */}
      <Container maxWidth={false} disableGutters sx={{ mb: 4, width: '90%' }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((src, idx) => (
            <Box key={idx} sx={{ px: 1 }}>
              <Box
                component="img"
                src={src}
                alt={`slide-${idx + 1}`}
                sx={{
                  width: '100%',
                  height: { xs: 180, sm: 280, md: 340 },
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: 4,
                  border: '4px solid #fff',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Container>

      <Container maxWidth={false} disableGutters sx={{ width: '90%' }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            py: { xs: 4, md: 7 },
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: 3,
            background: 'linear-gradient(120deg, #ffffff 70%, #e3f2fd 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            color="primary"
            sx={{
              letterSpacing: '-2px',
              fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
              mb: 2,
            }}
          >
            Welcome to My Business App
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            Your one-stop solution for business growth and support.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: 2,
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleExploreServices}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderWidth: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: '#fff',
                },
              }}
            >
              Explore Services
            </Button>
          </Stack>
          <Box
            sx={{
              position: 'absolute',
              right: -60,
              top: -60,
              width: 180,
              height: 180,
              bgcolor: '#e3f2fd',
              borderRadius: '50%',
              opacity: 0.3,
              zIndex: 0,
            }}
          />
        </Box>

        {/* Services Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box sx={{ width: '100%', maxWidth: 1200, textAlign: 'center' }}>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ mt: 4, mb: 3, color: 'primary.main', letterSpacing: '-1px' }}
            >
              Our Services
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{
                mb: 4,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {services.map(service => (
                <Grid item xs={12} sm={6} md={4} key={service.name}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.03)',
                        boxShadow: 6,
                      },
                      p: 1,
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        {service.icon}
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 0 }}>
                          {service.name}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary">{service.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* USPs Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              mx: 'auto',
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: 2,
              py: 4,
              mb: 6,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ color: 'primary.main', mb: 2 }}
            >
              Why Choose Us?
            </Typography>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 4,
                textAlign: 'left',
                mx: 'auto',
              }}
            >
              {usps.map((usp, i) => (
                <ListItem
                  key={i}
                  sx={{
                    alignItems: 'flex-start',
                    width: 'auto',
                    p: 0,
                  }}
                  disableGutters
                >
                  <CheckCircleIcon color="success" sx={{ mr: 1, mt: '3px', fontSize: 28 }} />
                  <Typography fontWeight={600} fontSize="1.1rem">{usp}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Registration Prompt */}
        <Box
          sx={{
            mt: 6,
            p: { xs: 2, sm: 3 },
            bgcolor: '#e0e0e0',
            borderRadius: 3,
            textAlign: 'center',
            boxShadow: 0,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Ready to grow your business?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{ mt: 2, px: 5, fontWeight: 700, fontSize: '1.1rem' }}
          >
            Register Now
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Home
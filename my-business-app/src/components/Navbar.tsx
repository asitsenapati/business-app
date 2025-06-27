import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: 'left'
          }}
        >
          My Business App
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/register"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/family-management"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Family
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/pet-management"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Pets
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/schedule"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Schedule
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/support"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Support
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin"
            sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
          >
            Admin
          </Button>
            <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{ '&:hover': { color: 'inherit', backgroundColor: 'rgba(255,255,255,0.08)' } }}
            >
                Login
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        bgcolor: '#e3f2fd', // Light blue background
        color: 'text.primary',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Business App. All rights reserved. |{" "}
        <a
          href="/admin"
          style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}
        >
          Admin
        </a>
      </Typography>
    </Box>
  )
}

export default Footer
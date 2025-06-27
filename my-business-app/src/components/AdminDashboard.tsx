import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Stack,
  Button,
  Grid
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
// Add chart.js and react-chartjs-2 imports
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type User = { id: number; name: string; email: string }
type Service = { id: number; name: string; description: string }

function AdminDashboard() {
  // Simulated data; replace with real API calls
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice', email: 'alice@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com' }
  ])
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Consulting', description: 'Business consulting' },
    { id: 2, name: 'Support', description: '24/7 support' }
  ])
  const [report] = useState({ users: 2, services: 2, engagement: 'High' })

  // Example edit/delete handlers
  const handleDeleteUser = (id: number) => setUsers(users.filter(u => u.id !== id))
  const handleDeleteService = (id: number) => setServices(services.filter(s => s.id !== id))

  // Chart data
  const chartData = {
    labels: ['Users', 'Services'],
    datasets: [
      {
        label: 'Count',
        data: [report.users, report.services],
        backgroundColor: ['#1976d2', '#43a047']
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            <List>
              {users.map(u => (
                <ListItem key={u.id} divider>
                  <ListItemText primary={u.name} secondary={u.email} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="error" onClick={() => handleDeleteUser(u.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {users.length === 0 && (
                <ListItem>
                  <ListItemText primary="No users found." />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <List>
              {services.map(s => (
                <ListItem key={s.id} divider>
                  <ListItemText primary={s.name} secondary={s.description} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="error" onClick={() => handleDeleteService(s.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {services.length === 0 && (
                <ListItem>
                  <ListItemText primary="No services found." />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>
          Reports
        </Typography>
        <Box sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
        <Stack spacing={1}>
          <Typography>Total Users: {report.users}</Typography>
          <Typography>Total Services: {report.services}</Typography>
          <Typography>User Engagement: {report.engagement}</Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default AdminDashboard
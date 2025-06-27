import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Home from './components/Home';
import Register from './components/Register';
import FamilyManagement from './components/FamilyManagement'
import PetManagement from './components/PetManagement'
import Navbar from './components/Navbar'
import Scheduling from './components/Scheduling'
import FeedbackSupport from './components/FeedbackSupport'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />   
        <Route path="/family-management" element={<FamilyManagement />} />
        <Route path="/pet-management" element={<PetManagement />} />
        <Route path="/schedule" element={<Scheduling />} />
        <Route path="/support" element={<FeedbackSupport />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
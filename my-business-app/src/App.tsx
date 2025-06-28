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
import Footer from './components/Footer'
import Services from './components/Services'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Container
  maxWidth={false}
  disableGutters
  sx={{
    width: '100vw',
    mx: 0,
    mt: 0,
    p: 0,
    boxSizing: 'border-box',
  }}
>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />   
        <Route path="/family-management" element={<FamilyManagement />} />
        <Route path="/pet-management" element={<PetManagement />} />
        <Route path="/schedule" element={<Scheduling />} />
        <Route path="/support" element={<FeedbackSupport />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App
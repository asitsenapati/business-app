import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import GroupIcon from "@mui/icons-material/Group";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PetsIcon from "@mui/icons-material/Pets";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventNoteIcon from "@mui/icons-material/EventNote";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type User = { id: number; name: string; email: string };
type Service = { id: number; name: string; description: string };
type ReportData = {
  totalFamilyMembers: number;
  totalPets: number;
  totalSchedules: number;
  totalPayments: number;
};
const services = [
  {
    name: "Family Member Management",
  },
  {
    name: "Pet Management",
  },
  {
    name: "Pick-Up and Drop-Off",
  },
  {
    name: "Payment",
  },
  {
    name: "Support",
  },
];
function AdminDashboard() {
  // Fetch users from API
  const [users, setUsers] = useState<User[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      setReportLoading(true);
      setReportError(false);
      try {
        const res = await fetch("http://localhost:5000/admin/reports");
        if (res.ok) {
          const data = await res.json();
          setReportData(data);
        } else {
          setReportData(null);
          setReportError(true);
        }
      } catch {
        setReportData(null);
        setReportError(true);
      }
      setReportLoading(false);
    };
    fetchReport();
  }, []);

  // Dynamically calculate report
  const report = {
    users: users.length,
    services: services.length,
    engagement: users.length > 0 ? "High" : "Low",
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  // Chart data for reportData
  const reportChartData = reportData
    ? {
        labels: ["Family Members", "Pets", "Schedules", "Payments"],
        datasets: [
          {
            label: "Count",
            data: [
              reportData.totalFamilyMembers,
              reportData.totalPets,
              reportData.totalSchedules,
              reportData.totalPayments,
            ],
            backgroundColor: ["#1976d2", "#43a047", "#ffa000", "#d32f2f"],
          },
        ],
      }
    : {
        labels: [],
        datasets: [],
      };

  // Helper to get icon by service name
  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Family Member Management":
        return <FamilyRestroomIcon />;
      case "Pet Management":
        return <PetsIcon />;
      case "Pick-Up and Drop-Off":
        return <LocalShippingIcon />;
      case "Payment":
        return <PaymentIcon />;
      case "Support":
        return <SupportAgentIcon />;
      default:
        return <BusinessCenterIcon />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: { xs: 2, sm: 5, md: 7 },
          maxWidth: 1350,
          mx: "auto",
          borderRadius: 10,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 12px 40px 0 rgba(31,38,135,0.18)",
        }}
      >
        {/* Title Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={4}
          sx={{ mb: 6, justifyContent: "center" }}
        >
          <TrendingUpIcon color="primary" sx={{ fontSize: 64 }} />
          <Box>
            <Typography
              variant="h2"
              color="primary"
              sx={{ fontWeight: 900, letterSpacing: 2, mb: 1, fontSize: { xs: 32, sm: 48 } }}
            >
              Admin Dashboard
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 24 }}>
              Welcome! Here is your business analytics overview.
            </Typography>
          </Box>
        </Stack>
        {/* Reports Section */}
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 800, mb: 3, letterSpacing: 1 }}
        >
          Reports
        </Typography>
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            mb: 6,
            bgcolor: "#f3e5f5",
            p: { xs: 2, sm: 5 },
            borderRadius: 6,
            boxShadow: 4,
          }}
        >
          {reportLoading ? (
            <Typography>Loading report...</Typography>
          ) : reportError ? (
            <Typography color="error">Failed to load report data.</Typography>
          ) : (
            <Bar data={reportChartData} options={chartOptions} height={160} />
          )}
        </Box>
        <Stack
          spacing={4}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              minWidth: 220,
              textAlign: "center",
              borderRadius: 6,
              bgcolor: "#e3f2fd",
              boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.08)",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", mx: "auto", mb: 2, width: 56, height: 56 }}>
              <PeopleAltIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 18 }}>
              Total Users
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
              {report.users}
            </Typography>
          </Paper>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              minWidth: 220,
              textAlign: "center",
              borderRadius: 6,
              bgcolor: "#fff8e1",
              boxShadow: "0 4px 24px 0 rgba(255, 160, 0, 0.08)",
            }}
          >
            <Avatar sx={{ bgcolor: "#ffa000", mx: "auto", mb: 2, width: 56, height: 56 }}>
              <BusinessCenterIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 18 }}>
              Total Services
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
              {report.services}
            </Typography>
          </Paper>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              minWidth: 220,
              textAlign: "center",
              borderRadius: 6,
              bgcolor: "#e8f5e9",
              boxShadow: "0 4px 24px 0 rgba(67, 160, 71, 0.08)",
            }}
          >
            <Avatar sx={{ bgcolor: "#43a047", mx: "auto", mb: 2, width: 56, height: 56 }}>
              <TrendingUpIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 18 }}>
              Engagement
            </Typography>
            <Typography
              variant="h3"
              color={report.engagement === "High" ? "success.main" : "warning.main"}
              sx={{ fontWeight: 800 }}
            >
              {report.engagement}
            </Typography>
          </Paper>
        </Stack>
        <Divider sx={{ my: 5 }} />
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, letterSpacing: 1 }}>
          Analytics
        </Typography>
        <Grid container spacing={5} justifyContent="center" sx={{ mb: 6 }}>
          {reportData && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: "#e3f2fd",
                    minHeight: 150,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#1976d2", mx: "auto", mb: 2, width: 48, height: 48 }}>
                    <GroupIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 16 }}>
                    Family Members
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {reportData.totalFamilyMembers}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: "#fff8e1",
                    minHeight: 150,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#ffa000", mx: "auto", mb: 2, width: 48, height: 48 }}>
                    <PetsIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 16 }}>
                    Pets
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {reportData.totalPets}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: "#f3e5f5",
                    minHeight: 150,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#8e24aa", mx: "auto", mb: 2, width: 48, height: 48 }}>
                    <EventNoteIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 16 }}>
                    Schedules Added
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {reportData.totalSchedules}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: "#ffebee",
                    minHeight: 150,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#d32f2f", mx: "auto", mb: 2, width: 48, height: 48 }}>
                    <PaymentIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 16 }}>
                    Payments
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {reportData.totalPayments}
                  </Typography>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
        <Divider sx={{ my: 5 }} />
        {/* Users & Services Section */}
        <Grid container spacing={6} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              color="secondary"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Users
            </Typography>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                mb: 2,
                bgcolor: "#f5faff",
                minHeight: 340,
                p: 3,
                boxShadow: "0 2px 12px 0 rgba(25, 118, 210, 0.06)",
              }}
            >
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {users.map((u, idx) => (
                  <ListItem key={u.id ?? idx} divider>
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                      <PeopleAltIcon />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                      }
                      secondary={u.email}
                    />
                  </ListItem>
                ))}
                {users.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No users found." />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              color="secondary"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Services
            </Typography>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                mb: 2,
                bgcolor: "#fff8e1",
                minHeight: 340,
                p: 3,
                boxShadow: "0 2px 12px 0 rgba(255, 160, 0, 0.06)",
              }}
            >
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {services.map((s, idx) => (
                  <ListItem key={s.id ?? s.name ?? idx} divider>
                    <Avatar sx={{ bgcolor: "#ffa000", mr: 2 }}>
                      {getServiceIcon(s.name)}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600 }}>{s.name}</Typography>
                      }
                      secondary={s.description}
                    />
                  </ListItem>
                ))}
                {services.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No services found." />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AdminDashboard;

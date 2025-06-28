import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function Navbar() {
  const [user, setUser] = React.useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Listen for login/logout changes in localStorage and on route change
  React.useEffect(() => {
    const syncUser = () => {
      const userString = localStorage.getItem("user");
      setUser(userString ? JSON.parse(userString) : null);
    };
    window.addEventListener("storage", syncUser);
    // Also check user on route change (for SPA login)
    syncUser();
    return () => window.removeEventListener("storage", syncUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo and App Name on the left */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <BusinessCenterIcon sx={{ fontSize: 36, color: "#fff", mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              color: "#fff",
            }}
          >
            My Business App
          </Typography>
        </Box>
        {/* Spacer to push buttons to the right */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Navigation and user actions on the right */}
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              "&:hover": {
                color: "inherit",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Home
          </Button>
          {!user && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/register"
              sx={{
                "&:hover": {
                  color: "inherit",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Register
            </Button>
          )}
          {user && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/services"
              sx={{
                "&:hover": {
                  color: "inherit",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Services
            </Button>
          )}
          {user ? (
            <>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mx: 2,
                  verticalAlign: "middle",
                  height: "100%",
                }}
              >
                <AccountCircleIcon
                  sx={{ mr: 1, color: "#fff", fontSize: 28 }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {user.name || user.email}
                </Typography>
              </Box>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  "&:hover": {
                    color: "inherit",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                  height: "100%",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{
                "&:hover": {
                  color: "inherit",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
                height: "100%",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

// frontend/src/components/Navbar/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Job Portal
          </Link>
        </Typography>
        <Box>
          {["Home", "About", "Job Listings", "Company Showcase", "Contact"].map(
            (text) => (
              <Button
                color="inherit"
                component={Link}
                to={`/${text.toLowerCase().replace(" ", "")}`}
                key={text}
              >
                {text}
              </Button>
            )
          )}

          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("Current User in Redux:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Job Portal
          </Button>
        </Box>

        {isAuthenticated ? (
          <>
            {user.type === "admin" ? (
              <>
                <Button color="inherit" component={Link} to="/admin/employees">
                  Employees
                </Button>
                <Button color="inherit" component={Link} to="/admin/add-job">
                  Add Job
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/jobs">
                  Jobs
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/Contact">
                  Contact
                </Button>
                {/* <Button color="inherit" component={Link} to="/companyshowcase">Companies</Button> */}
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

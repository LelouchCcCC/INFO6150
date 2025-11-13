// frontend/src/pages/Home.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
export default function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>About Us</Typography>
      <Typography variant="body1">Learn more about our job portal.</Typography>
    </Container>
  );
}
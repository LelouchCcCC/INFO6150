// frontend/src/pages/Home.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>Welcome to the Job Portal!</Typography>
      <Typography variant="body1">Find your next career opportunity.</Typography>
    </Container>
  );
}
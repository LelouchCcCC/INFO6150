// frontend/src/pages/Home.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
export default function Contact() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>Contact Us</Typography>
      <Typography variant="body1">Get in touch with us.</Typography>
    </Container>
  );
}
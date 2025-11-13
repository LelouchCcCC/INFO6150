// frontend/src/pages/CompanyShowcase.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress 
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 

// hard code backend URL for image access
const BACKEND_URL = 'http://localhost:3000'; 

export default function CompanyShowcase() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    axios.defaults.withCredentials = true; 
    
    axios.get('/api/images/getAll') 
      .then(response => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching company images:", err.response?.data?.error || err.message);
        setError("Failed to load company data. Please ensure the backend is running and you are logged in.");
        setLoading(false);
      });
  }, [isAuthenticated]); 

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading company data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Hint: Check your Vite proxy for `/api` and ensure the backend is running on port 3000.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Company Showcase (List of Companies)
      </Typography>
      {companies.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
            No company images found. Please upload images via the Assignment 8 routes or ensure users have them.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${BACKEND_URL}${company.imagePath}`} 
                  alt={`Image for ${company.name}`}
                  sx={{ objectFit: 'contain', padding: 1, borderBottom: '1px solid #eee' }} 
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {company.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}